import { NextRequest, NextResponse } from 'next/server';

import { authMiddleware } from '@clerk/nextjs';

declare module 'next/server' {
    interface NextRequest {
        authUser?: any; // Define the authUser property
    }
}

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
    publicRoutes: [
        '/',
        '/api/webhook',
        '/api/confirmation',
        '/api/validation',
        '/api/stkstatus',
    ],

    afterAuth: async (auth, req: NextRequest) => {
        // Check if there is a user, and if so, store the user information in the request
        if (auth.user) {
            req.authUser = auth.user;
        }
    },
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
