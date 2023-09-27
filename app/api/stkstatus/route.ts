import { NextResponse } from 'next/server';
import { saveMpesaSubscription } from '@/lib/mpesa-subscription';

export async function POST(req: Request) {
    try {
        const data = await req.json();

        saveMpesaSubscription(data);

        return NextResponse.json('Sucessfull', { status: 200 });
    } catch (error) {
        console.error('STK_STATUS_ERROR', error);
        return NextResponse.json('Internal Server Error', { status: 500 });
    }
}
