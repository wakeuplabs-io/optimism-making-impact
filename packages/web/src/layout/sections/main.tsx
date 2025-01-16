import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { useStepsStore } from '@/state/steps/steps-store';
import { Step } from '@/types';
import { useEffect } from 'react';

export function MainSection() {
  return (
    <MainSectionContainer>
      <MainSectionContent />
    </MainSectionContainer>
  );
}

interface MainSectionContainerProps {
  children: React.ReactNode;
}

function MainSectionContainer(props: MainSectionContainerProps) {
  return <main className='flex flex-1 flex-col items-center justify-center gap-8 bg-red-100 p-4'>{props.children}</main>;
}

function MainSectionContent() {
  const selectedStep = useStepsStore((state) => state.selectedStep);
  const mainSectionState = useMainSectionStore((state) => state);

  useEffect(() => {
    if (selectedStep) {
      mainSectionState.fetchData(selectedStep.id);
    }
  }, [selectedStep?.id]);

  if (mainSectionState.loading) {
    return <span>Loading...</span>;
  }

  if (!mainSectionState.step) {
    return <span>Select a step to see its content</span>;
  }

  return <StepTypeSelector step={mainSectionState.step} />;
}

interface StepTypeSelectorProps {
  step: Step;
}

function StepTypeSelector(props: StepTypeSelectorProps) {
  switch (props.step.type) {
    case 'INFOGRAPHY':
      return <InfographyStep step={props.step} />;
    case 'ITEMS':
      return <ItemStep />;
    case 'CARD':
      return <CardStep />;

    default:
      return null;
  }
}

interface InfogrpahyStepProps {
  step: Step;
}

function InfographyStep(props: InfogrpahyStepProps) {
  return <span>{JSON.stringify(props.step, null, 2)}</span>;
}
function ItemStep() {
  return 'ItemStep';
}
function CardStep() {
  return 'CardStep';
}
