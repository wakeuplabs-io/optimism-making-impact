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
  selectedStepPosition: 0,
  setSelectedStepPosition: (position: number) => set(() => ({ selectedStepPosition: position })),
  fetchByRoundId: async (roundId: number) => {
    try {
      const { data } = await StepsService.getByRoundId(roundId);

      const parsedSteps = stepArraySchema.parse(data.steps);

      set(() => ({ steps: parsedSteps, selectedStep: parsedSteps[0] }));
    } catch (error) {
      console.error(error);
      set(() => ({ error: 'Error fetching steps' }));
    }
  },
  addStep: async (data: CreateStepBody) => {
    await optimisticUpdate({
      getStateSlice: () => get().steps,
      updateFn: (steps) => [
        ...steps,
        { ...steps[steps.length - 1], ...data, id: steps[steps.length - 1].id, type: data.type ?? 'INFOGRAPHY' },
      ],
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
        get().fetchByRoundId(get().steps[0].roundId);
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
    await optimisticUpdate({
      getStateSlice: () => get().steps,
      updateFn: (steps) => steps.filter((s) => s.id !== stepId),
      setStateSlice: (steps) =>
        set((state) => ({ steps, selectedStepPosition: state.selectedStepPosition - 1 >= 0 ? state.selectedStepPosition - 1 : 0 })),
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
        get().fetchByRoundId(get().steps[0].roundId);
      },
    });
  },
}));
