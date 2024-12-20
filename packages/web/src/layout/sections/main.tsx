import { useStepsStore } from '@/state';

export function MainSection() {
  const selectedStepPosition = useStepsStore((state) => state.selectedStepPosition);
  const steps = useStepsStore((state) => state.steps);

  return (
    <main className="flex items-center justify-center flex-1 bg-red-100">
      {steps.length > 0 && JSON.stringify(steps[selectedStepPosition])}
    </main>
  );
}
