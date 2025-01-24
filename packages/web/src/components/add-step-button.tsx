import { IconButton } from '@/components/icon-button';
import { Plus } from 'lucide-react';

export function AddStepButton(props: React.HTMLAttributes<HTMLButtonElement>) {
  return <IconButton {...props} variant='secondary' icon={<Plus className='text-white' />}></IconButton>;
}
