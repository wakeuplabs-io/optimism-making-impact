import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { userSchema } from '@optimism-making-impact/schemas';
import { useUserStore } from '@/state';
import { Input } from '@/components/ui/input';
import { FormErrorMessage } from '@/components/form/form-error-message';
import { cn } from '@/lib/utils';

export function AddEditorForm() {
  const { handleSubmit, control, formState, reset } = useForm({ resolver: zodResolver(userSchema) });
  const grantAdmin = useUserStore((state) => state.grantAdmin);

  const emailError = formState.errors.email?.message;

  const onSubmit = (email: string) => {
    grantAdmin(email);
    reset();
  };

  return (
    <form
      id={'add-editor-form'}
      onSubmit={handleSubmit((data) => onSubmit(data.email))}
      onError={(errors) => console.log(errors)}
      className='min-w-[300px] flex flex-col'
    >
      <p className='mb-4 text-xl text-[#bebebe]'>New Editor</p>
      <div
        className={cn('flex gap-2 border border-[#d9d9d9] p-1 rounded-xl mb-2', {
          'border-red-600': !!emailError,
        })}
      >
        <Controller
          name='email'
          control={control}
          defaultValue=''
          render={({ field }) => <Input {...field} type='email' placeholder='Email' className='flex-1 border-0 focus-visible:ring-0' />}
        />
        <Button type='submit' className='min-w-[99px] rounded-xl bg-[#10111a] px-8 text-white hover:bg-[#10111a]/90'>
          Add
        </Button>
      </div>
      {emailError && <FormErrorMessage error={emailError} />}
    </form>
  );
}
