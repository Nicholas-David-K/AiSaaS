import { auth, currentUser } from '@clerk/nextjs';

export const storeUser = async () => {
    const { userId } = auth();
    const user = await currentUser();

    const userData = {
        userId,
        user,
    };

    if (!userId || !user) {
        throw new Error('You must be logged in to continue...');
    }

    sessionStorage.setItem('userData', JSON.stringify(userData));
};
