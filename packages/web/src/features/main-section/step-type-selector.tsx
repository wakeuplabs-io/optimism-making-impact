import { CardStep } from '@/features/main-section/step-types/cards';
import { InfographyStep } from '@/features/main-section/step-types/infographies/infography';
import { ItemsStep } from '@/features/main-section/step-types/items/index';
import { CompleteStep } from '@/types';

interface StepTypeSelectorProps {
  step: CompleteStep;
}

// TODO: review this component!!!!

export function StepTypeSelector(props: StepTypeSelectorProps) {
  switch (props.step.type) {
    case 'INFOGRAPHY':
      return <InfographyStep />;
    case 'ITEMS':
      return <ItemsStep {...props} />;
    case 'CARD':
      return <CardStep {...props} />;

    default:
      return null;
  }
}
