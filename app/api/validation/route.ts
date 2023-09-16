import type { NextApiRequest, NextApiResponse } from 'next';

import { NextResponse } from 'next/server';

// Define a named function for handling POST requests
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const data = await req.body;
            console.log('VALIDATION_DATA', data);

            return NextResponse.json('Successful', { status: 200 });
        } catch (error) {
            console.error(error);
            return NextResponse.json('Internal Server Error', { status: 500 });
        }
    } else {
        res.status(500).send('Method not allowed');
    }
}
