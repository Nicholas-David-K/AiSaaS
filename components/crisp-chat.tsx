'use client';

import { Crisp } from 'crisp-sdk-web';
import { useEffect } from 'react';

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure('bbb0c19f-0cc4-42f9-9de6-981ea63e0841');
    }, []);

    return null;
};
