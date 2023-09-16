'use client';

import { Check, CodeIcon, ImageIcon, MessageSquare, Zap } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import axios from 'axios';
import { cn } from '@/lib/utils';
import useProModal from '@/hooks/use-pro-modal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const tools = [
    {
        label: 'Conversation',
        icon: MessageSquare,
        color: 'text-violet-500',
        bgColor: 'bg-violet-500/10',
        image: '/images/ai.jpeg',
    },
    {
        label: 'Image Generation',
        icon: ImageIcon,
        color: 'text-pink-700',
        bgColor: 'bg-pink-700/10',
        image: '/images/image.png',
    },
    {
        label: 'Code Generation',
        icon: CodeIcon,
        color: 'text-green-700',
        bgColor: 'bg-green-700/10',
        image: '/images/code.jpeg',
    },
];

type Props = {};

const ProModal = (props: Props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const proModal = useProModal();

    const onStripeSubscribe = async () => {
        try {
            setLoading(true);

            const response = await axios.get('/api/stripe');
            window.location.href = response.data.url;
        } catch (error) {
            console.log('STRIPE_CLIENT_ERROR', error);
        } finally {
            setLoading(false);
        }
    };

    const onMpesaSubscribe = () => {
        try {
            setLoading(true);
            router.push('/checkout');
        } catch (error) {
            console.log('MPESA_CLIENT_ERROR', error);
        } finally {
            setLoading(false);
            proModal.onClose();
        }
    };

    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        <div className="flex items-center gap-x-2 font-bold py-1">
                            Upgrade to Magma
                            <Badge
                                variant="premium"
                                className="uppercase text-sm py-1"
                            >
                                Pro
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                        {tools.map((tool) => (
                            <Card
                                key={tool.label}
                                className="p-3 border-black/5 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-x-4">
                                    <div
                                        className={cn(
                                            'p-2 w-fit rounded-md',
                                            tool.bgColor
                                        )}
                                    >
                                        <tool.icon
                                            className={cn('w-6 h-6', tool.color)}
                                        />
                                    </div>
                                    <div className="font-semibold text-sm">
                                        {tool.label}
                                    </div>
                                </div>
                                <Check className="text-primary h-5 w-5" />
                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex flex-col justify-center w-full gap-y-2">
                        <Button
                            variant="premium"
                            size="lg"
                            className="w-full"
                            onClick={onStripeSubscribe}
                        >
                            Upgrade with Stripe
                            <Zap className="w-4 h-4 ml-2 fill-white" />
                        </Button>
                        <Button
                            variant="mpesa"
                            size="lg"
                            className="w-full"
                            onClick={onMpesaSubscribe}
                        >
                            Upgrade with M-Pesa
                            <Zap className="w-4 h-4 ml-2 fill-white" />
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ProModal;
