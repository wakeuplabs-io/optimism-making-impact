import { CardsStepSkeleton } from './cards/card-skeleton';
import { InfographicStepSkeleton } from './infographics/infographic-skeleton';
import { ItemsStepSekeleton } from './items/item-skeleton';
import { StepWithPosition } from '@/contexts/steps/steps-context';

export function StepSkeletonSelector(props: { step: StepWithPosition }) {
  switch (props.step.type) {
    case 'INFOGRAPHIC':
      return <InfographicStepSkeleton />;
    case 'SMARTLIST':
      return <ItemsStepSekeleton />;
    case 'CARDGRID':
      return <CardsStepSkeleton />;

    default:
      return null;
  }
}
