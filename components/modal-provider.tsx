'use client';

import { useEffect, useState } from 'react';

import ProModal from './pro-modal';

type Props = {};

const ModalProvider = (props: Props) => {
    const [mounted, setIsmounted] = useState(false);

    useEffect(() => {
        setIsmounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <>
            <ProModal />
        </>
    );
};

export default ModalProvider;
