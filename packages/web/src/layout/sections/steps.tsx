import { Button } from '@/components/ui/button';
import { useSidebarStore, useStepsStore } from '@/state';
import { useEffect } from 'react';

export function StepsSection() {
  const setSteps = useStepsStore((state) => state.setSteps);
  const selectedRound = useSidebarStore((state) => state.selectedRound);

  useEffect(() => {
    (async () => {
      setSteps(selectedRound.id);
    })();
  }, [selectedRound.id]);

  return (
    <header className="flex h-16 items-center justify-center bg-blue-200 px-10">
      <StepsSectionContent />
    </header>
  );
}

export function StepsSectionContent() {
  const stepsState = useStepsStore((state) => state);
  const selectedRound = useSidebarStore((state) => state.selectedRound);

  useEffect(() => {
    (async () => {
      stepsState.setSteps(selectedRound.id);
    })();
  }, [selectedRound.id]);

  if (stepsState.loading) {
    return <p>Loading...</p>;
  }

  if (stepsState.error) {
    return <p>{stepsState.error}</p>;
  }

  if (stepsState.steps.length === 0) {
    return <p>No steps found</p>;
  }

  return (
    <div className="flex flex-1 justify-between">
      {stepsState.steps.length > 0 &&
        stepsState.steps.map((step) => (
          <Button key={step.id} onClick={() => stepsState.setSelectedStep(step)}>
            {/* <img src="step.icon" alt="" /> */}
            {step.title}
          </Button>
        ))}
    </div>
  );
}
