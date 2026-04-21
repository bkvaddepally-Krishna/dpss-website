export {};

declare global {
  interface Window {
    gtag: (
      type: string,
      action: string,
      payload: {
        event_category?: string;
        event_label?: string;
        value?: number;
        [key: string]: any;
      }
    ) => void;
    dataLayer: any[];
  }
}
