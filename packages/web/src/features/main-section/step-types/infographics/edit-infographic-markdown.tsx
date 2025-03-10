import { FormInputWrapper } from '@/components/form/form-input';
import { EditPencilButton } from '@/components/pencil-edit-button';
import { TextAreaInput } from '@/components/text-area-input';
import { cn } from '@/lib/utils';
import { updateInfographicBodySchema } from '@optimism-making-impact/schemas';
import { useState } from 'react';
import Markdown from 'react-markdown';
import { useToggle } from 'usehooks-ts';

const markdownSchema = updateInfographicBodySchema.pick({ markdown: true });

interface EditInfographicMarkdownProps {
  markdown: string;
  onChange: (markdown: string) => void;
  isAdmin?: boolean;
}

export function EditInfographicMarkdown(props: ContentProps): JSX.Element {
  return (
    <Container>
      <Content {...props} />
    </Container>
  );
}

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

function Container(props: ContainerProps) {
  return <div className={cn('flex w-full flex-col items-end gap-2 px-4 xl:px-0', props.className)}>{props.children}</div>;
}

type ContentProps = EditInfographicMarkdownProps &
  Omit<React.HtmlHTMLAttributes<HTMLTextAreaElement>, 'onChange'> & {
    className?: string;
  };

function Content({ markdown, isAdmin, className, onChange, ...props }: ContentProps) {
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
      <FormInputWrapper error={validationError} className='w-full'>
        <TextAreaInput name='content' rows={7} value={controlledMarkdownValue} {...props} onChange={handleTextareaChange} />
        {isAdmin && <EditPencilButton onClick={toggleEditMode} />}
      </FormInputWrapper>
    );
  }

  return (
    <>
      <div className='prose w-full max-w-full xl:prose-xl'>
        <Markdown className={cn('overflow-auto break-words', className)}>
          {/* if there is an error, show the original markdown */}
          {validationError ? markdown : controlledMarkdownValue}
        </Markdown>
      </div>
      {isAdmin && <EditPencilButton onClick={toggleEditMode} />}
    </>
  );
}
