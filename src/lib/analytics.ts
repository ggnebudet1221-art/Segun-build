type AnalyticsEvent =
  | 'cta_click'
  | 'telegram_click'
  | 'instagram_click'
  | 'whatsapp_click'
  | 'phone_click'
  | 'project_view';

export const trackEvent = (event: AnalyticsEvent, details: Record<string, string> = {}) => {
  window.dispatchEvent(new CustomEvent('site-analytics', { detail: { event, ...details } }));
};
