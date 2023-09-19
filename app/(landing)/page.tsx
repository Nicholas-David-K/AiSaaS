import { auth, currentUser } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

type Props = {};

const LandingPage = async (props: Props) => {
    const user = await currentUser();
    const { userId }: { userId: string | null } = auth();
    return (
        <div>
            <div>LandingPage (unprotected)</div>
            <div>
                <Link href="/sign-in">
                    <Button>Login</Button>
                </Link>
                <Link href="/sign-up">
                    <Button>Register</Button>
                </Link>
                <p>currentUser = {user?.firstName}</p>
                <p>userId = {userId}</p>
            </div>
        </div>
    );
};

export default LandingPage;
