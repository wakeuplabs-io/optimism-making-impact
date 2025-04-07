import { CardStrength, Color } from '@optimism-making-impact/schemas';

export const IS_DEVELOPMENT = import.meta.env.DEV;

export const MOBILE_THRESHOLD = 1024;
export const DESKTOP_XL_THRESHOLD = 1536;
export const WAKEUP_URL = import.meta.env.VITE_WAKEUP_URL ?? 'https://www.wakeuplabs.io/';
export const REPOSITORY_URL = import.meta.env.VITE_REPOSITORY_URL ?? 'https://github.com/wakeuplabs-io/optimism-making-impact';

export const AUTOSAVE_INTERVAL = 30 * 1000;

export const BADGE_COLORS = ['#D6E8F2', '#E8DEEE', '#F1F0EF', '#FADEC9', '#DDEFDA', '#FACEC9', '#C9D0FA', '#F2C9FA'] as const;

export type ExtendedColor = Color | 'GRAY';

export const COLOR_MAP: Record<ExtendedColor, string> = {
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
  GRAY: '#D9D9D9',
};

type CardStrengthColor = {
  color: string;
  gradient: {
    start: string;
    end: string;
  };
};

export const CARD_STRENGTH_COLOR_MAP: Record<CardStrength, CardStrengthColor> = {
  LOW: {
    color: '#FF4E36',
    gradient: {
      start: '#FFCCC5',
      end: '#FF4E36',
    },
  },
  MEDIUM: {
    color: '#FFC422',
    gradient: {
      start: '#FFEEBE',
      end: '#FFC422',
    },
  },
  HIGH: {
    color: '#87DEB2',
    gradient: {
      start: '#87DEB2',
      end: '#AFBD9E',
    },
  },
};

export const AUTH_TOKEN_KEY = 'authToken';
