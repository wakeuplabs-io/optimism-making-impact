import { FormTextInput } from '@/components/form/form-text-input';
import { EditPencilButton } from '@/components/pencil-edit-button';
import { SimpleIconButton } from '@/components/simple-icon-button';
import { TextInput } from '@/components/text-input';
import { cn } from '@/lib/utils';
import { updateStepBodySchema } from '@optimism-making-impact/schemas';
import { Check } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useToggle } from 'usehooks-ts';

const updateStepDescriptionSchema = updateStepBodySchema.pick({ description: true });

interface DescriptionInlineText extends Omit<React.ComponentProps<typeof TextInput>, 'onChange'> {
  description: string;
  isAdmin?: boolean;
  onChange: (value: string) => void;
}

export function DescriptionInlineText({ description, onChange, isAdmin = false, ...field }: DescriptionInlineText) {
  const [controlledDescription, setControlledDescription] = useState(description);
  const [validationError, setValidationError] = useState<string>();
  const [editMode, toggleEditMode] = useToggle(false);

  const handleToggleEdit = useCallback(() => {
    if (editMode === true && !validationError && controlledDescription !== description) {
      onChange(controlledDescription);
    }

    toggleEditMode();
  }, [editMode, validationError, controlledDescription, description, onChange, toggleEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setControlledDescription(newText);

    const result = updateStepDescriptionSchema.safeParse({ description: newText });

    if (!result.success) {
      setValidationError(result.error.issues[0].message);
      return;
    }

    setValidationError('');
  };

  // Toggle edit mode when the Enter key is pressed
  useEffect(() => {
    const handleEnterKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && editMode) {
        handleToggleEdit();
      }
    };

    document.addEventListener('keydown', handleEnterKey);

    return () => {
      document.removeEventListener('keydown', handleEnterKey);
    };
  }, [editMode, handleToggleEdit]);

  return (
    <div className='min-h-14 grow overflow-ellipsis lg:overflow-hidden flex'>
      {editMode ? (
        <div className='w-full flex gap-2 items-start p-[1px]'>
          <FormTextInput
            className={cn({
              'border-red-500 focus-visible:ring-0': validationError,
            })}
            maxLength={100}
            wrapperClassname='w-full h-full'
            error={validationError}
            value={controlledDescription}
            onChange={handleChange}
            hideError
            {...field}
          />
          {isAdmin && <SimpleIconButton className='flex items-center h-9' icon={<Check />} onClick={handleToggleEdit} />}
        </div>
      ) : (
        <div className='flex h-full items-start'>
          <div className='w-full flex items-center gap-2'>
            <p className='text-[20px] font-[500] lg:truncate w-full'>{validationError ? description : controlledDescription}</p>
            {isAdmin && (
              <EditPencilButton onClick={toggleEditMode} showLabel={!controlledDescription || controlledDescription.trim().length === 0} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
