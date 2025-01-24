export * from './infographies';
export * from './steps';

// TODO: use prisma to keep in sync
export type Round = {
  id: number;
  icon?: string;
  name: string;
  link1: string;
  link2: string;
};

export type RoundWithCategories = {
  id: number;
  icon?: string;
  name: string;
  link1: string;
  link2: string;
  categories: Category[];
};

export type Category = {
  id: number;
  roundId: number;
  name: string;
  icon?: string;
};
