import { useStepsStore } from '@/state';

export function MainSection() {
  const selectedStepPosition = useStepsStore((state) => state.selectedStepPosition);
  const steps = useStepsStore((state) => state.steps);

  return (
    <main className='flex flex-1 items-center justify-center bg-red-100 p-4'>
      <span>{JSON.stringify(steps[selectedStepPosition], null, 2)}</span>
    </main>
  );
}
