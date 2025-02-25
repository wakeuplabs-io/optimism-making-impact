import { useCallback, useEffect, useState } from 'react';
import { updateStepBodySchema } from '@optimism-making-impact/schemas';
import { FormTextInput } from '@/components/form/form-text-input';
import { TextInput } from '@/components/text-input';
import { EditPencilButton } from '@/components/pencil-edit-button';
import { useToggle } from 'usehooks-ts';
import { cn } from '@/lib/utils';

const updateStepDescriptionSchema = updateStepBodySchema.pick({ description: true });

interface DescriptionInlineText extends Omit<React.ComponentProps<typeof TextInput>, 'onChange'> {
  description: string;
  isAdmin?: boolean;
  onChange: (value: string) => void;
}

export function DescriptionInlineText({ description, onChange, isAdmin = false, ...field }: DescriptionInlineText) {
  const [controlledDescription, setControlledDescription] = useState(description);
  const [validationError, setValidationError] = useState<string>('');
  const [editMode, toggleEditMode] = useToggle(false);

  const handleToggleEdit = useCallback(() => {
    if (editMode === true && !validationError && controlledDescription !== description) {
      // trigger the onChange function with the new description when has no errors
      onChange(controlledDescription);
    }

    toggleEditMode();
  }, [editMode, validationError, controlledDescription, description, onChange, toggleEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setControlledDescription(newText);

    //validate schema
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
    <div className='w-[50%]'>
      <div className='flex gap-2 items-end'>
        {editMode ? (
          <FormTextInput
            className={cn({
              'border-red-500 focus-visible:ring-0': validationError,
            })}
            wrapperClassname='w-full'
            error={validationError}
            value={controlledDescription}
            onChange={handleChange}
            {...field}
            name='title'
          />
        ) : (
          <p className='text-[20px] font-[500] truncate text-ellipsis whitespace-nowrap'>
            {validationError ? description : controlledDescription}
          </p>
        )}
        {isAdmin && (
          <div className='h-9 flex items-center'>
            <EditPencilButton onClick={handleToggleEdit} />
          </div>
        )}
      </div>
    </div>
  );
}
