import { auth, currentUser } from '@clerk/nextjs';

import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const user = await currentUser();

        const data = await req.json();
        console.log('CALLBACK_URL_DATA', data);

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json('Internal Server Error', { status: 500 });
    }
}
