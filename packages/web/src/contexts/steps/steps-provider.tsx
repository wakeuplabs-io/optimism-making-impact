import { StepsContext, StepWithPosition } from './steps-context';
import { toast } from '@/hooks/use-toast';
import { queryClient } from '@/main';
import { router } from '@/router';
import { StepsService } from '@/services/steps-service';
import { Step } from '@/types/steps';
import { UpdateStepBody, CreateStepBody } from '@optimism-making-impact/schemas';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { ReactNode, useEffect, useState } from 'react';

export const StepsProvider = ({ children }: { children: ReactNode }) => {
  // Get category ID from URL search params
  const search = useSearch({ from: '/' });
  const { categoryId, stepId } = search;

  const [selectedStep, setSelectedStep] = useState<StepWithPosition | null>(null);
  // Fetch steps data
  const {
    data: steps = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: [`steps-by-category`, categoryId],
    queryFn: () => (categoryId ? StepsService.getByCategoryId(Number(categoryId)) : Promise.resolve([])),
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 60 * 24,
    select: (data) => {
      return data.map((step, index) => ({ ...step, position: index }));
    },
  });

  // Step selection handler
  const handleStepSelect = (stepId?: number) => {
    const stepWithPosition = stepId ? (steps.find((s) => s.id === stepId) ?? steps[0]) : steps[0];
    setSelectedStep(stepWithPosition);

    if (stepWithPosition) {
      router.navigate({
        search: (prev) => ({ ...prev, stepId: stepWithPosition.id }),
        reloadDocument: false,
        to: '/',
      });
    }
  };

  // Process steps data when it changes
  useEffect(() => {
    if (steps.length > 0 && !isLoading) handleStepSelect(stepId);
  }, [steps, isLoading]);

  // API mutations with success handlers
  const deleteStep = useMutation({
    mutationFn: (stepId: number) => StepsService.deleteOne(stepId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [`steps-by-category`, categoryId] }),
    onMutate: async (stepId: number) => {
      await queryClient.cancelQueries({ queryKey: [`steps-by-category`, categoryId] });

      const previousSteps = queryClient.getQueryData<Step[]>([`steps-by-category`, categoryId]) ?? [];

      const updatedSteps = previousSteps.filter((step) => step.id !== stepId);

      queryClient.setQueryData<Step[]>([`steps-by-category`, categoryId], updatedSteps);

      return { previousSteps };
    },
    onError: (err, stepId, context) => {
      if (context?.previousSteps) {
        queryClient.setQueryData([`steps-by-category`, categoryId], context.previousSteps);
      }
      let description = `Failed to delete step id ${stepId}`;
      if (err instanceof AxiosError) {
        description = err.response?.data.error.message;
      }

      toast({ title: 'Failed to delete step', description, variant: 'destructive' });
    },
  });

  const editStep = useMutation({
    mutationFn: ({ stepId, data }: { stepId: number; data: UpdateStepBody }) => StepsService.update(stepId, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [`steps-by-category`, categoryId] }),
    onMutate: async (props: { stepId: number; data: UpdateStepBody }) => {
      await queryClient.cancelQueries({ queryKey: [`steps-by-category`, categoryId] });

      const previousSteps = queryClient.getQueryData<Step[]>([`steps-by-category`, categoryId]);

      if (!previousSteps) throw new Error('edit step - step not found');

      const oldStep = previousSteps.find((step) => step.id === props.stepId);

      if (!oldStep) throw new Error("step to update doens't exist!");

      const newStep: Step = { ...oldStep, ...props.data };

      const updatedSteps = previousSteps.map((step) => (step.id === props.stepId ? newStep : step));

      queryClient.setQueryData<Step[]>([`steps-by-category`, categoryId], updatedSteps);

      return { previousSteps };
    },
    onError: (err, props, context) => {
      if (context?.previousSteps) {
        queryClient.setQueryData([`steps-by-category`, categoryId], context.previousSteps);
      }
      let description = `Failed to edit step ${props.data.title}`;
      if (err instanceof AxiosError) {
        description = err.response?.data.error.message;
      }

      toast({ title: 'Failed to edit step', description, variant: 'destructive' });
    },
  });

  const addStep = useMutation({
    mutationFn: (data: CreateStepBody) => StepsService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [`steps-by-category`, categoryId] }),
    onMutate: async (data: CreateStepBody) => {
      await queryClient.cancelQueries({ queryKey: [`steps-by-category`, categoryId] });

      const previousSteps = queryClient.getQueryData<Step[]>([`steps-by-category`, categoryId]) ?? [];

      if (!previousSteps) throw new Error('add step - step not found');

      queryClient.setQueryData([`steps-by-category`, categoryId], () => [...previousSteps, { ...data }]);

      return { previousSteps };
    },
    onError: (err, data, context) => {
      if (context?.previousSteps) {
        queryClient.setQueryData([`steps-by-category`, categoryId], context.previousSteps);
      }
      let description = `Failed to create step ${data.title}`;
      if (err instanceof AxiosError) {
        description = err.response?.data.error.message;
      }

      toast({ title: 'Failed to revoke admin', description, variant: 'destructive' });
    },
  });

  // Handler functions
  const handleStepDelete = (stepId: number) => deleteStep.mutate(stepId);

  const handleStepEdit = (stepId: number, data: UpdateStepBody) => editStep.mutate({ stepId, data });

  const handleStepAdd = (categoryId: number, data: CreateStepBody) => addStep.mutate({ ...data, categoryId });
  return (
    <StepsContext.Provider
      value={{
        steps,
        isLoading,
        error,
        selectedStep,
        handleStepSelect,
        handleStepDelete,
        handleStepEdit,
        handleStepAdd,
      }}
    >
      {children}
    </StepsContext.Provider>
  );
};
