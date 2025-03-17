import { queryClient } from '@/main';
import { router } from '@/router';
import { StepsService } from '@/services/steps-service';
import { Step } from '@/types/steps';
import { CreateStepBody, UpdateStepBody } from '@optimism-making-impact/schemas';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { useState, useEffect } from 'react';

export function useStepsList() {
  // Get category ID from URL search params
  const search = useSearch({ from: '/' });
  const { categoryId } = search;

  // State for steps and selected step
  const [steps, setSteps] = useState<(Step & { position: number })[]>([]);
  const [selectedStep, setSelectedStep] = useState<(Step & { position: number }) | null>(null);

  // Invalidate steps query when category changes
  useEffect(() => {
    if (categoryId) {
      queryClient.invalidateQueries({ queryKey: ['steps'] });
    }
  }, [categoryId]);

  // Fetch steps data
  const { data, isLoading, error } = useQuery({
    queryKey: ['steps'],
    queryFn: () => (categoryId ? StepsService.getByCategoryId(Number(categoryId)) : Promise.resolve([])),
    enabled: !!categoryId,
  });

  // Update URL when selected step changes
  useEffect(() => {
    if (selectedStep) {
      router.navigate({
        search: { ...search, stepId: selectedStep.id },
        reloadDocument: false,
        to: '/',
      });
    }
  }, [selectedStep, search]);

  // Process steps data when it changes
  useEffect(() => {
    if (data) {
      const stepsWithPosition = data.map((step, index) => ({ ...step, position: index }));
      setSteps(stepsWithPosition);

      // Select first step if there are steps
      if (data.length > 0 && !selectedStep) {
        setSelectedStep({ ...data[0], position: 0 });
      }
    }
  }, [data]);

  // Step selection handler
  const handleStepSelect = (step: Step) => {
    const stepWithPosition = steps.find((s) => s.id === step.id);
    setSelectedStep(stepWithPosition || null);
  };

  // API mutations with success handlers
  const deleteStep = useMutation({
    mutationFn: (stepId: number) => StepsService.deleteOne(stepId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['steps'] }),
  });

  const editStep = useMutation({
    mutationFn: ({ stepId, data }: { stepId: number; data: UpdateStepBody }) => StepsService.update(stepId, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['steps'] }),
  });

  const addStep = useMutation({
    mutationFn: (data: CreateStepBody) => StepsService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['steps'] }),
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
