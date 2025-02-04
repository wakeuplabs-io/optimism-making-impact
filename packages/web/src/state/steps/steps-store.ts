import { toast } from '@/hooks/use-toast';
import { CreateStepBody, UpdateStepBody } from '@/services/steps/schemas';
import { StepsService } from '@/services/steps/service';
import { StepsStore } from '@/state/steps/types';
import { createWithMiddlewares } from '@/state/utils/create-with-middlewares';
import { optimisticUpdate } from '@/state/utils/optimistic-update';
import { stepArraySchema } from '@/types';
import { AxiosError } from 'axios';

export const useStepsStore = createWithMiddlewares<StepsStore>((set, get) => ({
  loading: false,
  error: '',
  steps: [],
  selectedStep: null,
  setSelectedStep: (stepId: number) => {
    const selectedStep = get().steps.find((step) => step.id === stepId);
    if (!selectedStep) return;
    set(() => ({ selectedStep }));
  },
  fetchByRoundId: async (roundId: number) => {
    try {
      const { data } = await StepsService.getByRoundId(roundId);

      const parsedSteps = stepArraySchema.parse(data.steps);

      set(() => ({ steps: parsedSteps, selectedStep: parsedSteps[parsedSteps.length - 1] }));
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
              type: data.type ?? 'INFOGRAPHY',
              position: lastStep.position + 1,
              description: data.description ?? '',
            },
          ];
        } else {
          return [
            ...steps,
            {
              ...data,
              id: 1,
              position: 0,
              description: data.description ?? '',
              type: data.type ?? 'INFOGRAPHY',
              smartListId: data.smartListId ?? null,
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
        get().fetchByRoundId(roundId);
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
        get().fetchByRoundId(get().steps[0].roundId);
      },
    });
  },
  deleteStep: async (stepId: number) => {
    const roundId = get().steps[0].roundId;

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
        get().fetchByRoundId(roundId);
      },
    });
  },
}));
