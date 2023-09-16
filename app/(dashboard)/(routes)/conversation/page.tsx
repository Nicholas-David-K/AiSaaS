'use client';

import * as z from 'zod';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import React, { useState } from 'react';

import { BotAvatar } from '@/components/bot-avatar';
import { Button } from '@/components/ui/button';
import { ChatCompletionRequestMessage } from 'openai';
import { Empty } from '@/components/Empty';
import Heading from '@/components/Heading';
import { Input } from '@/components/ui/input';
import Loader from '@/components/Loader';
import { MessageSquare } from 'lucide-react';
import { UserAvatar } from '@/components/user-avatar';
import axios from 'axios';
import { cn } from '@/lib/utils';
import { formSchema } from './constants';
import { useForm } from 'react-hook-form';
import useProModal from '@/hooks/use-pro-modal';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

type Props = {};

const ConversationPage = (props: Props) => {
    const proModal = useProModal();
    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: '',
        },
    });

    const isLoading = form.formState.isSubmitting;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const userMessage: ChatCompletionRequestMessage = {
                role: 'user',
                content: values.prompt,
            };

            const newMessages = [...messages, userMessage];

            const response = await axios.post('/api/conversation', {
                messages: newMessages, // Send the array of messages
            });

            setMessages((current) => [...current, userMessage, response.data]);

            form.reset();
        } catch (error: any) {
            if (error?.response?.status === 403) {
                proModal.onOpen();
            }
        } finally {
            router.refresh();
        }
    }

    return (
        <div>
            <Heading
                title="Conversation"
                description="Our most advanced conversation model"
                icon={MessageSquare}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                placeholder="How can technology be used to stop curruption?"
                                                className="pl-6 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="col-span-12 lg:col-span-2 w-full"
                                disabled={isLoading}
                            >
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}
                    {messages.length === 0 && !isLoading && (
                        <Empty label="No Conversations started" />
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.content}
                                className={cn(
                                    'p-8 w-full flex items-center gap-x-8 rounded-lg',
                                    message.role === 'user'
                                        ? 'bg-white border border-black/10'
                                        : 'bg-neutral-100'
                                )}
                            >
                                {message.role === 'user' ? (
                                    <UserAvatar />
                                ) : (
                                    <BotAvatar />
                                )}
                                <p className="text-sm">{message.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConversationPage;
