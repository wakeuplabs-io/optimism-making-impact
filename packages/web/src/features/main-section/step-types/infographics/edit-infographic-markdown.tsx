import { FormErrorMessage } from '@/components/form/form-error-message';
// import { FormInputWrapper } from '@/components/form/form-input';
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
  onChange: (markdown: string) => void;
  isAdmin?: boolean;
  className?: string;
};

export function EditInfographicMarkdown({ markdown, isAdmin, className, onChange, ...props }: EditInfographicMarkdownProps) {
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
    onChange(newMarkdown);
  };

  if (editMode && isAdmin) {
    return (
      // <FormInputWrapper error={validationError} className='w-full border-'>
      <>
        <TextAreaInput
          name='content'
          rows={7}
          className='w-full border-0 focus-visible:outline-none active:border-0 resize-none overflow-hidden'
          value={controlledMarkdownValue}
          {...props}
          onChange={handleTextareaChange}
        />
        <div className='flex flex-between items-start'>
          <FormErrorMessage
            error={validationError}
            className={cn('self-start', {
              invisible: !validationError,
            })}
          />
          <EditInfographyActionBar />
        </div>
      </>
      // </FormInputWrapper>
    );
  }

  return (
    <div className={cn('flex w-full flex-col items-end gap-2 px-4 xl:px-0 cursor-pointer', className)} onClick={toggleEditMode}>
      <div className='w-full prose xl:prose-xl max-w-full '>
        <Markdown className={cn('overflow-auto break-words', className)}>
          {/* if there is an error, show the original markdown */}
          {validationError ? markdown : controlledMarkdownValue}
        </Markdown>
      </div>
      {isAdmin && <EditIcon />}
    </div>
  );
}
