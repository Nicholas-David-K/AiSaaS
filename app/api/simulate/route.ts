import { NextResponse } from 'next/server';
import axios from 'axios';
import { generateAccessToken } from '@/lib/mpesa-utils.';

export async function POST(req: Request) {
    const body = await req.json();
    const { phoneNumber, amount, accountReference } = body;

    const access_token = await generateAccessToken();

    if (!phoneNumber) {
        return new NextResponse('Phone number is required', { status: 500 });
    }

    if (!amount) {
        return new NextResponse('Amount is required', { status: 500 });
    }

    if (!accountReference) {
        return new NextResponse('Account Reference is required', { status: 500 });
    }

    const requestPayload = {
        ShortCode: '600986',
        CommandID: 'CustomerPayBillOnline',
        Amount: amount,
        Msisdn: '254708374149',
        BillRefNumber: accountReference,
    };

    try {
        const response = await axios.post(
            'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate',
            requestPayload,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log(response.data);
        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error('C2B_SIMULATION_ERROR', error);
        return new NextResponse('Failed to simulate transaction', { status: 500 });
    }
}
