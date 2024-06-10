import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import type { Metadata } from 'next';
import { Roboto_Condensed } from 'next/font/google';
import Image from 'next/image';

import QueryProviders from './providers';

import 'react-toastify/dist/ReactToastify.min.css';
import './globals.scss';
import styles from './layout.module.scss';

const inter = Roboto_Condensed({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FATYKHAVA | Lesta test task',
  description: 'Lesta test task Frontend Developer position'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense>
          <QueryProviders>
            <div>
              <header className={styles.header}>
                <div>
                  <Image src={'/images/logo.svg'} alt="logo" width={150} height={70} />
                </div>
              </header>
              <div className={styles.layout}>
                <div>
                  <main>{children}</main>
                </div>
              </div>
              <ToastContainer position="bottom-right" />
            </div>
          </QueryProviders>
        </Suspense>
      </body>
    </html>
  );
}
