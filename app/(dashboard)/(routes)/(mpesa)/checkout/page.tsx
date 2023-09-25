'use client';

import * as z from 'zod';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import Heading from '@/components/Heading';
import { Input } from '@/components/ui/input';
import { ZapIcon } from 'lucide-react';
import axios from 'axios';
import { formSchema } from './constants';
import { formatPhoneNumber } from '@/lib/mpesa-utils.';
import toast from 'react-hot-toast';
import { useAccountReference } from '@/hooks/useAccountReference';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

const MpesaPage = () => {
    const router = useRouter();
    const { accountReference, regenerateReference } = useAccountReference(8);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            phoneNumber: '',
            email: '',
        },
    });

    const isLoading = form.formState.isSubmitting;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        regenerateReference();
        try {
            const data = {
                phoneNumber: formatPhoneNumber(values.phoneNumber),
                amount: '1',
                accountReference: accountReference,
            };

            const response = await axios.post('/api/mpesa', data);

            console.log('RESPONSE_DATA', response.data);

            if (response.data['ResponseCode'] === '0') {
                sessionStorage.setItem('userInfo', JSON.stringify(data));
                sessionStorage.setItem(
                    'CheckoutRequestID',
                    response.data['CheckoutRequestID']
                );

                toast.success('Prompt sent successfully');

                setTimeout(() => {
                    router.push('/payment');
                }, 500);
            } else {
                toast.error('An error has occurred. ');
            }
        } catch (error) {
            toast.error('An error has occurred. Please try again!');
            console.log(error);
        }
    }

    return (
        <div>
            <Heading
                title="M-pesa Checkout"
                description="Pay for your subscription with M-pesa"
                icon={ZapIcon}
                iconColor="text-pink-700"
                bgColor="bg-pink-700/10"
            />
            <div className="px-4 lg:px-8 gap-x-40 grid grid-cols-3">
                <div className="col-span-3 lg:col-span-2 mt-20">
                    <h4 className="font-semibold text-sm mb-10">Order Summary</h4>
                    <div className="bg-white drop-shadow-sm flex justify-between items-center p-2 rounded-md px-10">
                        <p className="font-semibold text-sm text-muted-foreground">
                            Total
                        </p>
                        <p className="text-sm text-muted-foreground font-bold">
                            KES. 2000
                        </p>
                    </div>
                </div>
                <div className="col-span-3 lg:col-span-2 mt-20 bg-neutral-100/75 p-5 py-10 rounded-md drop-shadow-2xl">
                    <h2 className="font-semibold text-base mb-2 border-b py-2 text-center">
                        Pay with Mpesa
                    </h2>
                    <div>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="rounded-lg w-full focus-within:shadow-sm grid grid-cols-12 gap-2"
                            >
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="col-span-12 lg:col-span-6">
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Your name"
                                                    className="pl-6 py-6 font-semibold text-neutral-500 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                    disabled={isLoading}
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <FormItem className="col-span-12 lg:col-span-6">
                                            <FormControl className="m-0 p-0">
                                                <Input
                                                    type="text"
                                                    placeholder="M-pesa phone number"
                                                    className="pl-6 py-6 font-semibold text-neutral-500 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                    disabled={isLoading}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="col-span-12 lg:col-span-12">
                                            <FormControl className="m-0 p-0">
                                                <Input
                                                    type="email"
                                                    placeholder="E-mail"
                                                    className="pl-6 py-6 border-0 text-neutral-500 font-semibold outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                    disabled={false}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    variant="mpesa"
                                    disabled={isLoading}
                                    className="col-span-7 p-6 mt-10 w-full"
                                >
                                    Generate Payment
                                </Button>
                            </form>
                            <p className="text-sm text-muted-foreground col-span-3 mt-2">
                                A payment request will be sent to your M-Pesa phone
                                number
                            </p>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MpesaPage;
