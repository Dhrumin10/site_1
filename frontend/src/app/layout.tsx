'use client';

import { SessionProvider } from "next-auth/react";
import { Inter } from 'next/font/google';
import ClientLayout from './client-layout';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionProvider>
                    <ClientLayout>{children}</ClientLayout>
                </SessionProvider>
            </body>
        </html>
    );
} 