// src/pages/_app.tsx
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import MainLayout from '@/components/layout/MainLayout/MainLayout';
import '@/lib/fontawesome';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </MainLayout>
  );
}
