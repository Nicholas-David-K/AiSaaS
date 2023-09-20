'use client';

import { Button } from './ui/button';
import { Zap } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';

type Props = {
    isPro: boolean;
};

const SubscriptionButton = ({ isPro }: Props) => {
    const [loading, setLoading] = useState(false);

    const onClick = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/stripe');
            window.location.href = response.data.url;
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            disabled={loading}
            variant={isPro ? 'default' : 'premium'}
            onClick={onClick}
        >
            {isPro ? 'Manage Subscription' : 'Upgrade to pro'}
            {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
        </Button>
    );
};

export default SubscriptionButton;
