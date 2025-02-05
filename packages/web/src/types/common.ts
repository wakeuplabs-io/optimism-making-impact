import { z } from 'zod';

export const stepTypes = ['INFOGRAPHY', 'ITEMS', 'CARD'] as const;
export const stepTypeSchema = z.enum(stepTypes);
export type StepType = z.infer<typeof stepTypeSchema>;
export const enum StepTypes {
  INFOGRAPHY,
  ITEMS,
  CARD,
}

export enum StrengthEnum {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}
export type Strength = { id: number; value: StrengthEnum };
export const strengthArray = [
  { id: 1, value: StrengthEnum.LOW },
  { id: 2, value: StrengthEnum.MEDIUM },
  { id: 3, value: StrengthEnum.HIGH },
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
