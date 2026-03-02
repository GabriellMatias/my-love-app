export type StepId = 0 | 1 | 2 | 3;

export type TimelineEvent = {
  date: string;
  title: string;
  description: string;
  emoji: string;
};

export type PhotoItem = {
  id: number;
  title: string;
  note: string;
  src?: string;
};

export type StepMeta = {
  id: StepId;
  label: string;
  short: string;
};
