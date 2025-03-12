import { FormErrorMessage } from '@/components/form/form-error-message';
import { EditIcon } from '@/components/icons/edit-icon';
import { TextAreaInput } from '@/components/text-area-input';
import { cn } from '@/lib/utils';
import { Infographic, updateInfographicBodySchema } from '@optimism-making-impact/schemas';
import { useRef, useState } from 'react';
import Markdown from 'react-markdown';
import { useToggle } from 'usehooks-ts';
import { EditInfographicActionBar } from './edit-infographic-action-bar';
import { useMainSectionStore } from '@/state/main-section/main-section-store';

const markdownSchema = updateInfographicBodySchema.pick({ markdown: true });

type EditInfographicMarkdownProps = Omit<React.HtmlHTMLAttributes<HTMLTextAreaElement>, 'onChange'> & {
  infographic: Infographic;
  isAdmin?: boolean;
  className?: string;
};

export function EditInfographicMarkdown({ infographic, isAdmin, className, ...props }: EditInfographicMarkdownProps) {
  const editInfographic = useMainSectionStore((state) => state.editInfographic);
  const [editMode, toggleEditMode] = useToggle(false);
  //using a controlled component to validate the markdown
  const [controlledMarkdownValue, setControlledMarkdownValue] = useState(infographic.markdown);
  const [validationError, setValidationError] = useState<string>('');
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

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

    const { error } = await editInfographic(infographic.id, { markdown: controlledMarkdownValue });

    if (error) {
      resetMarkdown();
    }

    toggleEditMode();
  };

  if (editMode && isAdmin) {
    return (
      <div className='w-full h-full flex flex-col justify-center gap-4 p-6 border border-mi-gray-100 rounded-xl'>
        <TextAreaInput
          ref={textAreaRef}
          name='content'
          rows={7}
          className='w-full border-0 focus-visible:outline-none active:border-0 resize-none'
          value={controlledMarkdownValue}
          {...props}
          onChange={handleTextareaChange}
          // autoFocus={true}
        />
        <div className='flex justify-between items-end gap-2'>
          <FormErrorMessage
            error={validationError}
            className={cn('h-full', {
              invisible: !validationError,
            })}
          />
          <EditInfographicActionBar onSubmit={handleSubmit} onCancel={handleCancelEdit} isSubmitDisabled={!!validationError} />
        </div>
      </div>
    );
  }

  return (
    <InfographicMarkdown
      isAdmin={isAdmin}
      /* if there is an error, show the original markdown */
      markdown={validationError ? infographic.markdown : controlledMarkdownValue}
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
