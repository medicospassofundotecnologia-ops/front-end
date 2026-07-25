// src/lib/gtm.ts
export const GTM_ID = 'GTM-XXXXXXX'; // substituir pelo ID real após criar o container

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export function pushEvent(event: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
