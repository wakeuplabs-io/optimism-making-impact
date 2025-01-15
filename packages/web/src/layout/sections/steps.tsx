import { IconWithDefault } from '@/components/icon-with-default';
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
    <header className='flex h-16 items-center justify-center px-10'>
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
    <div className='flex max-w-full flex-1 justify-between overflow-hidden'>
      {stepsState.steps.length > 0 &&
        stepsState.steps.map((step) => {
          const buttonState =
            stepsState.selectedStep?.position === step.position
              ? 'active'
              : stepsState.selectedStep?.position && stepsState.selectedStep.position > step.position
                ? 'past'
                : 'coming';

          return (
            <StepButton state={buttonState} key={step.title} onClick={() => stepsState.setSelectedStep(step.id)}>
              <div className='flex items-center gap-2'>
                <IconWithDefault src={step.icon} />
                {step.title}
              </div>
            </StepButton>
          );
        })}
    </div>
  );
}
