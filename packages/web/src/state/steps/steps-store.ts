import { StepsService } from '@/services/steps/service';
import { StepsStore } from '@/state/steps/types';
import { createWithMiddlewares } from '@/state/utils/create-with-middlewares';
import { stepArraySchema } from '@/types';

export const useStepsStore = createWithMiddlewares<StepsStore>((set) => ({
  loading: false,
  error: '',
  steps: [],
  selectedStepPosition: 0,
  setSelectedStepPosition: (position: number) => set(() => ({ selectedStepPosition: position })),
  fetchByRoundId: async (roundId: number) => {
    try {
      set(() => ({ loading: true }));
      const { data } = await StepsService.getByRoundId(roundId);

      const parsedSteps = stepArraySchema.parse(data.steps);

      set(() => ({ steps: parsedSteps, selectedStep: parsedSteps[0] }));
    } catch (error) {
      console.error(error);
      set(() => ({ error: 'Error fetching steps' }));
    } finally {
      set(() => ({ loading: false }));
    }
  },
}));
