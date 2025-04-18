import { StepsContext } from './steps-context';
import { useQueryParams } from '@/hooks/use-query-params';
import { toast } from '@/hooks/use-toast';
import { queryClient } from '@/main';
import { StepsService } from '@/services/steps-service';
import { Step } from '@/types/steps';
import { CreateStepBody, UpdateStepBody } from '@optimism-making-impact/schemas';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ReactNode, useCallback, useEffect, useState } from 'react';

export const StepsProvider = ({ children }: { children: ReactNode }) => {
  const { selectedCategoryId, selectedStepId, setSelectedStepId } = useQueryParams();
  const [selectedStep, setSelectedStep] = useState<Step>();

  const {
    data: steps = [],
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: [`steps-by-category`, selectedCategoryId],
    queryFn: () => (selectedCategoryId ? StepsService.getByCategoryId(Number(selectedCategoryId)) : Promise.resolve([])),
    enabled: !!selectedCategoryId,
    staleTime: 1000 * 60 * 60 * 24,
    select: (data) => {
      return data.map((step, index) => ({ ...step, position: index }));
    },
  });

  const handleStepSelect = useCallback(
    (selectedStep?: Step) => {
      setSelectedStep(selectedStep);
      setSelectedStepId(selectedStep?.id);
    },
    [setSelectedStepId],
  );

  useEffect(() => {
    if (isLoading || isFetching) return;
    if (selectedCategoryId && steps.length === 0) {
      handleStepSelect(undefined);
      return;
    }

    const newStep = steps.find((c) => c.id === selectedStepId);
    handleStepSelect(newStep ?? steps[0]);
  }, [steps]);

  // API mutations with success handlers
  const deleteStep = useMutation({
    mutationFn: (stepId: number) => StepsService.deleteOne(stepId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`steps-by-category`, selectedCategoryId] });
    },
    onError: (err, stepId) => {
      let description = `Failed to delete step id ${stepId}`;
      if (err instanceof AxiosError) {
        description = err.response?.data.error.message;
      }

      toast({ title: 'Failed to delete step', description, variant: 'destructive' });
    },
  });

  const editStep = useMutation({
    mutationFn: ({ stepId, data }: { stepId: number; data: UpdateStepBody }) => StepsService.update(stepId, data),
    onSuccess: (_, props) => {
      queryClient.invalidateQueries({ queryKey: [`steps-by-category`, selectedCategoryId] });
      queryClient.invalidateQueries({ queryKey: ['step', props.stepId] });
    },
    onMutate: async (props: { stepId: number; data: UpdateStepBody }) => {
      await queryClient.cancelQueries({ queryKey: [`steps-by-category`, selectedCategoryId] });

      const previousSteps = queryClient.getQueryData<Step[]>([`steps-by-category`, selectedCategoryId]);

      if (!previousSteps) throw new Error('edit step - step not found');

      const oldStep = previousSteps.find((step) => step.id === props.stepId);

      if (!oldStep) throw new Error("step to update doens't exist!");

      const newStep: Step = { ...oldStep, ...props.data };

      const updatedSteps = previousSteps.map((step) => (step.id === props.stepId ? newStep : step));

      queryClient.setQueryData<Step[]>([`steps-by-category`, selectedCategoryId], updatedSteps);

      return { previousSteps };
    },
    onError: (err, props, context) => {
      if (context?.previousSteps) {
        queryClient.setQueryData([`steps-by-category`, selectedCategoryId], context.previousSteps);
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
    onSuccess: ({ data }) => {
      handleStepSelect(data);
      queryClient.invalidateQueries({ queryKey: [`steps-by-category`, selectedCategoryId] });
    },
    onMutate: async (data: CreateStepBody) => {
      await queryClient.cancelQueries({ queryKey: [`steps-by-category`, selectedCategoryId] });

      const previousSteps = queryClient.getQueryData<Step[]>([`steps-by-category`, selectedCategoryId]) ?? [];

      if (!previousSteps) throw new Error('add step - step not found');

      queryClient.setQueryData([`steps-by-category`, selectedCategoryId], () => [...previousSteps, { ...data }]);

      return { previousSteps };
    },
    onError: (err, data, context) => {
      if (context?.previousSteps) {
        queryClient.setQueryData([`steps-by-category`, selectedCategoryId], context.previousSteps);
      }
      let description = `Failed to create step ${data.title}`;
      if (err instanceof AxiosError) {
        description = err.response?.data.error.message;
      }

      toast({ title: 'Failed to create step', description, variant: 'destructive' });
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
