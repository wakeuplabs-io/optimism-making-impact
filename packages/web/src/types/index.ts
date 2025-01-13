// TODO: use prisma to keep in sync
export type Round = {
  id: number;
  icon?: string;
  name: string;
  link1: string;
  link2: string;
};

// TODO: use prisma to keep in sync
export type Category = {
  id: number;
  roundId: number;
  name: string;
  icon?: string;
};
