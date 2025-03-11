import { FormErrorMessage } from '@/components/form/form-error-message';
import { EditIcon } from '@/components/icons/edit-icon';
import { TextAreaInput } from '@/components/text-area-input';
import { cn } from '@/lib/utils';
import { updateInfographicBodySchema } from '@optimism-making-impact/schemas';
import { useState } from 'react';
import Markdown from 'react-markdown';
import { useToggle } from 'usehooks-ts';
import { EditInfographyActionBar } from './edit-infography-action-bar';

const markdownSchema = updateInfographicBodySchema.pick({ markdown: true });

type EditInfographicMarkdownProps = Omit<React.HtmlHTMLAttributes<HTMLTextAreaElement>, 'onChange'> & {
  markdown: string;
  // onChange: (markdown: string) => void;
  isAdmin?: boolean;
  className?: string;
};

export function EditInfographicMarkdown({ markdown, isAdmin, className, ...props }: EditInfographicMarkdownProps) {
  const [editMode, toggleEditMode] = useToggle(false);
  //using a controlled component to validate the markdown
  const [controlledMarkdownValue, setControlledMarkdownValue] = useState(markdown);
  const [validationError, setValidationError] = useState<string>('');

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMarkdown = e.target.value;
    setControlledMarkdownValue(newMarkdown);

    //validate the markdown using schema
    const result = markdownSchema.safeParse({ markdown: newMarkdown });

    if (!result.success) {
      setValidationError(result.error.issues[0].message);
      return;
    }

    setValidationError('');
    // onChange(newMarkdown);
  };

  const handleCancelEdit = () => {
    setControlledMarkdownValue(markdown);
    setValidationError('');
    toggleEditMode();
  };

  if (editMode && isAdmin) {
    return (
      <div className='w-full h-full flex flex-col justify-center gap-4 p-6 border border-mi-gray-100 rounded-xl'>
        <TextAreaInput
          name='content'
          rows={7}
          className='w-full border-0 focus-visible:outline-none active:border-0 resize-none'
          value={controlledMarkdownValue}
          {...props}
          onChange={handleTextareaChange}
        />
        <div className='flex justify-between items-end gap-2'>
          <FormErrorMessage
            error={validationError}
            className={cn('h-full', {
              invisible: !validationError,
            })}
          />
          <EditInfographyActionBar onSubmit={() => {}} onCancel={handleCancelEdit} isSubmitDisabled={!!validationError} />
        </div>
      </div>
    );
  }

  return (
    <InfographyMarkdown
      isAdmin={isAdmin}
      /* if there is an error, show the original markdown */
      markdown={validationError ? markdown : controlledMarkdownValue}
      toggleEditMode={toggleEditMode}
      className={className}
    />
  );
}

interface InfographyMarkdownProps {
  isAdmin?: boolean;
  markdown: string;
  toggleEditMode: () => void;
  className?: string;
}

function InfographyMarkdown({ markdown, isAdmin, toggleEditMode, className }: InfographyMarkdownProps) {
  const [isHovered, toggleIsHovered] = useToggle(false);

  return (
    <div
      className={cn('flex w-full flex-col items-end gap-2 px-4 xl:px-0 cursor-pointer', className)}
      onClick={toggleEditMode}
      onMouseEnter={() => toggleIsHovered()}
      onMouseLeave={toggleIsHovered}
    >
      <div className='w-full prose xl:prose-xl max-w-full '>
        <Markdown className={cn('overflow-auto break-words', className)}>{markdown}</Markdown>
      </div>
      {isAdmin && (
        <EditIcon
          className={cn({
            invisible: !isHovered,
          })}
        />
      )}
    </div>
  );
}
