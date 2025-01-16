import { StepsService } from '@/services/steps/service';
import { MainSectionStore } from '@/state/main-section/types';
import { createWithMiddlewares } from '@/state/utils/create-with-middlewares';
import { Step } from '@/types';

export const useMainSectionStore = createWithMiddlewares<MainSectionStore>((set) => ({
  error: null,
  loading: false,
  step: null,
  fetchData: async (stepId: number) => {
    try {
      set({ loading: true });

      const response = await StepsService.getOne(stepId);
      const step: Step = response.data;

      set(() => ({ step }));
    } catch (error) {
      console.error(error);
      set({ error: "There's been an error fetching the step" });
    } finally {
      set({ loading: false });
    }
  },
}));
