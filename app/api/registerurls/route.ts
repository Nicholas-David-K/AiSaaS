import { NextResponse } from 'next/server';
import axios from 'axios';
import { generateAccessToken } from '@/lib/mpesa-utils.';

export async function POST(req: Request) {
    const access_token = await generateAccessToken();

    if (!access_token) {
        return new NextResponse('Unauthorized', { status: 500 });
    }

    const requestPayload = {
        ShortCode: '600991',
        ResponseType: 'Completed',
        ConfirmationURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/confirmation`,
        ValidationURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/validation`,
    };

    try {
        const response = await axios.post(
            'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl',
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
        console.error('C2B_URL_REGISTRATION_ERROR', error);
        return new NextResponse('Failed to register urls', { status: 500 });
    }
}
