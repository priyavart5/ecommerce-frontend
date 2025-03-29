'use client';

import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

const inter = Inter({
  subsets: ['latin'],
  variable: '--inter',
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <title>eCommerece by PV.</title>
        <meta name="description" content="A new generational market place." />
      </head>
      <body suppressHydrationWarning>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
