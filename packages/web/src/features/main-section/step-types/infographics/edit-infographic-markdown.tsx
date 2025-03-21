import { EditInfographicActionBar } from './edit-infographic-action-bar';
import { FormErrorMessage } from '@/components/form/form-error-message';
import { EditIcon } from '@/components/icons/edit-icon';
import { TextAreaInput } from '@/components/text-area-input';
import { useStep } from '@/hooks/use-step';
import { cn } from '@/lib/utils';
import { Infographic, updateInfographicBodySchema } from '@optimism-making-impact/schemas';
import { useRef, useState } from 'react';
import Markdown from 'react-markdown';
import { useToggle } from 'usehooks-ts';

const markdownSchema = updateInfographicBodySchema.pick({ markdown: true });

type EditInfographicMarkdownProps = Omit<React.HtmlHTMLAttributes<HTMLTextAreaElement>, 'onChange'> & {
  infographic: Infographic;
  isAdmin?: boolean;
  className?: string;
};

export function EditInfographicMarkdown({ infographic, isAdmin, className, ...props }: EditInfographicMarkdownProps) {
  console.log(infographic.markdown);
  const { editInfographic } = useStep();
  const [editMode, toggleEditMode] = useToggle(false);
  const [controlledMarkdownValue, setControlledMarkdownValue] = useState(infographic.markdown);
  const [validationError, setValidationError] = useState<string>('');
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMarkdown = e.target.value;
    setControlledMarkdownValue(newMarkdown);

    const result = markdownSchema.safeParse({ markdown: newMarkdown });

    if (!result.success) {
      setValidationError(result.error.issues[0].message);
      return;
    }

    setValidationError('');
  };

  const resetMarkdown = () => {
    setControlledMarkdownValue(infographic.markdown);
    setValidationError('');
  };

  const handleCancelEdit = () => {
    resetMarkdown();
    toggleEditMode();
  };

  const handleSubmit = async () => {
    if (validationError) {
      return;
    }

    editInfographic({
      infographicId: infographic.id,
      data: { image: infographic.image, markdown: controlledMarkdownValue },
    });

    toggleEditMode();
  };

  if (editMode && isAdmin) {
    return (
      <div className='flex h-full w-full flex-col justify-center gap-4 rounded-xl border border-mi-gray-100 p-6'>
        <TextAreaInput
          ref={textAreaRef}
          name='content'
          rows={7}
          className='w-full resize-none border-0 focus-visible:outline-none focus-visible:ring-0 active:border-0'
          value={controlledMarkdownValue}
          {...props}
          onChange={handleTextareaChange}
        />
        <div className='flex items-end justify-between gap-2'>
          <FormErrorMessage error={validationError} className='h-full' />
          <EditInfographicActionBar onSubmit={handleSubmit} onCancel={handleCancelEdit} isSubmitDisabled={!!validationError} />
        </div>
      </div>
    );
  }

  return (
    <InfographicMarkdown
      isAdmin={isAdmin}
      markdown={infographic.markdown}
      toggleEditMode={() => {
        toggleEditMode();
        setTimeout(() => {
          if (!textAreaRef.current) {
            return;
          }
          textAreaRef.current.focus();
          textAreaRef.current.setSelectionRange(textAreaRef.current.value.length, textAreaRef.current.value.length);
          textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
        }, 0);
      }}
      className={className}
    />
  );
}

interface InfographicMarkdownProps {
  isAdmin?: boolean;
  markdown: string;
  toggleEditMode: () => void;
  className?: string;
}

function InfographicMarkdown({ markdown, isAdmin, toggleEditMode, className }: InfographicMarkdownProps) {
  const [isHovered, toggleIsHovered] = useToggle(false);

  return (
    <div
      className={cn('flex w-full cursor-pointer flex-col items-end gap-2 px-4 xl:px-0', className)}
      onClick={toggleEditMode}
      onMouseEnter={() => toggleIsHovered()}
      onMouseLeave={toggleIsHovered}
    >
      <div className='prose w-full max-w-full xl:prose-xl'>
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
