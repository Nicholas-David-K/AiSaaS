import { auth, currentUser } from '@clerk/nextjs';

import { NextResponse } from 'next/server';
import { absoluteUrl } from '@/lib/utils';
import prismadb from '@/lib/prismadb';
import { stripe } from '@/lib/stripe';

const settingsUrl = absoluteUrl('/settings');

export async function GET() {
    try {
        const { userId } = auth();
        const user = await currentUser();

        console.log('STRIPE_USER', { userId, user });

        if (!userId || !user) {
            return new NextResponse('Anauthorized', { status: 401 });
        }

        const userSubscription = await prismadb.userSubscription.findUnique({
            where: {
                userId: userId,
            },
        });

        // WHEN THERE'S A SUB
        if (userSubscription && userSubscription.stripeCustomerId) {
            // redirect user to billing page
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingsUrl,
            });

            return new NextResponse(JSON.stringify({ url: stripeSession.url }));
        }

        // NO SUBSCRIPTION?
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ['card'],
            mode: 'subscription',
            billing_address_collection: 'auto',
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: 'KES',
                        product_data: {
                            name: 'Magma Pro',
                            description: 'Unlimited AI Generations',
                        },
                        unit_amount: 2000,
                        recurring: {
                            interval: 'month',
                        },
                    },
                    quantity: 1,
                },
            ],
            // Metadata will allow us to find who has checkedout and subscribed
            metadata: {
                userId,
            },
        });

        return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    } catch (error) {
        console.log('[STIPE_ERROR]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
