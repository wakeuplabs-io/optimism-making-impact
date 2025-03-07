import { DeleteIcon } from '@/components/icons/delete-icon';
import { Modal } from '@/components/modal';
import { Category } from '@/types';
import { Trash } from 'lucide-react';

interface DeleteCategoryButtonProps {
  category: Category;
  onDelete: (id: number) => void;
}

export function DeleteCategoryButton(props: DeleteCategoryButtonProps) {
  return (
    <Modal
      title='Delete category'
      subtitle='Click save when you are done.'
      trigger={<DeleteIcon />}
      buttons={[
        { label: 'Cancel', variant: 'secondary', closeOnClick: true },
        { label: 'Delete', variant: 'primary', icon: <Trash />, onClick: () => props.onDelete(props.category.id) },
      ]}
    >
      <span>Are you sure you want to delete {props.category.name} category?</span>
    </Modal>
  );
}
