export type StepButtonState = 'past' | 'active' | 'coming';

export interface StepButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  state: StepButtonState;
}
