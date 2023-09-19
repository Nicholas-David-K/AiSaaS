import { auth, currentUser } from '@clerk/nextjs';

import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request, res: NextApiResponse) {
    try {
        const data = await req.json();

        // const amount =
        //     data['Body']['stkCallback']['CallbackMetadata']['Item'][0]['Value'];
        // const mpesa_receipt_number =
        //     data['Body']['stkCallback']['CallbackMetadata']['Item'][1]['Value'];
        // const phone_number =
        //     data['Body']['stkCallback']['CallbackMetadata']['Item'][4]['Value'];

        console.log(data);

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json('Internal Server Error', { status: 500 });
    }
}
