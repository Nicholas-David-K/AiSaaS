import { Configuration, OpenAIApi } from 'openai';
import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';

import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt, amount = 1, resolution = '512x512' } = body;

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (!configuration.apiKey) {
            return new NextResponse('Open API Key not configured', { status: 500 });
        }

        if (!prompt) {
            return new NextResponse('Prompt is required', { status: 500 });
        }

        if (!amount) {
            return new NextResponse('Amount is required', { status: 500 });
        }

        if (!resolution) {
            return new NextResponse('Resolution is required', { status: 500 });
        }

        // check whether api limit for this user
        const freeTrial = await checkApiLimit();
        if (!freeTrial) {
            return new NextResponse('Free trial has expired', { status: 403 });
        }

        const response = await openai.createImage({
            prompt,
            n: parseInt(amount, 10),
            size: resolution,
        });

        // After the response, increase the limit
        await increaseApiLimit();

        return NextResponse.json(response.data.data);
    } catch (error) {
        console.log('IMAGE_ERROR', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
