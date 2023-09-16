'use client';

import { CodeIcon, ImageIcon, MessageSquare } from 'lucide-react';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export const tools = [
    {
        label: 'Conversation',
        icon: MessageSquare,
        color: 'text-violet-500',
        bgColor: 'bg-violet-500/10',
        href: '/conversation',
        image: '/images/ai.jpeg',
    },
    {
        label: 'Image Generation',
        icon: ImageIcon,
        color: 'text-pink-700',
        bgColor: 'bg-pink-700/10',
        href: '/image',
        image: '/images/image.png',
    },
    {
        label: 'Code Generation',
        icon: CodeIcon,
        color: 'text-green-700',
        bgColor: 'bg-green-700/10',
        href: '/code',
        image: '/images/code.jpeg',
    },
];

export default function DashboardPage() {
    const router = useRouter();

    return (
        <div>
            <div className="mb-8 space-y-4 px-4 md:px-14 lg:px-20">
                <h2 className="text-2xl md:text-4xl font-bold">
                    Explore the power of AI
                </h2>
                <p className="text-muted-foreground font-light text-sm md:text-lg">
                    Chat with the smartest AI - Experience the power of AI
                </p>
            </div>
            <div className="px-4 md:px-14 lg:px-20">
                <div className="grid gap-3 grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
                    {tools.map((tool) => (
                        <div
                            onClick={() => router.push(tool.href)}
                            key={tool.href}
                            className="cursor-pointer"
                        >
                            <div className="basis-full relative hover:opacity-95">
                                <div className="z-0 w-full, h-96 rounded-sm relative">
                                    <Image
                                        fill
                                        src={tool.image}
                                        alt="dash-img"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="rounded-sm object-cover"
                                    />
                                </div>
                                <div className="absolute z-1 bottom-0 left-0 w-full h-full bg-gradient-dark rounded-sm"></div>
                                <div className="absolute z-2 bottom-0 left-0 p-5 flex items-center gap-x-4">
                                    <div className="flex items-center gap-x-4">
                                        <div
                                            className={cn(
                                                'p-2 w-fit rounded-md',
                                                tool.bgColor
                                            )}
                                        >
                                            <tool.icon
                                                className={cn('w-8 h-8', tool.color)}
                                            />
                                        </div>
                                        <div className="font-semibold text-white">
                                            {tool.label}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
