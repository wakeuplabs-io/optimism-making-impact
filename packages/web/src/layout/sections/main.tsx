import { useStepsStore } from '@/state/steps/steps-store';

export function MainSection() {
  const selectedStepPosition = useStepsStore((state) => state.selectedStepPosition);
  const steps = useStepsStore((state) => state.steps);

  return (
    <main className='flex items-center justify-center flex-1 p-4 bg-red-100'>
      <span>{JSON.stringify(steps[selectedStepPosition], null, 2)}</span>
    </main>
  );
}
