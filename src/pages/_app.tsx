// src/pages/_app.tsx
import { useEffect } from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import MainLayout from '@/components/layout/MainLayout/MainLayout';
import { pushEvent } from '@/lib/gtm';
import '@/lib/fontawesome';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pushEvent('page_view', { page_path: url });
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  return (
    <MainLayout>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </MainLayout>
  );
}
