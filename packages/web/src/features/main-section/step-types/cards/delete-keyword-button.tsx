import { DeleteIcon } from '@/components/icons/delete-icon';
import { Modal } from '@/components/modal';
import { Keyword } from '@/types';
import { Trash } from 'lucide-react';

interface DeleteKeywordButtonProps {
  onClick: (keywordId: number) => void;
  keyword: Keyword;
}

export function DeleteKeywordButton(props: DeleteKeywordButtonProps) {
  return (
    <Modal
      title='Delete keyword'
      trigger={<DeleteIcon />}
      buttons={[
        { label: 'Cancel', variant: 'secondary', closeOnClick: true },
        { label: 'Delete', variant: 'primary', closeOnClick: true, icon: <Trash />, onClick: () => props.onClick(props.keyword.id) },
      ]}
    >
      <span>Are you sure you want to delete this keyword?</span>
    </Modal>
  );
}
