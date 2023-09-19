import { auth, currentUser } from '@clerk/nextjs';

import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request, res: NextApiResponse) {
    try {
        const { userId } = auth();
        const user = await currentUser();

        const data = await req.json();

        if (!userId || !user) {
            return new NextResponse('Anauthorized', { status: 401 });
        }

        const mpesa_subscription = await prismadb.mpesaSubscription.findUnique({
            where: {
                userId: userId,
            },
        });

        const amount =
            data['Body']['stkCallback']['CallbackMetadata']['Item'][0]['Value'];
        const mpesa_receipt_number =
            data['Body']['stkCallback']['CallbackMetadata']['Item'][1]['Value'];
        const phone_number =
            data['Body']['stkCallback']['CallbackMetadata']['Item'][4]['Value'];

        if (!amount || !mpesa_receipt_number || phone_number) {
            return new NextResponse('Internal Server Error', { status: 500 });
        }

        const currentDate = new Date();
        const futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + 30);

        await prismadb.mpesaSubscription.create({
            data: {
                userId: userId,
                subscriptionAmount: amount,
                mpesaReceiptNumber: mpesa_receipt_number,
                mpesaCurrentPeriodEnd: futureDate,
            },
        });

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json('Internal Server Error', { status: 500 });
    }
}

/**
 * 
 * userId String @unique

  subscriptionAmount    String?  @map(name: "subscription_amount")
  mpesaReceiptNumber    String?  @map(name: "mpesa_receipt_id")
  phoneNumber           String?  @map(name: "phone_number")
  mpesaCurrentPeriodEnd DateTime @map(name: "mpesa_current_period_end")
 */
