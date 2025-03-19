import { CardStrength } from '@optimism-making-impact/schemas';

export const enum StepTypes {
  CARDGRID,
  INFOGRAPHIC,
  SMARTLIST,
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
