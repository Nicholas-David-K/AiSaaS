import { auth, currentUser } from '@clerk/nextjs';

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const { userId } = auth();
        const user = await currentUser();

        console.log(user);
        console.log(userId);

        console.log(
            'CALLBACK_URL_DATA',
            data.Body.stkCallback.CallbackMetadata || data.Body
        );

        if (!userId || !user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        return NextResponse.json('Data saved successfully', { status: 200 });
    } catch (error) {
        console.error('STK_STATUS_ERROR', error);
        return NextResponse.json('Internal Server Error', { status: 500 });
    }
}
