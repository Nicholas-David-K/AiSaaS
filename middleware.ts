import { auth, currentUser } from '@clerk/nextjs';

import { authMiddleware } from '@clerk/nextjs';

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
    publicRoutes: [
        '/',
        '/api/webhook',
        '/api/stkstatus',
        '/api/confirmation',
        '/api/validation',
    ],
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

// pages/api/middleware.js

export const fetchUserDataMiddleware = async () => {
    const userId = auth().userId;
    const user = await currentUser();

    const userData = {
        userId,
        user,
    };

    return { userData };
};
