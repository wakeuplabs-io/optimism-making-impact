import { MarkdownText } from '@/components/markdown-text';
import { cn } from '@/lib/utils';
import { Pencil } from 'lucide-react';
import React from 'react';
import { useToggle } from 'usehooks-ts';

interface InfogrpahyCardProps extends ContentProps {
  containerClassName?: string;
}

export function EditableText(props: InfogrpahyCardProps) {
  return (
    <Container className={props.containerClassName}>
      <Content {...props} />
    </Container>
  );
}

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

function Container(props: ContainerProps) {
  return <div className={cn('flex w-full flex-col items-end gap-2 px-4 lg:px-0', props.className)}>{props.children}</div>;
}

interface ContentProps extends React.HtmlHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  isAdmin?: boolean;
  editModeClassName?: string;
  className?: string;
}

function Content({ value, isAdmin, editModeClassName, className, ...props }: InfogrpahyCardProps) {
  const [editMode, toggleEditMode] = useToggle(false);

  if (editMode && isAdmin) {
    return (
      <>
        <textarea
          rows={7}
          className={cn('max-w-screen flex w-[500px] items-center overflow-auto break-words rounded border p-2', editModeClassName)}
          value={value}
          {...props}
        />
        {<EditIcon onClick={toggleEditMode} isAdmin={isAdmin} />}
      </>
    );
  }

  return (
    <>
      <MarkdownText className={cn('w-full overflow-auto break-words', className)}>{value}</MarkdownText>
      <EditIcon onClick={toggleEditMode} isAdmin={isAdmin} />
    </>
  );
}

interface EditIconProps {
  onClick: () => void;
  isAdmin?: boolean;
}

function EditIcon(props: EditIconProps) {
  if (!props.isAdmin) return null;

  return (
    <Pencil
      size={14}
      onClick={() => props.onClick()}
      className='cursor-pointer stroke-[#7D7D7D] transition-all duration-300 ease-in-out hover:stroke-black'
    />
  );
}
