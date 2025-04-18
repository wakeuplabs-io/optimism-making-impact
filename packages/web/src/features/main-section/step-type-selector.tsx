import { CardStep } from '@/features/main-section/step-types/cards';
import { InfographicStep } from '@/features/main-section/step-types/infographics/infographic';
import { ItemsStep } from '@/features/main-section/step-types/items/index';
import { CompleteStep } from '@/types/steps';

interface StepTypeSelectorProps {
  step: CompleteStep;
}

export function StepTypeSelector(props: StepTypeSelectorProps) {
  switch (props.step.type) {
    case 'INFOGRAPHIC':
      return <InfographicStep />;
    case 'SMARTLIST':
      return <ItemsStep {...props} />;
    case 'CARDGRID':
      return <CardStep {...props} />;

    default:
      return null;
  }
}
