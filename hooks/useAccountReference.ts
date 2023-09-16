import { useState } from 'react';

export function useAccountReference(length = 8) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charsetLength = charset.length;

    const generateReference = () => {
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charsetLength);
            result += charset[randomIndex];
        }
        return result;
    };

    const [accountReference, setAccountReference] = useState(generateReference());

    const regenerateReference = () => {
        const newReference = generateReference();
        setAccountReference(newReference);
    };

    return { accountReference, regenerateReference };
}
