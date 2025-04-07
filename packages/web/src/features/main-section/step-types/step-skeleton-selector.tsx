import { CardsStepSkeleton } from './cards/card-skeleton';
import { InfographicStepSkeleton } from './infographics/infographic-skeleton';
import { ItemsStepSekeleton } from './items/item-skeleton';
import { Step } from '@/types/steps';

export function StepSkeletonSelector(props: { step: Step }) {
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
