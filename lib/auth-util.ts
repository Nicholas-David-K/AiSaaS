import { auth, currentUser } from '@clerk/nextjs';

export const getCurrentUserWithId = async () => {
    try {
        const user = await currentUser();
        const { userId } = auth();

        if (!user) {
            return { user: null, userId: null };
        }

        return { user, userId };
    } catch (error) {
        console.error('Error fetching current user:', error);
        return { user: null, userId: null };
    }
};
