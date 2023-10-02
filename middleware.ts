import Cookies from 'js-cookie';
import { authMiddleware } from '@clerk/nextjs';

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
    publicRoutes: ['/', '/api/webhook', '/api/confirmation', '/api/validation'],
    afterAuth(auth) {
        if (auth.userId) {
            console.log(auth.userId);
            Cookies.set('userId', auth.userId, { expires: 7, path: '/' });
        }
    },
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
