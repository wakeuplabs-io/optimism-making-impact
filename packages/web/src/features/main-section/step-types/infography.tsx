import { CompleteStep } from '@/types';

interface InfogrpahyStepProps {
  step: CompleteStep;
}

export function InfographyStep(props: InfogrpahyStepProps) {
  return (
    <div className='flex flex-col'>
      {props.step.infographies.map((infography) => {
        return <span className='my-2 bg-teal-300'>{JSON.stringify(infography, null, 2)}</span>;
      })}
    </div>
  );
}
