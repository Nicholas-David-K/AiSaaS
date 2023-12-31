import Navbar from '@/components/Navbar';
import React from 'react';
import Sidebar from '@/components/Sidebar';
import { auth } from '@clerk/nextjs';
import { checkSubscription } from '@/lib/subscription';
import { getApiLimitCount } from '@/lib/api-limit';

type Props = {
    children: React.ReactNode;
};

const DashboardLayout = async ({ children }: Props) => {
    const apiLimitCount = await getApiLimitCount();
    const isPro = await checkSubscription();

    return (
        <div className="h-full relative">
            <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-2 md:inset-x-2 drop-shadow-lg">
                <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
            </div>
            <main className="md:ml-[300px] md:border-2 bg-slate-100 md:rounded-2xl overflow-y-auto fixed md:inset-y-2 md:inset-x-2 inset-0 pb-10">
                <Navbar />
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
