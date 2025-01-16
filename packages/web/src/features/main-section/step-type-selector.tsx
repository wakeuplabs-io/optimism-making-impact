import { CardStep } from '@/features/main-section/step-types/cards';
import { InfographyStep } from '@/features/main-section/step-types/infography';
import { ItemStep } from '@/features/main-section/step-types/items';
import { Step } from '@/types';

interface StepTypeSelectorProps {
  step: Step;
}

export function StepTypeSelector(props: StepTypeSelectorProps) {
  switch (props.step.type) {
    case 'INFOGRAPHY':
      return <InfographyStep step={props.step} />;
    case 'ITEMS':
      return <ItemStep />;
    case 'CARD':
      return <CardStep />;

    default:
      return null;
  }
}
