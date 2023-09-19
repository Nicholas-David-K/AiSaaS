import { auth, currentUser } from '@clerk/nextjs';

import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export async function GET(req: Request) {
    try {
        const { userId } = auth();
        const user = await currentUser();

        const data = await req.json();

        if (!userId || !user) {
            return new NextResponse('Anauthorized', { status: 401 });
        }

        const amount =
            data['Body']['stkCallback']['CallbackMetadata']['Item'][0]['Value'];
        const mpesa_receipt_number =
            data['Body']['stkCallback']['CallbackMetadata']['Item'][1]['Value'];
        const phone_number =
            data['Body']['stkCallback']['CallbackMetadata']['Item'][4]['Value'];

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json('Internal Server Error', { status: 500 });
    }
}
