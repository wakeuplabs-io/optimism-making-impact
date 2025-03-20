import { toast } from './use-toast';
import { queryClient } from '@/main';
import { AttributesService } from '@/services/attributes-service';
import { CardsService } from '@/services/cards-service';
import { InfographicsService } from '@/services/infographics-service';
import { ItemsService } from '@/services/items-service';
import { StepsService } from '@/services/steps-service';
import { CompleteStep } from '@/types/steps';
import {
  CreateAttributeBody,
  CreateCardBody,
  CreateInfographicBody,
  CreateItemBody,
  UpdateAttributeBody,
  UpdateCardBody,
  UpdateInfographicBody,
  UpdateItemBody,
} from '@optimism-making-impact/schemas';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { AxiosError } from 'axios';

export function useStepQueries() {
  const { stepId } = useSearch({ from: '/' });
  const queryKeyArr = ['step', stepId];

  const {
    data: step,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeyArr,
    queryFn: () => StepsService.getOne(stepId!),
    enabled: !!stepId,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const { mutate: addCard } = useMutation({
    mutationFn: (data: CreateCardBody) => CardsService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeyArr }),
    onMutate: async (data: CreateCardBody) => {
      await queryClient.cancelQueries({ queryKey: queryKeyArr });

      const previousStep = queryClient.getQueryData<CompleteStep>(queryKeyArr);

      if (!previousStep) throw new Error('add card - step not found');

      queryClient.setQueryData(queryKeyArr, () => ({ ...previousStep, ...data }));

      return { previousStep };
    },
    onError: (err, data, context) => {
      if (context?.previousStep) {
        queryClient.setQueryData(queryKeyArr, context.previousStep);
      }
      let description = `Failed to add card ${data.title}`;
      if (err instanceof AxiosError) {
        description = err.response?.data.error.message;
      }

      toast({ title: 'Failed to add card', description, variant: 'destructive' });
    },
  });

  const { mutate: editCard } = useMutation({
    mutationFn: (props: { cardId: number; data: UpdateCardBody }) => CardsService.update(props.cardId, props.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeyArr }),
    onMutate: async (props: { cardId: number; data: UpdateCardBody }) => {
      await queryClient.cancelQueries({ queryKey: queryKeyArr });

      const previousStep = queryClient.getQueryData<CompleteStep>(queryKeyArr);

      if (!previousStep) throw new Error('delete card - step not found');

      queryClient.setQueryData(queryKeyArr, () => ({ ...previousStep, ...props.data }));

      return { previousStep };
    },
    onError: (err, props, context) => {
      if (context?.previousStep) {
        queryClient.setQueryData(queryKeyArr, context.previousStep);
      }
      let description = `Failed to add card ${props.data.title}`;
      if (err instanceof AxiosError) {
        description = err.response?.data.error.message;
      }

      toast({ title: 'Failed to add card', description, variant: 'destructive' });
    },
  });

  const { mutate: deleteCard } = useMutation({
    mutationFn: (cardId: number) => CardsService.deleteOne(cardId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeyArr }),
    onMutate: async (cardId: number) => {
      await queryClient.cancelQueries({ queryKey: queryKeyArr });

      const previousStep = queryClient.getQueryData<CompleteStep>(queryKeyArr);

      if (!previousStep) throw new Error('delete card - step not found');

      const newCards = previousStep.cards.filter((x) => x.id !== cardId);

      const updatedStep = { ...previousStep, cards: newCards };

      queryClient.setQueryData<CompleteStep>(queryKeyArr, updatedStep);

      return { previousStep };
    },
    onError: (err, cardId, context) => {
      if (context?.previousStep) {
        queryClient.setQueryData(queryKeyArr, context.previousStep);
      }
      let description = `Failed to delete card ${cardId}`;
      if (err instanceof AxiosError) {
        description = err.response?.data.error.message;
      }

      toast({ title: 'Failed to delete step', description, variant: 'destructive' });
    },
  });

  const { mutate: addAttributeToSmartList } = useMutation({
    mutationFn: (data: CreateAttributeBody) => AttributesService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeyArr }),
    onMutate: async (data: CreateAttributeBody) => {
      await queryClient.cancelQueries({ queryKey: queryKeyArr });

      const previousStep = queryClient.getQueryData<CompleteStep>(queryKeyArr);

      if (!previousStep) throw new Error('add attribute to smart list - step not found');

      queryClient.setQueryData(queryKeyArr, () => ({ ...previousStep, ...data }));

      return { previousStep };
    },
    onError: (err, data, context) => {
      if (context?.previousStep) {
        queryClient.setQueryData(queryKeyArr, context.previousStep);
      }
      let description = `Failed to add attribute to smart list ${data.description}`;
      if (err instanceof AxiosError) {
        description = err.response?.data.error.message;
      }

      toast({ title: 'Failed to add attribute to smart list', description, variant: 'destructive' });
    },
  });
  const { mutate: updateAttribute } = useMutation({
    mutationFn: (data: UpdateAttributeBody) => AttributesService.update(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeyArr }),
    onMutate: async (data: UpdateAttributeBody) => {
      await queryClient.cancelQueries({ queryKey: queryKeyArr });

      const previousStep = queryClient.getQueryData<CompleteStep>(queryKeyArr);

      if (!previousStep) throw new Error('edit attribute - step not found');

      queryClient.setQueryData(queryKeyArr, () => ({ ...previousStep, ...data }));

      return { previousStep };
    },
    onError: (err, data, context) => {
      if (context?.previousStep) {
        queryClient.setQueryData(queryKeyArr, context.previousStep);
      }
      let description = `Failed to edit attribute ${data.description}`;
      if (err instanceof AxiosError) {
        description = err.response?.data.error.message;
      }

      toast({ title: 'Failed to edit attribute', description, variant: 'destructive' });
    },
  });

  const { mutate: deleteAttribute } = useMutation({
    mutationFn: (attributeId: number) => AttributesService.deleteOne(attributeId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeyArr }),
    onMutate: async (attributeId: number) => {
      await queryClient.cancelQueries({ queryKey: queryKeyArr });

      const previousStep = queryClient.getQueryData<CompleteStep>(queryKeyArr);

      if (!previousStep || !previousStep.smartListFilter) throw new Error('delete attribute - step not found');

      const newAttributes = previousStep.smartListFilter?.attributes.filter((x) => x.id !== attributeId);

      const updatedStep = { ...previousStep, smartListFilter: { ...previousStep.smartListFilter, attributes: newAttributes } };

      queryClient.setQueryData<CompleteStep>(queryKeyArr, updatedStep);

      return { previousStep };
    },
    onError: (err, attributeId, context) => {
      if (context?.previousStep) {
        queryClient.setQueryData(queryKeyArr, context.previousStep);
      }
      let description = `Failed to delete attribute ${attributeId}`;
      if (err instanceof AxiosError) {
        description = err.response?.data.error.message;
      }

      toast({ title: 'Failed to delete attribute', description, variant: 'destructive' });
    },
  });

  const { mutate: addItem } = useMutation({
    mutationFn: (data: CreateItemBody) => ItemsService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeyArr }),
    onMutate: async (data: CreateItemBody) => {
      await queryClient.cancelQueries({ queryKey: queryKeyArr });

      const previousStep = queryClient.getQueryData<CompleteStep>(queryKeyArr);

      if (!previousStep) throw new Error('delete card - step not found');

      queryClient.setQueryData(queryKeyArr, () => ({ ...previousStep, ...data }));

      return { previousStep };
    },
    onError: (err, data, context) => {
      if (context?.previousStep) {
        queryClient.setQueryData(queryKeyArr, context.previousStep);
      }
      let description = `Failed to add item on step ${data.stepId}`;
      if (err instanceof AxiosError) {
        description = err.response?.data.error.message;
      }

      toast({ title: 'Failed to add item', description, variant: 'destructive' });
    },
  });

  const { mutate: updateItem } = useMutation({
    mutationFn: (props: { itemId: number; data: UpdateItemBody }) => ItemsService.update(props.itemId, props.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeyArr }),
    onMutate: async (props: { itemId: number; data: UpdateItemBody }) => {
      await queryClient.cancelQueries({ queryKey: queryKeyArr });

      const previousStep = queryClient.getQueryData<CompleteStep>(queryKeyArr);

      if (!previousStep) throw new Error('delete item - step not found');

      const oldItem = previousStep.items.find((x) => x.id === props.itemId);
      const newItem = { ...oldItem, ...props.data };
      const newItems = [...previousStep.items.filter((x) => x.id !== props.itemId), newItem];

      queryClient.setQueryData(queryKeyArr, () => ({ ...previousStep, items: newItems }));

      return { previousStep };
    },
    onError: (err, itemId, context) => {
      if (context?.previousStep) {
        queryClient.setQueryData(queryKeyArr, context.previousStep);
      }
      let description = `Failed to delete  item ${itemId}`;
      if (err instanceof AxiosError) {
        description = err.response?.data.error.message;
      }

      toast({ title: 'Failed to delete item', description, variant: 'destructive' });
    },
  });

  const { mutate: deleteItem } = useMutation({
    mutationFn: (itemId: number) => ItemsService.deleteOne(itemId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeyArr }),
    onMutate: async (itemId: number) => {
      await queryClient.cancelQueries({ queryKey: queryKeyArr });

      const previousStep = queryClient.getQueryData<CompleteStep>(queryKeyArr);

      if (!previousStep) throw new Error('delete item - step not found');

      const newItems = previousStep.items.filter((x) => x.id !== itemId);

      queryClient.setQueryData(queryKeyArr, () => ({ ...previousStep, items: newItems }));

      return { previousStep };
    },
    onError: (err, itemId, context) => {
      if (context?.previousStep) {
        queryClient.setQueryData(queryKeyArr, context.previousStep);
      }
      let description = `Failed to delete  item ${itemId}`;
      if (err instanceof AxiosError) {
        description = err.response?.data.error.message;
      }

      toast({ title: 'Failed to delete item', description, variant: 'destructive' });
    },
  });

  const { mutate: addInfographic } = useMutation({
    mutationFn: (data: CreateInfographicBody) => InfographicsService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeyArr }),
    onMutate: async (data: CreateInfographicBody) => {
      await queryClient.cancelQueries({ queryKey: queryKeyArr });

      const previousStep = queryClient.getQueryData<CompleteStep>(queryKeyArr);

      if (!previousStep) throw new Error('add infographic - step not found');

      queryClient.setQueryData(queryKeyArr, () => ({ ...previousStep, infographics: [...previousStep.infographics, data] }));

      return { previousStep };
    },
    onError: (err, data, context) => {
      if (context?.previousStep) {
        queryClient.setQueryData(queryKeyArr, context.previousStep);
      }
      let description = `Failed to add infographic on step ${data.stepId}`;
      if (err instanceof AxiosError) {
        description = err.response?.data.error.message;
      }

      toast({ title: 'Failed to add infographic', description, variant: 'destructive' });
    },
  });

  const { mutate: editInfographic } = useMutation({
    mutationFn: (props: { infographicId: number; data: UpdateInfographicBody }) =>
      InfographicsService.update(props.infographicId, props.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeyArr }),
    onMutate: async (props: { infographicId: number; data: UpdateInfographicBody }) => {
      await queryClient.cancelQueries({ queryKey: queryKeyArr });

      const previousStep = queryClient.getQueryData<CompleteStep>(queryKeyArr);

      if (!previousStep) throw new Error('delete item - step not found');

      const oldInfographic = previousStep.infographics.find((x) => x.id === props.infographicId);
      const newInfographic = { ...oldInfographic, ...props.data };
      const newInfographics = [...previousStep.infographics.filter((x) => x.id !== props.infographicId), newInfographic];

      queryClient.setQueryData(queryKeyArr, () => ({ ...previousStep, items: newInfographics }));

      return { previousStep };
    },
    onError: (err, itemId, context) => {
      if (context?.previousStep) {
        queryClient.setQueryData(queryKeyArr, context.previousStep);
      }
      let description = `Failed to delete  item ${itemId}`;
      if (err instanceof AxiosError) {
        description = err.response?.data.error.message;
      }

      toast({ title: 'Failed to delete item', description, variant: 'destructive' });
    },
  });

  const { mutate: deleteInfographic } = useMutation({
    mutationFn: (infographicId: number) => InfographicsService.deleteOne(infographicId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeyArr }),
    onMutate: async (infographicId: number) => {
      await queryClient.cancelQueries({ queryKey: queryKeyArr });

      const previousStep = queryClient.getQueryData<CompleteStep>(queryKeyArr);

      if (!previousStep) throw new Error('delete infographic - step not found');

      const newItems = previousStep.infographics.filter((x) => x.id !== infographicId);

      queryClient.setQueryData(queryKeyArr, () => ({ ...previousStep, items: newItems }));

      return { previousStep };
    },
    onError: (err, infographicId, context) => {
      if (context?.previousStep) {
        queryClient.setQueryData(queryKeyArr, context.previousStep);
      }
      let description = `Failed to delete infographic ${infographicId}`;
      if (err instanceof AxiosError) {
        description = err.response?.data.error.message;
      }

      toast({ title: 'Failed to delete infographic', description, variant: 'destructive' });
    },
  });

  return {
    step,
    isLoading,
    error,
    addCard,
    editCard,
    deleteCard,
    addAttributeToSmartList,
    updateAttribute,
    deleteAttribute,
    addItem,
    updateItem,
    deleteItem,
    addInfographic,
    editInfographic,
    deleteInfographic,
  };
}
