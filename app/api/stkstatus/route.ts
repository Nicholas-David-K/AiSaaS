import { auth, currentUser } from '@clerk/nextjs';

import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request, res: NextApiResponse) {
    try {
        const data = await req.json();
        const { userId } = auth();
        const user = await currentUser();

        if (!userId || !user) {
            return new NextResponse('Anauthorized', { status: 401 });
        }

        const amount =
            data['Body']['stkCallback']['CallbackMetadata']['Item'][0]['Value'];
        const mpesa_receipt_number =
            data['Body']['stkCallback']['CallbackMetadata']['Item'][1]['Value'];
        const phone_number =
            data['Body']['stkCallback']['CallbackMetadata']['Item'][4]['Value'];

        const mpesa_subscription = await prismadb.mpesaSubscription.findUnique({
            where: {
                userId: userId,
            },
        });

        if (mpesa_subscription && mpesa_subscription.subscriptionAmount) {
            await prismadb.mpesaSubscription.update({
                where: {
                    userId: userId,
                },
                data: {
                    mpesaReceiptNumber: mpesa_receipt_number,
                    subscriptionAmount: amount,
                    phoneNumber: phone_number,
                    mpesaCurrentPeriodEnd: new Date(
                        (mpesa_subscription.mpesaCurrentPeriodEnd as any) * 1000
                    ),
                },
            });

            return NextResponse.json('Successful', { status: 200 });
        } else {
            await prismadb.mpesaSubscription.create({
                data: {
                    userId: userId,
                    mpesaReceiptNumber: 'W1NPF96B',
                    subscriptionAmount: '1',
                    phoneNumber: '254746390265',
                    mpesaCurrentPeriodEnd: new Date(
                        (mpesa_subscription?.mpesaCurrentPeriodEnd as any) * 1000
                    ),
                },
            });

            return NextResponse.json('Successful', { status: 200 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json('Internal Server Error', { status: 500 });
    }
}
