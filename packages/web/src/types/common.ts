import { CardStrength } from '@optimism-making-impact/schemas';

export const enum StepTypes {
  INFOGRAPHY,
  ITEMS,
  CARD,
}

export type StrengthItem = {
  id: number;
  value: CardStrength;
};

export const strengthItems: StrengthItem[] = [
  { id: 1, value: 'LOW' },
  { id: 2, value: 'MEDIUM' },
  { id: 3, value: 'HIGH' },
];

export enum Color {
  RED = 'RED',
  PINK = 'PINK',
  PURPLE = 'PURPLE',
  YELLOW = 'YELLOW',
  TAN = 'TAN',
  ORANGE = 'ORANGE',
  GREEN = 'GREEN',
  LIGHTBLUE = 'LIGHTBLUE',
  BLUE = 'BLUE',
  DARKBLUE = 'DARKBLUE',
}
export const colorArray = [
  Color.RED,
  Color.PINK,
  Color.PURPLE,
  Color.YELLOW,
  Color.TAN,
  Color.ORANGE,
  Color.GREEN,
  Color.LIGHTBLUE,
  Color.BLUE,
  Color.DARKBLUE,
];
