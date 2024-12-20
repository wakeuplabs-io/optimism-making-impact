import { Button } from '@/components/ui/button';
import { useStepsStore } from '@/state';

export function StepsSection() {
  const stepsState = useStepsStore((state) => state);

  return (
    <header className="flex items-center h-16 px-10 bg-blue-200">
      <div className="flex justify-between flex-1">
        {stepsState.steps.map((step) => (
          <Button key={step.id} onClick={() => stepsState.setSelectedStep(step)}>
            {step.name}
          </Button>
        ))}
      </div>
    </header>
  );
}
