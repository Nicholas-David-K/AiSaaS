import { createLipaNaMpesaPassword, generateAccessToken } from '@/lib/mpesa-utils.';

import { NextResponse } from 'next/server';
import axios from 'axios';
import { format } from 'date-fns';

export async function POST(req: Request) {
    const body = await req.json();
    const { phoneNumber, amount, accountReference } = body;
    // Get access token
    const access_token = await generateAccessToken();

    if (!access_token) {
        return new NextResponse('Unauthorized', { status: 500 });
    }

    if (!phoneNumber) {
        return new NextResponse('Phone number is required', { status: 500 });
    }

    if (!amount) {
        return new NextResponse('Amount is required', { status: 500 });
    }

    if (!accountReference) {
        return new NextResponse('Account reference is required', { status: 500 });
    }

    // Create LIPA NA MPESA Password
    const password = createLipaNaMpesaPassword();

    // Construct the request payload
    const requestPayload = {
        BusinessShortCode: '174379',
        Password: password,
        Timestamp: format(new Date(), 'yyyyMMddHHmmss'),
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: '174379',
        PhoneNumber: phoneNumber,
        CallBackURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/stkstatus`,
        AccountReference: accountReference,
        TransactionDesc: 'Test',
    };

    // Make the request to Safaricom API
    try {
        const response = await axios.post(
            'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
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
        console.error('EXPRESS_API_ERROR', error);
        return new NextResponse('Failed to initiate STK push', { status: 500 });
    }
}
