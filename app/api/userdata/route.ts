import { auth, currentUser } from '@clerk/nextjs';

import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const { userId } = auth();
        const user = await currentUser();

        if (!userId || !user) {
            return new NextResponse('Anauthorized', { status: 401 });
        }

        const userData = {
            userId,
            user,
        };

        return new NextResponse(JSON.stringify(userData), { status: 200 });
    } catch (error) {
        console.log('[STIPE_ERROR]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
