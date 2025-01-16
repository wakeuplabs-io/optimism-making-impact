import { InfographyCard } from '@/features/main-section/step-types/infographies/infography-card';
import { CompleteStep } from '@/types';

interface InfogrpahyStepProps {
  step: CompleteStep;
}

export function InfographyStep(props: InfogrpahyStepProps) {
  return (
    <div className='flex flex-col gap-4'>
      {props.step.infographies.map((infography, order) => {
        return <InfographyCard infography={infography} order={order} key={`${infography.id}-${order}`} />;
      })}
    </div>
  );
}
