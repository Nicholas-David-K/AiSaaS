import Heading from '@/components/Heading';
import React from 'react';
import { Settings2 } from 'lucide-react';
import SubscriptionButton from '@/components/subscription-button';
import { checkSubscription } from '@/lib/subscription';

type Props = {};

const Settings = async (props: Props) => {
    const isPro = await checkSubscription();

    return (
        <div>
            <Heading
                title="Settings"
                description="Manage account settings"
                icon={Settings2}
                iconColor="text-gray-700"
                bgColor="bg-gray-700/10"
            />
            <div className="px-4 lg:px-8 space-y-4">
                <div className="text-muted-foreground text-sm">
                    {isPro
                        ? 'You are currently on a pro plan'
                        : 'You are currently on a free plan'}
                </div>
                <SubscriptionButton isPro={isPro} />
            </div>
        </div>
    );
};

export default Settings;
