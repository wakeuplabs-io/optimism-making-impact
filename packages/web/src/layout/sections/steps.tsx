import { ActionButton } from '@/components/action-button';
import { Modal } from '@/components/modal';
import { StepButton } from '@/components/step-button';
import { Input } from '@/components/ui/input';
import { CreateStepBody } from '@/services/steps/schemas';
import { useSidebarStore, useUserStore } from '@/state';
import { useStepsStore } from '@/state/steps/steps-store';
import { Step } from '@/types';
import { DialogClose } from '@radix-ui/react-dialog';
import { Label } from '@radix-ui/react-label';
import { Plus, Save } from 'lucide-react';
import { useEffect, useState } from 'react';

export function StepsSection() {
  const setSteps = useStepsStore((state) => state.fetchByRoundId);
  const selectedRound = useSidebarStore((state) => state.selectedRound);

  useEffect(() => {
    setSteps(selectedRound.id);
  }, [selectedRound.id]);

  return (
    <header className='flex items-center justify-center h-16 px-2'>
      <StepsSectionContent />
    </header>
  );
}

export function StepsSectionContent() {
  const stepsState = useStepsStore((state) => state);
  const selectedRound = useSidebarStore((state) => state.selectedRound);
  const isAdmin = useUserStore((state) => state.isAdmin);

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
    return <span>There are no steps for this round.</span>;
  }

  return (
    <div className='flex items-center justify-between flex-1 max-w-full gap-4 overflow-hidden'>
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

  return (
    <div className='flex justify-between flex-1 max-w-full overflow-hidden'>
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

function AddStepButton(props: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className='flex h-[49px] w-[49px] items-center justify-center rounded-full bg-[#14141A] transition-all duration-500 ease-in-out hover:cursor-pointer hover:bg-primary'
      {...props}
    >
      <Plus className='text-white' />
    </button>
  );
}

interface AddStepModalProps {
  roundId: number;
  onClick?: (roundId: number, data: CreateStepBody) => void;
}

function AddStepModal(props: AddStepModalProps) {
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('');

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleIconChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIcon(event.target.value);
  }

  function handleSubmit() {
    props.onClick?.(props.roundId, { title, icon, roundId: props.roundId });
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
          <Input
            id='type'
            name='type'
            value={icon}
            onChange={handleIconChange}
            className='py-5 shadow-none placeholder:text-white-low focus-visible:ring-dark-low'
            placeholder='Icon'
          />
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
