import { FormErrorMessage } from '@/components/form/form-error-message';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { queryClient } from '@/main';
import { Editors, Role, UsersService } from '@/services/users-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '@optimism-making-impact/schemas';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Controller, useForm } from 'react-hook-form';

export function AddEditorForm() {
  const { handleSubmit, control, formState, reset } = useForm({ resolver: zodResolver(userSchema) });

  const grantAdmin = useMutation({
    mutationFn: (email: string) => UsersService.grantAdmin({ email }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['editors'] });
    },
    onMutate: async (email: string) => {
      await queryClient.cancelQueries({ queryKey: ['editors'] });

      const previousEditors = queryClient.getQueryData(['editors']);

      queryClient.setQueryData(['editors'], (editors: Editors[]) => [...editors, { email, role: Role.ADMIN }]);

      return { previousEditors };
    },
    onError: (err, email, context) => {
      if (context?.previousEditors) {
        queryClient.setQueryData(['editors'], context.previousEditors);
      }
      let description = `Failed to add admin ${email}`;
      if (err instanceof AxiosError) {
        description = err.response?.data.error.message;
      }

      toast({ title: 'Failed to revoke admin', description, variant: 'destructive' });
    },
  });

  const emailError = formState.errors.email?.message;

  const onSubmit = (email: string) => {
    grantAdmin.mutate(email);
    reset();
  };

  return (
    <form
      id={'add-editor-form'}
      onSubmit={handleSubmit((data) => onSubmit(data.email))}
      onError={(errors) => console.log(errors)}
      className='flex min-w-[300px] flex-col'
    >
      <p className='mb-4 text-xl text-[#bebebe]'>New Editor</p>
      <div
        className={cn('mb-2 flex gap-2 rounded-xl border border-[#d9d9d9] p-1', {
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
