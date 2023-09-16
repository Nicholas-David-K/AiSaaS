import { NextResponse } from 'next/server';

// Define a named function for handling POST requests
export async function POST(req: Request) {
    try {
        const data = await req.json();
        console.log('VALIDATION_DATA', data);

        return NextResponse.json('Successful', { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json('Internal Server Error', { status: 500 });
    }
}
