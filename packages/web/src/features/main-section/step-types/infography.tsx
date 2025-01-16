import { Step } from '@/types';

interface InfogrpahyStepProps {
  step: Step;
}

export function InfographyStep(props: InfogrpahyStepProps) {
  return <span>{JSON.stringify(props.step, null, 2)}</span>;
}
