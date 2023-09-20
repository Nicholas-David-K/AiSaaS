'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import axios from 'axios';
import { registerC2BUrls } from '@/lib/mpesa-utils.';

const Payments = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>({});

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const sessionInfo = sessionStorage.getItem('userInfo');
            const data = JSON.parse(sessionInfo as any);

            setData(data);
        }
    }, []);

    async function handleConfirmation() {
        setLoading(true);
        // await registerC2BUrls();

        const payload = {
            phoneNumber: data.phoneNumber,
            amount: data.amount,
            accountReference: data.accountReference,
        };

        try {
            const response = await axios.post('/api/simulate', payload);
            console.log('SIMULATE_RESPONSE_DATA', response.data);
        } catch (error: any) {
            console.log(error.response);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="px-4 lg:px-8 gap-x-40 grid grid-cols-3">
            <div className="col-span-2 lg:col-span-1 mt-20">
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
            <div className="col-span-3 lg:col-span-2 mt-20">
                <p className="text-muted-foreground my-5 text-sm">
                    If you do not receive a prompt, you can manually pay using the
                    details below
                </p>
                <ol className="text-neutral-500">
                    <li>1. Go to M-Pesa Menu</li>
                    <li>2. Select Lipa Na M-Pesa</li>
                    <li>3. Select Pay Bill</li>
                    <li>
                        4. Enter Business Number:{' '}
                        <span className="font-semibold">174379</span>
                    </li>
                    <li>
                        5. Enter Account Number:{' '}
                        <span className="font-semibold">
                            {data.accountReference}
                        </span>
                    </li>
                    <li>
                        6. Enter Amount:{' '}
                        <span className="font-semibold">KES 1,300</span>
                    </li>
                </ol>
                <Button
                    variant="premium"
                    disabled={loading}
                    className="col-span-5 p-6 mt-10 w-full"
                    onClick={handleConfirmation}
                >
                    Confirm Payment
                </Button>
            </div>
        </div>
    );
};

export default Payments;
