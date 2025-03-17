import { queryClient } from '@/main';
import { router } from '@/router';
import { StepsService } from '@/services/steps-service';
import { Step } from '@/types/steps';
import { CreateStepBody, UpdateStepBody } from '@optimism-making-impact/schemas';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export function useStepsList() {
  const search = useSearch({ from: '/' });
  const { categoryId } = search;
  useEffect(() => {
    if (categoryId) {
      queryClient.invalidateQueries({ queryKey: ['steps'] });
    }
  }, [categoryId]);

  const [steps, setSteps] = useState<(Step & { position: number })[]>([]);
  const [selectedStep, setSelectedStep] = useState<(Step & { position: number }) | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['steps'],
    queryFn: () => StepsService.getByCategoryId(Number(categoryId)),
  });

  const setStepIdQueryParam = (stepId: number) => {
    router.navigate({
      search: { ...search, stepId },
      reloadDocument: false,
      to: '/',
    });
  };

  useEffect(() => {
    if (selectedStep) {
      setStepIdQueryParam(selectedStep.id);
    }
  }, [selectedStep]);

  useEffect(() => {
    if (data) {
      setSteps(data.map((step, index) => ({ ...step, position: index })));
      // set selected step to the first step if there are steps
      if (data.length > 0) {
        setSelectedStep({ ...data[0], position: 0 });
      }
    }
  }, [data]);

  const handleStepSelect = (step: Step) => {
    const stepWithPosition = steps.find((s) => s.id === step.id);
    setSelectedStep(stepWithPosition || null);
  };

  const deleteStep = useMutation({
    mutationFn: (stepId: number) => StepsService.deleteOne(stepId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['steps'] });
    },
  });

  const editStep = useMutation({
    mutationFn: ({ stepId, data }: { stepId: number; data: UpdateStepBody }) => StepsService.update(stepId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['steps'] });
    },
  });

  const addStep = useMutation({
    mutationFn: (data: CreateStepBody) => StepsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['steps'] });
    },
  });

  const handleStepDelete = (stepId: number) => {
    deleteStep.mutate(stepId);
  };

  const handleStepEdit = (stepId: number, data: UpdateStepBody) => {
    editStep.mutate({ stepId, data });
  };

  const handleStepAdd = (categoryId: number, data: CreateStepBody) => {
    addStep.mutate({ ...data, categoryId });
  };

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
