import { StepButton } from '@/components/steps-button';
import { useSidebarStore } from '@/state';
import { useStepsStore } from '@/state/steps/steps-store';
import { useEffect } from 'react';

export function StepsSection() {
  const setSteps = useStepsStore((state) => state.fetchByRoundId);
  const selectedRound = useSidebarStore((state) => state.selectedRound);

  useEffect(() => {
    setSteps(selectedRound.id);
  }, [selectedRound.id]);

  return (
    <header className='flex items-center justify-center h-16 px-10'>
      <StepsSectionContent />
    </header>
  );
}

export function StepsSectionContent() {
  const stepsState = useStepsStore((state) => state);
  const selectedRound = useSidebarStore((state) => state.selectedRound);

  useEffect(() => {
    stepsState.fetchByRoundId(selectedRound.id);
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
    <div className='flex justify-between flex-1 max-w-full overflow-hidden'>
      {stepsState.steps.length > 0 &&
        stepsState.steps.map((step) => {
          const buttonState =
            stepsState.selectedStepPosition === step.position
              ? 'active'
              : stepsState.selectedStepPosition > step.position
                ? 'past'
                : 'coming';

          return (
            <StepButton state={buttonState} key={step.id} onClick={() => stepsState.setSelectedStepPosition(step.position)}>
              {/* <img src="step.icon" alt="" /> */}
              {step.title}
            </StepButton>
          );
        })}
    </div>
  );
}
