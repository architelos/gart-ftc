const MEASUREMENT_ID = "G-8TNVWX98GF";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void;
  }
}

function pageView(url: string) {
  if (window.gtag)
    window.gtag("config", MEASUREMENT_ID, { page_path: url, send_page_view: true });
}

function event(action: string, category: string, label: string) {
  if (window.gtag)
    window.gtag("event", action, { event_category: category, event_label: label });
}

export { pageView, event }
