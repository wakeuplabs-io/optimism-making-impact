import { CardStep } from '@/features/main-section/step-types/cards';
import { InfographyStep } from '@/features/main-section/step-types/infographies/infography';
import { ItemStep } from '@/features/main-section/step-types/items';
import { CompleteStep } from '@/types';

interface StepTypeSelectorProps {
  step: CompleteStep;
}

export function StepTypeSelector(props: StepTypeSelectorProps) {
  switch (props.step.type) {
    case 'INFOGRAPHY':
      return <InfographyStep />;
    case 'ITEMS':
      return <ItemStep />;
    case 'CARD':
      return <CardStep />;

    default:
      return null;
  }
}
