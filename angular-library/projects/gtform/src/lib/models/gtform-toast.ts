
export interface GtformToast {
  type: 'info' | 'success' | 'error' | 'warning';
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'banner-top' | 'banner-bottom';
  title: string;
  message: string;
  duration?: number;
}
