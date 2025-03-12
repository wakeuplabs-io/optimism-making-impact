import { z } from 'zod';
import { FormModal, FormModalProps } from './form-modal';
import { Save, Trash } from 'lucide-react';
import { useToggle } from 'usehooks-ts';
import { DeleteConfirmationModal } from '../delete-confirmation-modal';
import { EditIcon } from '../icons/edit-icon';

interface EditEntityModalProps<TFormSchema extends z.AnyZodObject>
  extends Omit<FormModalProps<TFormSchema>, 'title' | 'submitButtonIcon' | 'submitButtonText' | 'secondaryButtonIcon'> {
  entity: string;
  deleteDescription: React.ReactNode;
  onDelete: () => void;
}

export function EditEntityModal<TFormSchema extends z.AnyZodObject>({
  entity,
  trigger,
  defaultValues,
  schema,
  deleteDescription,
  children,
  onSubmit,
  onDelete,
}: EditEntityModalProps<TFormSchema>) {
  const [isDeleteConfirmationModalOpen, toggleDeleteConfirmationModal] = useToggle();

  return (
    <>
      <FormModal
        title={`Edit ${entity}`}
        trigger={trigger ?? <EditIcon />}
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        schema={schema}
        submitButtonIcon={<Save />}
        submitButtonText='Save'
        secondaryButtonText='Delete'
        secondaryButtonIcon={<Trash />}
        onSecondaryClick={toggleDeleteConfirmationModal}
      >
        {children}
      </FormModal>
      {isDeleteConfirmationModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteConfirmationModalOpen}
          title={`Delete ${entity}`}
          description={deleteDescription}
          onConfirm={onDelete}
          onOpenChange={toggleDeleteConfirmationModal}
        />
      )}
    </>
  );
}
