import { useSidebarStore } from '../sidebar/sidebar-store';
import { toast } from '@/hooks/use-toast';
import { StepsService } from '@/services/steps-service';
import { StepsStore } from '@/state/steps/types';
import { createWithMiddlewares } from '@/state/utils/create-with-middlewares';
import { optimisticUpdate } from '@/state/utils/optimistic-update';
import { stepArraySchema } from '@/types/steps';
import { CreateStepBody, UpdateStepBody } from '@optimism-making-impact/schemas';
import { AxiosError } from 'axios';

export const useStepsStore = createWithMiddlewares<StepsStore>((set, get) => ({
  loading: false,
  error: '',
  steps: [],
  selectedStep: null,
  searchSelectedStepId: null,
  setSelectedStep: (stepId: number) => {
    const selectedStep = get().steps.find((step) => step.id === stepId);
    if (!selectedStep) return;
    set(() => ({ selectedStep }));
  },
  fetchByCategoryId: async (categoryId: number) => {
    try {
      const isCategoryInProgress = useSidebarStore.getState().isCategoryInProgress(categoryId);

      if (isCategoryInProgress) {
        // category is in progress, do not call api and return empty steps
        set(() => ({ steps: [], selectedStep: null, searchSelectedStepId: null }));
        return;
      }

      const steps = await StepsService.getByCategoryId(categoryId);

      const parsedSteps = stepArraySchema.parse(steps);

      let selectedStep = parsedSteps.find((step) => step.id === get().searchSelectedStepId);

      if (!selectedStep) {
        selectedStep = parsedSteps[0];
      }

      set(() => ({ steps: parsedSteps, selectedStep, searchSelectedStepId: null }));
    } catch (error) {
      console.error(error);
      set(() => ({ error: 'Error fetching steps' }));
    }
  },
  addStep: async (roundId: number, data: CreateStepBody) => {
    await optimisticUpdate({
      getStateSlice: () => get().steps,
      updateFn: (steps) => {
        if (steps.length > 0) {
          const lastStep = steps[steps.length - 1];
          return [
            ...steps,
            {
              ...lastStep,
              ...data,
              id: lastStep.id,
              type: data.type,
              description: data.description ?? '',
            },
          ];
        } else {
          return [
            ...steps,
            {
              ...data,
              id: 1,
              description: data.description ?? '',
              type: data.type,
              smartListFilterId: data.smartListFilterId ?? null,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ];
        }
      },
      setStateSlice: (steps) => {
        set({ steps });
      },
      apiCall: () => StepsService.create(data),
      onError: (error) => {
        const title = 'Failed to create step';
        let description = 'Unknown error';

        if (error instanceof AxiosError) {
          description = error.response?.data.error.message;
        }

        toast({ title, description, variant: 'destructive' });
      },
      onSuccess: () => {
        get().fetchByCategoryId(roundId);
      },
    });
  },
  editStep: async (stepId: number, data: UpdateStepBody) => {
    await optimisticUpdate({
      getStateSlice: () => get().steps,
      updateFn: (steps) => steps.map((cat) => (cat.id === stepId ? { ...cat, ...data } : cat)),
      setStateSlice: (steps) => set(() => ({ steps })),
      apiCall: () => StepsService.update(stepId, data),
      onError: (error) => {
        const title = 'Failed to update step';
        let description = 'Unknown error';

        if (error instanceof AxiosError) {
          description = error.response?.data.error.message;
        }

        toast({ title, description, variant: 'destructive' });
      },
      onSuccess: () => {
        get().fetchByCategoryId(get().steps[0].categoryId);
      },
    });
  },
  editStepDescription: async (stepId: number, description: string) => {
    const stepToUpdate = get().selectedStep;

    if (!stepToUpdate || stepToUpdate.id !== stepId) {
      toast({
        title: 'Failed to update step',
        description: 'Invalid step',
        variant: 'destructive',
      });

      return;
    }

    await optimisticUpdate({
      getStateSlice: () => {
        const steps = get().steps;
        const selectedStep = get().selectedStep;
        return { steps, selectedStep };
      },
      updateFn: ({ steps, selectedStep }) => ({
        steps: steps.map((cat) => (cat.id === stepId ? { ...cat, description } : cat)),
        selectedStep: { ...selectedStep!, description },
      }),
      setStateSlice: ({ steps, selectedStep }) => set(() => ({ steps, selectedStep })),
      apiCall: () => StepsService.update(stepId, { ...stepToUpdate, description }),
      onError: (error) => {
        const title = 'Failed to delete step';
        let description = 'Unknown error';

        if (error instanceof AxiosError) {
          description = error.response?.data.error.message;
        }

        toast({ title, description, variant: 'destructive' });
      },
    });
  },
  deleteStep: async (stepId: number) => {
    const categoryId = get().steps[0].categoryId;

    await optimisticUpdate({
      getStateSlice: () => get().steps,
      updateFn: (steps) => steps.filter((s) => s.id !== stepId),
      setStateSlice: (steps) => set({ steps }),
      apiCall: () => StepsService.deleteOne(stepId),
      onError: (error) => {
        const title = 'Failed to delete step';
        let description = 'Unknown error';

        if (error instanceof AxiosError) {
          description = error.response?.data.error.message;
        }

        toast({ title, description, variant: 'destructive' });
      },
      onSuccess: () => {
        get().fetchByCategoryId(categoryId);
      },
    });
  },
}));
