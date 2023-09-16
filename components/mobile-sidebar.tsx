'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

type Props = {
    apiLimitCount: number;
};

const MobileSidebar = ({ apiLimitCount }: Props) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Sheet>
            <SheetTrigger>
                <div className="md:hidden">
                    <Menu />
                </div>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
                <Sidebar apiLimitCount={apiLimitCount} />
            </SheetContent>
        </Sheet>
    );
};

export default MobileSidebar;
