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

// Define a custom type for the Request object
type CustomRequest = Request & {
    userData?: {
        userId: string | null;
        user: any;
    };
};

export const fetchUserDataMiddleware = async (req: CustomRequest) => {
    const userId = auth().userId;
    const user = await currentUser();

    // Return userId and user as properties of req.userData
    return (req.userData = {
        userId,
        user,
    });
};
