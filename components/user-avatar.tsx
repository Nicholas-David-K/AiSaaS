import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

import { Avatar } from './ui/avatar';
import React from 'react';
import { useUser } from '@clerk/nextjs';

type Props = {};

export const UserAvatar = (props: Props) => {
    const { user } = useUser();

    return (
        <Avatar className="h-8 w-8">
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
            </AvatarFallback>
        </Avatar>
    );
};
