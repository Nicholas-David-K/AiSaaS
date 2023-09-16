import Navbar from '@/components/Navbar';
import React from 'react';
import Sidebar from '@/components/Sidebar';
import { getApiLimitCount } from '@/lib/api-limit';

type Props = {
    children: React.ReactNode;
};

const MpesaLayout = async ({ children }: Props) => {
    const apiLimitCount = await getApiLimitCount();

    return (
        <div className="h-full relative">
            <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-2 md:inset-x-2 drop-shadow-lg">
                <Sidebar apiLimitCount={apiLimitCount} />
            </div>
            <main className="md:ml-[300px] md:border-2 bg-slate-100 md:rounded-2xl overflow-y-auto fixed md:inset-y-2 md:inset-x-2 inset-0 pb-10">
                <Navbar />
                {children}
            </main>
        </div>
    );
};

export default MpesaLayout;
