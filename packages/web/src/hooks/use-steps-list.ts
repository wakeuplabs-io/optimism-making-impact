import { queryClient } from '@/main';
import { router } from '@/router';
import { StepsService } from '@/services/steps-service';
import { Step } from '@/types/steps';
import { CreateStepBody, UpdateStepBody } from '@optimism-making-impact/schemas';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { toast } from './use-toast';

export function useStepsList() {
  // Get category ID from URL search params
  const search = useSearch({ from: '/' });
  const { categoryId } = search;

  // State for steps and selected step
  const [steps, setSteps] = useState<(Step & { position: number })[]>([]);
  const [selectedStep, setSelectedStep] = useState<(Step & { position: number }) | null>(null);

  // Fetch steps data
  const { data, isLoading, error } = useQuery({
    queryKey: [`steps-by-category`, categoryId],
    queryFn: () => (categoryId ? StepsService.getByCategoryId(Number(categoryId)) : Promise.resolve([])),
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 60 * 24
  });


  // Step selection handler
  const handleStepSelect = (stepId: number) => {
    const stepWithPosition = steps.find((s) => s.id === stepId);
    setSelectedStep(stepWithPosition || null);
    if (stepWithPosition) {
      router.navigate({
        search: { ...search, stepId: stepWithPosition.id },
        reloadDocument: false,
        to: '/',
      });
    }
  };

  // Process steps data when it changes
  useEffect(() => {
    if (data) {
      const stepsWithPosition = data.map((step, index) => ({ ...step, position: index }));
      setSteps(stepsWithPosition);

      // Select first step if there are steps
      if (data.length > 0) {
        handleStepSelect(data[0].id);
      }
    }
  }, [data]);

  // API mutations with success handlers
  const deleteStep = useMutation({
    mutationFn: (stepId: number) => StepsService.deleteOne(stepId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [`steps-by-category`, categoryId] }),
    onMutate: async (stepId: number) => {
      await queryClient.cancelQueries({ queryKey: [`steps-by-category`, categoryId] });

      const previousSteps = queryClient.getQueryData<Step[]>([`steps-category-${categoryId}`]) ?? [];

      const updatedSteps = previousSteps.filter(step => step.id !== stepId);

      queryClient.setQueryData<Step[]>([`steps-category-${categoryId}`], updatedSteps);

      return { previousSteps };
    },
    onError: (err, stepId, context) => {
      if (context?.previousSteps) {
        queryClient.setQueryData([`steps-category-${categoryId}`], context.previousSteps);
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
    onMutate: async (props: { stepId: number, data: UpdateStepBody }) => {
      await queryClient.cancelQueries({ queryKey: [`steps-by-category`, categoryId] });

      const previousSteps = queryClient.getQueryData<Step[]>([`steps-category-${categoryId}`]) ?? [];
      const oldStep = previousSteps.find(step => step.id === props.stepId);

      if (!oldStep) throw new Error("step to update doens't exist!")

      const newStep: Step = { ...oldStep, ...props.data, id: props.stepId };

      const updatedSteps = previousSteps.map(step => step.id === props.stepId ? newStep : step);

      queryClient.setQueryData<Step[]>([`steps-category-${categoryId}`], updatedSteps);

      return { previousSteps };
    },
    onError: (err, props, context) => {
      if (context?.previousSteps) {
        queryClient.setQueryData([`steps-category-${categoryId}`], context.previousSteps);
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

      const previousSteps = queryClient.getQueryData([`steps-category-${categoryId}`]);

      queryClient.setQueryData([`steps-category-${categoryId}`], (steps: Step[]) => [...steps, { ...data }]);

      return { previousSteps };
    },
    onError: (err, data, context) => {
      if (context?.previousSteps) {
        queryClient.setQueryData([`steps-category-${categoryId}`], context.previousSteps);
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

  return {
    steps,
    selectedStep,
    isLoading,
    error,
    handleStepSelect,
    handleStepDelete,
    handleStepEdit,
    handleStepAdd,
  };
}
