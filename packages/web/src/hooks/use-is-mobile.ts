import { MOBILE_THRESHOLD } from '@/config';
import { useWindowSize } from 'usehooks-ts';

/**
 * Hook to determine if the current device is a mobile device.
 * It checks the current window size and returns true if it is less than
 * the {@link MOBILE_THRESHOLD} value.
 *
 * @returns {boolean} True if the device is a mobile device.
 */
export function useIsMobile() {
  const { width = 0 } = useWindowSize();

  return width < MOBILE_THRESHOLD;
}
