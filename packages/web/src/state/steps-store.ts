import { fetcher } from '@/lib/fetcher';
import { createWithMiddlewares } from '@/state/create-with-middlewares';
import { z } from 'zod';

const stepSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  icon: z.string(),
  position: z.number(), // Zero-based
  type: z.enum(['INFOGRAPHY', 'ITEMS', 'CARD']),
  roundId: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
const stepArraySchema = z.array(stepSchema);

type Step = z.infer<typeof stepSchema>;

interface StepsState {
  steps: Step[];
  /**
   * Zero-based.
   */
  selectedStepPosition: number;
  loading: boolean;
  error: string;
}

interface StepsActions {
  setSelectedStepPosition: (position: number) => void;
  setSteps: (stepId: string) => void;
}

type StepsStore = StepsState & StepsActions;

export const useStepsStore = createWithMiddlewares<StepsStore>((set) => ({
  loading: false,
  error: '',
  steps: [],
  selectedStepPosition: 0,
  setSelectedStepPosition: (position: number) => set(() => ({ selectedStepPosition: position })),
  setSteps: async (stepId: string) => {
    try {
      set(() => ({ loading: true }));
      const { data } = await fetcher.get(`/steps/${stepId}`).then((res) => res.data);

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
