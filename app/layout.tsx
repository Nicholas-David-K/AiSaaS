import './globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import ModalProvider from '@/components/modal-provider';
import ToasterProvider from '@/providers/ToasterProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Magma',
    description: 'AI Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    <ToasterProvider />
                    <ModalProvider />
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
