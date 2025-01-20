import { toast } from '@/hooks/use-toast';
import { BulkUpdateInfographyBody, CreateInfographyBody, UpdateInfographyBody } from '@/services/infogrpahies/schemas';
import { InfographiesService } from '@/services/infogrpahies/service';
import { StepsService } from '@/services/steps/service';
import { MainSectionStore } from '@/state/main-section/types';
import { createWithMiddlewares } from '@/state/utils/create-with-middlewares';
import { optimisticUpdate } from '@/state/utils/optimistic-update';
import { Step } from '@/types';
import { AxiosError } from 'axios';

export const useMainSectionStore = createWithMiddlewares<MainSectionStore>((set, get) => ({
  error: null,
  loading: true,
  saving: false,
  step: null,
  stepInitialState: null,
  init: async (stepId: number) => {
    set({ loading: true });
    await get().fetchData(stepId);
    set({ loading: false });
  },
  fetchData: async (stepId: number) => {
    try {
      const response = await StepsService.getOne(stepId);
      const step: Step = response.data;

      set(() => ({ step, stepInitialState: { ...step } }));
    } catch (error) {
      console.error(error);
      set({ error: "There's been an error fetching the step" });
      toast({ title: 'Error', description: "There's been an error fetching the step", variant: 'destructive' });
    }
  },
  deleteInfogrpahy: async (infographyId: number) => {
    const currentStep = get().step;
    if (!currentStep) return;

    const stepId = currentStep.id;

    optimisticUpdate({
      getStateSlice: () => currentStep.infographies,
      updateFn: (infographies) => infographies.filter((infography) => infography.id !== infographyId),
      setStateSlice: (infographies) => set((state) => ({ step: { ...state.step, infographies } })),
      apiCall: () => InfographiesService.deleteOne(infographyId),
      onError: (error) => {
        const title = 'Failed to delete infography';
        let description = 'Unknown error';

        if (error instanceof AxiosError) {
          description = error.response?.data.error.message;
        }

        toast({ title, description, variant: 'destructive' });
      },
      onSuccess: async () => {
        await get().fetchData(stepId);
        toast({ title: 'Deleted', description: 'Infography deleted' });
      },
    });
  },
  editInfogrpahy: async (infographyId: number, data: UpdateInfographyBody) => {
    const infography = get().step?.infographies.find((infography) => infography.id === infographyId);

    if (!infography) return;

    set((state) => ({
      step: {
        ...state.step,
        infographies: state.step?.infographies.map((infography) =>
          infography.id === infographyId ? { ...infography, ...data } : infography,
        ),
      },
    }));
  },
  saveInfogrpahies: async (data: BulkUpdateInfographyBody) => {
    const currentStep = get().step;
    if (!currentStep) return;

    const stepId = currentStep.id;

    // TODO: remove optimistic update

    await optimisticUpdate({
      getStateSlice: () => currentStep.infographies,
      updateFn: (infographies) => infographies.map((infography) => ({ ...infography, ...data })),
      setStateSlice: (infographies) => set((state) => ({ step: { ...state.step, infographies }, saving: true })),
      apiCall: () => InfographiesService.updateBulk(data),
      onError: (error) => {
        const title = 'Failed to edit categories';
        let description = 'Unknown error';

        if (error instanceof AxiosError) {
          description = error.response?.data.error.message;
        }

        toast({ title, description, variant: 'destructive' });
      },
      onSuccess: async () => {
        await get().fetchData(stepId);
        set({ saving: false });
        toast({ title: 'Saved', description: 'Infographies updated successfully' });
      },
    });
  },
  addInfography: async (data: CreateInfographyBody) => {
    const currentStep = get().step;
    if (!currentStep) return;

    const newInfographies = [
      ...currentStep.infographies,
      {
        ...data,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        position: currentStep.infographies.length,
      },
    ];

    set({ step: { ...currentStep, infographies: newInfographies } });
  },
}));
