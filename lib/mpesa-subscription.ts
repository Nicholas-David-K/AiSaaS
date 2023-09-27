import { auth, currentUser } from '@clerk/nextjs';

import { NextResponse } from 'next/server';
import prismadb from './prismadb';

export const saveMpesaSubscription = async (data: any) => {
    const { userId } = auth();
    const user = await currentUser();

    console.log(user);
    console.log(userId);

    if (!userId || !user) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    console.log(
        'CALLBACK_URL_DATA',
        data.Body.stkCallback.CallbackMetadata || data.Body
    );

    const callbackData = data.Body.stkCallback.CallbackMetadata.Item;

    // Extract relevant data from the callback
    const amount = callbackData.find((item: any) => item.Name === 'Amount')?.Value;
    const mpesaReceiptNumber = callbackData.find(
        (item: any) => item.Name === 'MpesaReceiptNumber'
    )?.Value;
    const transactionDate = callbackData.find(
        (item: any) => item.Name === 'TransactionDate'
    )?.Value;
    const phoneNumber = callbackData.find(
        (item: any) => item.Name === 'PhoneNumber'
    )?.Value;

    if (!amount || !mpesaReceiptNumber || !transactionDate || !phoneNumber) {
        return NextResponse.json('Missing required data', { status: 400 });
    }

    let mpesaSubscription = await prismadb.mpesaSubscription.findUnique({
        where: { userId: userId },
    });

    if (!mpesaSubscription) {
        await prismadb.mpesaSubscription.create({
            data: {
                userId: userId,
                subscriptionAmount: amount,
                mpesaReceiptNumber: mpesaReceiptNumber,
                phoneNumber: phoneNumber,
                mpesaCurrentPeriodEnd: new Date(
                    new Date().setDate(new Date().getDate() + 30)
                ),
            },
        });
    }

    // Update the MpesaSubscription record
    await prismadb.mpesaSubscription.update({
        where: { userId },
        data: {
            subscriptionAmount: amount,
            mpesaReceiptNumber,
            mpesaCurrentPeriodEnd: new Date(
                (mpesaSubscription?.mpesaCurrentPeriodEnd || new Date()).getTime() +
                    30 * 24 * 60 * 60 * 1000
            ),
            phoneNumber: phoneNumber,
        },
    });
};
