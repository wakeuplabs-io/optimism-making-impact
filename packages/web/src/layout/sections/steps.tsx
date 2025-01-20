import { ActionButton } from '@/components/action-button';
import { AddStepButton } from '@/components/add-step-button';
import { Modal } from '@/components/modal';
import { Select } from '@/components/select';
import { StepButton } from '@/components/step-button';
import { Input } from '@/components/ui/input';
import { capitalizeFirst } from '@/lib/utils';
import { CreateStepBody } from '@/services/steps/schemas';
import { useSidebarStore, useUserStore } from '@/state';
import { useStepsStore } from '@/state/steps/steps-store';
import { Step, StepType, stepTypes } from '@/types';
import { DialogClose } from '@radix-ui/react-dialog';
import { Label } from '@radix-ui/react-label';
import { Save } from 'lucide-react';
import { useEffect, useState } from 'react';

export function StepsSection() {
  const setSteps = useStepsStore((state) => state.fetchByRoundId);
  const selectedRound = useSidebarStore((state) => state.selectedRound);

  useEffect(() => {
    if (selectedRound) {
      setSteps(selectedRound.id);
    }
  }, [selectedRound?.id]);

  return (
    <header className='flex h-16 items-center justify-center px-2'>
      <StepsSectionContent />
    </header>
  );
}

export function StepsSectionContent() {
  const stepsState = useStepsStore((state) => state);
  const selectedRound = useSidebarStore((state) => state.selectedRound);
  const isAdmin = useUserStore((state) => state.isAdmin);

  useEffect(() => {
    if (selectedRound) {
      stepsState.fetchByRoundId(selectedRound.id);
    }
  }, [selectedRound?.id]);

  if (!selectedRound) {
    return <p>Select a round to see the steps</p>;
  }

  if (stepsState.error) {
    return <p>{stepsState.error}</p>;
  }

  return (
    <div className='flex max-w-full flex-1 items-center justify-between gap-4 overflow-hidden'>
      <StepsList steps={stepsState.steps} />
      {isAdmin && <AddStepModal roundId={selectedRound.id} onClick={stepsState.addStep} />}
    </div>
  );
}

interface StepsListProps {
  steps: Step[];
}

function StepsList(props: StepsListProps) {
  const stepsState = useStepsStore((state) => state);
  const isAdmin = useUserStore((state) => state.isAdmin);

  if (stepsState.steps.length === 0) {
    return (
      <div className='flex max-w-full flex-1 justify-center overflow-hidden'>
        <span>There are no steps for this round.</span>
      </div>
    );
  }

  return (
    <div className='flex max-w-full flex-1 justify-between overflow-hidden'>
      {props.steps.map((step) => {
        const buttonState =
          stepsState.selectedStep?.position === step.position
            ? 'active'
            : stepsState.selectedStep?.position && stepsState.selectedStep.position > step.position
              ? 'past'
              : 'coming';

        return (
          <StepButton
            state={buttonState}
            key={`${step.id}-${step.title}`}
            onClick={() => stepsState.setSelectedStep(step.id)}
            step={step}
            isAdmin={isAdmin}
            onDelete={stepsState.deleteStep}
            onEdit={stepsState.editStep}
          />
        );
      })}
    </div>
  );
}

const options = stepTypes.map((type) => ({
  value: type,
  label: capitalizeFirst(type),
}));

interface AddStepModalProps {
  roundId: number;
  onClick?: (roundId: number, data: CreateStepBody) => void;
}

function AddStepModal(props: AddStepModalProps) {
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('');
  const [type, setType] = useState<string>(options[0].value);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleIconChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIcon(event.target.value);
  }

  function handleTypeChange(value: string) {
    setType(value);
  }

  function handleSubmit() {
    const selectedType = type as StepType;
    props.onClick?.(props.roundId, { title, icon, type: selectedType, roundId: props.roundId });
    setTitle('');
    setIcon('');
  }

  return (
    <Modal title='Add step' trigger={<AddStepButton />}>
      <div className='grid gap-4 py-4'>
        <div>
          <Label htmlFor='name' className='sr-only'>
            Title
          </Label>
          <Input
            id='name'
            name='name'
            value={title}
            onChange={handleTitleChange}
            className='py-5 shadow-none placeholder:text-white-low focus-visible:ring-dark-low'
            placeholder='Title'
          />
        </div>
        <div>
          <Label htmlFor='icon' className='sr-only'>
            Icon
          </Label>
          <Input
            id='icon'
            name='icon'
            value={icon}
            onChange={handleIconChange}
            className='py-5 shadow-none placeholder:text-white-low focus-visible:ring-dark-low'
            placeholder='Icon'
          />
        </div>
        <div>
          <Label htmlFor='type' className='sr-only'>
            Type
          </Label>
          <Select items={options} placeholder='Select a type' defaultValue={options[0].value} onValueChange={handleTypeChange} />
        </div>
      </div>

      <div className='flex gap-4'>
        <DialogClose asChild>
          <ActionButton label='Cancel' variant='secondary' />
        </DialogClose>
        <DialogClose asChild>
          <ActionButton icon={<Save />} label='Save' variant='primary' onClick={handleSubmit} />
        </DialogClose>
      </div>
    </Modal>
  );
}
