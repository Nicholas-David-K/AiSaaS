import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import prismadb from '@/lib/prismadb';

// Define a named function for handling POST requests
export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const user = await currentUser();

        const data = await req.json();
        console.log('CONFIRMATION_DATA', data);

        if (!userId || !user) {
            return new NextResponse('Anauthorized', { status: 401 });
        }

        const mpesa_subscription = await prismadb.c2BTransaction.findUnique({
            where: {
                userId: userId,
            },
        });

        if (mpesa_subscription && mpesa_subscription.msisdn) {
            await prismadb.c2BTransaction.update({
                where: {
                    userId: userId,
                },
                data: {
                    transactionType: data.TransactionType,
                    transID: data.TransID,
                    transTime: data.TransTime,
                    transAmount: data.TransAmount,
                    billRefNumber: data.BillRefNumber,
                    msisdn: data.MSISDN,
                    firstName: data.FirstName,
                    middleName: data.MiddleName,
                    lastName: data.LastName,
                    mpesaCurrentPeriodEnd: new Date(
                        (mpesa_subscription.mpesaCurrentPeriodEnd as any) * 1000
                    ),
                },
            });

            return NextResponse.json('Updated Successfully', { status: 200 });
        } else {
            await prismadb.c2BTransaction.create({
                data: {
                    userId: userId,
                    transactionType: data.TransactionType,
                    transID: data.TransID,
                    transTime: data.TransTime,
                    transAmount: data.TransAmount,
                    businessShortCode: data.BusinessShortCode,
                    billRefNumber: data.BillRefNumber,
                    msisdn: data.MSISDN,
                    firstName: data.FirstName,
                    middleName: data.MiddleName,
                    lastName: data.LastName,
                    mpesaCurrentPeriodEnd: new Date(
                        (mpesa_subscription?.mpesaCurrentPeriodEnd as any) * 1000
                    ),
                },
            });

            return NextResponse.json('Successfully Created', { status: 200 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json('Internal Server Error', { status: 500 });
    }
}
