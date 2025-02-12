import { Color } from '@/types';

export const IS_DEVELOPMENT = import.meta.env.DEV;

export const MOBILE_THRESHOLD = 1024;
export const DESKTOP_XL_THRESHOLD = 1536; //Tailwind 2XL threshold
export const WAKEUP_URL = 'https://www.wakeuplabs.io/';

export const AUTOSAVE_INTERVAL = 30 * 1000;

export const BADGE_COLORS = ['#D6E8F2', '#DDEFDA', '#F1F0EF', '#E8DEEE', '#FADEC9'];

export const COLOR_MAP: Record<keyof typeof Color, string> = {
  RED: '#FF0420',
  PINK: '#FF91E9',
  PURPLE: '#D383C3',
  YELLOW: '#FFE642',
  TAN: '#FFC89E',
  ORANGE: '#FC925B',
  GREEN: '#9BC891',
  LIGHTBLUE: '#A5EDFF',
  BLUE: '#4FB8ED',
  DARKBLUE: '#466299',
};
