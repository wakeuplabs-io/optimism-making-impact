import { AutoSaveStatus } from '@/components/autosave-indicator/types';
import { toast } from '@/hooks/use-toast';
import { AttributesService } from '@/services/attributes-service';
import { CardsService } from '@/services/cards-service';
import { InfographiesService } from '@/services/infographies-service';
import {
  CreateItemBody,
  CreateAttributeBody,
  BulkUpdateInfographyBody,
  UpdateInfographyBody,
  CreateInfographyBody,
} from '@optimism-making-impact/schemas';
import { ItemsService } from '@/services/items-service';
import { StepsService } from '@/services/steps-service';
import { MainSectionStore } from '@/state/main-section/types';
import { createWithMiddlewares } from '@/state/utils/create-with-middlewares';
import { optimisticUpdate } from '@/state/utils/optimistic-update';
import { Step } from '@/types';
import { CreateCardBody, UpdateCardBody } from '@optimism-making-impact/schemas';
import { AxiosError } from 'axios';
import isEqual from 'lodash.isequal';

export const useMainSectionStore = createWithMiddlewares<MainSectionStore>((set, get) => ({
  error: null,
  loading: true,
  savingStatus: AutoSaveStatus.IDLE,
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
  editInfogrpahy: async (infographyId: number, data: Partial<UpdateInfographyBody>) => {
    const step = get().step;
    const stepInitialState = get().stepInitialState;

    if (!step || !stepInitialState) return;

    const newStep = {
      ...step,
      infographies: step.infographies.map((infography) => (infography.id === infographyId ? { ...infography, ...data } : infography)),
    };

    const savingStatus = isEqual(newStep, stepInitialState) ? AutoSaveStatus.IDLE : AutoSaveStatus.UNSAVED;

    set({ step: newStep, savingStatus });
  },
  saveInfographies: async (data: BulkUpdateInfographyBody) => {
    try {
      const currentStep = get().step;
      if (!currentStep) return;

      set({ savingStatus: AutoSaveStatus.SAVING });

      const stepId = currentStep.id;

      await InfographiesService.updateBulk(data);
      await get().fetchData(stepId);

      toast({ title: 'Saved', description: 'Infographies updated successfully' });
    } catch (error) {
      const title = 'Failed to edit infographies';
      let description = 'Unknown error';

      if (error instanceof AxiosError) {
        description = error.response?.data.error.message;
      }

      toast({ title, description, variant: 'destructive' });
    } finally {
      set({ savingStatus: AutoSaveStatus.SAVED });

      setTimeout(() => {
        set({ savingStatus: AutoSaveStatus.IDLE });
      }, 2000);
    }
  },
  addInfography: async (data: CreateInfographyBody) => {
    const currentStep = get().step;
    if (!currentStep) return;

    const newInfographies = [
      ...currentStep.infographies,
      {
        ...data,
        id: -1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        position: currentStep.infographies.length,
      },
    ];

    set({ step: { ...currentStep, infographies: newInfographies } });
  },
  addCard: (data: CreateCardBody) => {
    const currentStep = get().step;
    if (!currentStep) return;

    const stepId = currentStep.id;

    optimisticUpdate({
      getStateSlice: () => currentStep.cards,
      updateFn: (cards) => [
        ...cards,
        {
          ...data,
          id: Date.now(),
          position: currentStep.cards.length,
          // attribute: currentStep.cards[currentStep.cards.length - 1]?.attribute, // TODO: CHECK:
          keywords: data.keywords.map((keyword) => ({
            id: Date.now(),
            value: keyword.value,
          })),
        },
      ],
      setStateSlice: (cards) => set((state) => ({ step: { ...state.step, cards } })),
      apiCall: () => CardsService.create(data),
      onError: (error) => {
        const title = 'Failed to create card';
        let description = 'Unknown error';

        if (error instanceof AxiosError) {
          description = error.response?.data.error.message;
        }

        toast({ title, description, variant: 'destructive' });
      },
      onSuccess: async () => {
        await get().fetchData(stepId);
      },
    });
  },
  editCard: (cardId: number, data: UpdateCardBody) => {
    const currentStep = get().step;
    if (!currentStep) return;

    const stepId = currentStep.id;

    optimisticUpdate({
      getStateSlice: () => currentStep.cards,
      updateFn: (cards) => {
        const keywords = data.keywords.map((keyword) => ({ ...keyword, id: Date.now() }));

        return cards.map((card) => (card.id === cardId ? { ...card, ...data, keywords } : card));
      },
      setStateSlice: (cards) => {
        set((state) => ({ step: { ...state.step, cards } }));
      },
      apiCall: () => CardsService.update(cardId, data),
      onError: (error) => {
        const title = 'Failed to edit card';
        let description = 'Unknown error';

        if (error instanceof AxiosError) {
          description = error.response?.data.error.message;
        }

        toast({ title, description, variant: 'destructive' });
      },
      onSuccess: async () => {
        await get().fetchData(stepId);
      },
    });
  },
  deleteCard: async (cardId: number) => {
    const currentStep = get().step;
    if (!currentStep) return;

    const stepId = currentStep.id;

    optimisticUpdate({
      getStateSlice: () => currentStep.cards,
      updateFn: (cards) => cards.filter((card) => card.id !== cardId),
      setStateSlice: (cards) => set((state) => ({ step: { ...state.step, cards } })),
      apiCall: () => CardsService.deleteOne(cardId),
      onError: (error) => {
        const title = 'Failed to delete card';
        let description = 'Unknown error';

        if (error instanceof AxiosError) {
          description = error.response?.data.error.message;
        }

        toast({ title, description, variant: 'destructive' });
      },
      onSuccess: async () => {
        await get().fetchData(stepId);
        toast({ title: 'Deleted', description: 'Card deleted' });
      },
    });
  },
  addAttributeToSmartList: (data: CreateAttributeBody) => {
    const currentStep = get().step;
    if (!currentStep || !currentStep.smartList) return;

    const stepId = currentStep.id;

    optimisticUpdate({
      getStateSlice: () => currentStep.smartList!.attributes,
      updateFn: (attributes) => [...attributes, { ...data, id: Date.now(), categoryId: 1 }],
      setStateSlice: (attributes) => set({ step: { ...currentStep, smartList: { ...currentStep.smartList!, attributes } } }),
      apiCall: () => AttributesService.create(data),
      onError: (error) => {
        const title = 'Failed to create attribute';
        let description = 'Unknown error';

        if (error instanceof AxiosError) {
          description = error.response?.data.error.message;
        }

        toast({ title, description, variant: 'destructive' });
      },
      onSuccess: async () => {
        await get().fetchData(stepId);
      },
    });
  },
  updateAttribute(data) {
    const currentStep = get().step;
    if (!currentStep || !currentStep.smartList) return;

    const stepId = currentStep.id;

    optimisticUpdate({
      getStateSlice: () => currentStep.smartList!.attributes,
      updateFn: (attributes) => attributes.map((attribute) => (attribute.id === data.id ? { ...attribute, ...data } : attribute)),
      setStateSlice: (attributes) => set({ step: { ...currentStep, smartList: { ...currentStep.smartList!, attributes } } }),
      apiCall: () => AttributesService.update(data),
      onError: (error) => {
        const title = 'Failed to update attribute';
        let description = 'Unknown error';

        if (error instanceof AxiosError) {
          description = error.response?.data.error.message;
        }

        toast({ title, description, variant: 'destructive' });
      },
      onSuccess: async () => {
        await get().fetchData(stepId);
      },
    });
  },
  deleteAttribute(attributeId: number) {
    const currentStep = get().step;
    if (!currentStep) return;

    const stepId = currentStep.id;

    optimisticUpdate({
      getStateSlice: () => currentStep.smartList!.attributes,
      updateFn: (attributes) => attributes.filter((attribute) => attribute.id !== attributeId),
      setStateSlice: (attributes) => set({ step: { ...currentStep, smartList: { ...currentStep.smartList!, attributes } } }),
      apiCall: () => AttributesService.deleteOne(attributeId),
      onError: (error) => {
        const title = 'Failed to delete attribute';
        let description = 'Unknown error';

        if (error instanceof AxiosError) {
          description = error.response?.data.error.message;
        }

        toast({ title, description, variant: 'destructive' });
      },
      onSuccess: async () => {
        await get().fetchData(stepId);
      },
    });
  },
  addItem(data: CreateItemBody) {
    const currentStep = get().step;
    if (!currentStep || !currentStep.smartList) return;

    const stepId = currentStep.id;

    const selectedAttribute = currentStep.smartList.attributes.find((attribute) => attribute.id === data.attributeId)!;

    if (!selectedAttribute) return;

    optimisticUpdate({
      getStateSlice: () => currentStep.items,
      updateFn: (items) => [
        ...items,
        { ...data, id: Date.now(), position: Date.now(), stepId: currentStep.id, attribute: selectedAttribute },
      ],
      setStateSlice: (items) => set({ step: { ...currentStep, items } }),
      apiCall: () => ItemsService.create(data),
      onError: (error) => {
        const title = 'Failed to create item';
        let description = 'Unknown error';

        if (error instanceof AxiosError) {
          description = error.response?.data.error.message;
        }

        toast({ title, description, variant: 'destructive' });
      },
      onSuccess: async () => {
        await get().fetchData(stepId);
      },
    });
  },
  updateItem(itemId, data) {
    const currentStep = get().step;
    if (!currentStep || !currentStep.smartList) return;

    const stepId = currentStep.id;

    optimisticUpdate({
      getStateSlice: () => currentStep.items,
      updateFn: (items) => items.map((item) => (item.id === itemId ? { ...item, ...data } : item)),
      setStateSlice: (items) => set({ step: { ...currentStep, items } }),
      apiCall: () => ItemsService.update(itemId, data),
      onError: (error) => {
        const title = 'Failed to edit item';
        let description = 'Unknown error';

        if (error instanceof AxiosError) {
          description = error.response?.data.error.message;
        }

        toast({ title, description, variant: 'destructive' });
      },
      onSuccess: async () => {
        await get().fetchData(stepId);
      },
    });
  },
  deleteItem(itemId) {
    const currentStep = get().step;
    if (!currentStep || !currentStep.smartList) return;

    const stepId = currentStep.id;

    optimisticUpdate({
      getStateSlice: () => currentStep.items,
      updateFn: (items) => items.filter((item) => item.id !== itemId),
      setStateSlice: (items) => set({ step: { ...currentStep, items } }),
      apiCall: () => ItemsService.deleteOne(itemId),
      onError: (error) => {
        const title = 'Failed to delete item';
        let description = 'Unknown error';

        if (error instanceof AxiosError) {
          description = error.response?.data.error.message;
        }

        toast({ title, description, variant: 'destructive' });
      },
      onSuccess: async () => {
        await get().fetchData(stepId);
      },
    });
  },
}));
