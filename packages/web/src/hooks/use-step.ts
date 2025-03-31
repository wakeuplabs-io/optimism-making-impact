import { toast } from './use-toast';
import { BADGE_COLORS } from '@/config';
import { useQueryParams } from '@/hooks/use-query-params';
import { queryClient } from '@/main';
import { AttributesService } from '@/services/attributes-service';
import { CardsService } from '@/services/cards-service';
import { InfographicsService } from '@/services/infographics-service';
import { ItemsService } from '@/services/items-service';
import { StepsService } from '@/services/steps-service';
import { CompleteCard } from '@/types/cards';
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
import { AxiosError } from 'axios';

export function useStep() {
  const { selectedStepId } = useQueryParams();

  const {
    data: step,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['step', selectedStepId],
    queryFn: async () => {
      const step = await StepsService.getOne(selectedStepId!);

      const cardColorMap = Object.fromEntries(
        step.keywords.map((keyword, index) => [keyword.value, BADGE_COLORS[index % BADGE_COLORS.length]]),
      );

      const keywordsWithColors = step.keywords.map((x) => ({ ...x, color: cardColorMap[x.value] }));
      const cardWithColors = step.cards.map((x) => ({ ...x, keywords: x.keywords.map((y) => ({ ...y, color: cardColorMap[y.value] })) }));

      return { ...step, keywords: keywordsWithColors, cards: cardWithColors };
    },
    enabled: !!selectedStepId,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const { mutate: addCard } = useMutation({
    mutationFn: (data: CreateCardBody) => CardsService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['step', selectedStepId] }),
    onMutate: async (data: CreateCardBody) => {
      await queryClient.cancelQueries({ queryKey: ['step', selectedStepId] });

      const previousStep = queryClient.getQueryData<CompleteStep>(['step', selectedStepId]);

      if (!previousStep) throw new Error('add card - step not found');

      const newCard: CompleteCard = {
        ...data,
        id: 0,
        keywords: data.keywords.map((x, idx) => ({ id: idx, ...x, color: BADGE_COLORS[idx % BADGE_COLORS.length] })),
        attribute: previousStep.smartListFilter?.attributes.find((x) => x.id === data.attributeId),
      };

      queryClient.setQueryData(['step', selectedStepId], () => ({ ...previousStep, cards: [...previousStep.cards, newCard] }));

      return { previousStep };
    },
    onError: (err, data, context) => {
      if (context?.previousStep) {
        queryClient.setQueryData(['step', selectedStepId], context.previousStep);
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['step', selectedStepId] }),
    onMutate: async (props: { cardId: number; data: UpdateCardBody }) => {
      await queryClient.cancelQueries({ queryKey: ['step', selectedStepId] });

      const previousStep = queryClient.getQueryData<CompleteStep>(['step', selectedStepId]);

      if (!previousStep) throw new Error('delete card - step not found');

      const updatedCard = {
        ...props.data,
        id: props.cardId,
        attribute: previousStep.smartListFilter?.attributes.find((x) => x.id === props.data.attributeId),
      };

      const updatedCards = previousStep.cards.map((x) => (x.id === props.cardId ? updatedCard : x));

      queryClient.setQueryData(['step', selectedStepId], () => ({ ...previousStep, cards: updatedCards }));

      return { previousStep };
    },
    onError: (err, props, context) => {
      if (context?.previousStep) {
        queryClient.setQueryData(['step', selectedStepId], context.previousStep);
      }
      let description = `Failed to edit card ${props.data.title}`;
      if (err instanceof AxiosError) {
        description = err.response?.data.error.message;
      }

      toast({ title: 'Failed to edit card', description, variant: 'destructive' });
    },
  });

  const { mutate: deleteCard } = useMutation({
    mutationFn: (cardId: number) => CardsService.deleteOne(cardId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['step', selectedStepId] }),
    onMutate: async (cardId: number) => {
      await queryClient.cancelQueries({ queryKey: ['step', selectedStepId] });

      const previousStep = queryClient.getQueryData<CompleteStep>(['step', selectedStepId]);

      if (!previousStep) throw new Error('delete card - step not found');

      const newCards = previousStep.cards.filter((x) => x.id !== cardId);

      const updatedStep = { ...previousStep, cards: newCards };

      queryClient.setQueryData<CompleteStep>(['step', selectedStepId], updatedStep);

      return { previousStep };
    },
    onError: (err, cardId, context) => {
      if (context?.previousStep) {
        queryClient.setQueryData(['step', selectedStepId], context.previousStep);
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['step', selectedStepId] }),
    onMutate: async (data: CreateAttributeBody) => {
      await queryClient.cancelQueries({ queryKey: ['step', selectedStepId] });

      const previousStep = queryClient.getQueryData<CompleteStep>(['step', selectedStepId]);

      if (!previousStep) throw new Error('add attribute to smart list - step not found');

      const updatedSmartListFilter = {
        ...previousStep.smartListFilter,
        attributes: [...(previousStep.smartListFilter?.attributes ?? []), { id: 0, categoryId: previousStep?.categoryId, ...data }],
      };

      queryClient.setQueryData(['step', selectedStepId], () => ({ ...previousStep, smartListFilter: updatedSmartListFilter }));

      return { previousStep };
    },
    onError: (err, data, context) => {
      if (context?.previousStep) {
        queryClient.setQueryData(['step', selectedStepId], context.previousStep);
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['step', selectedStepId] }),
    onMutate: async (data: UpdateAttributeBody) => {
      await queryClient.cancelQueries({ queryKey: ['step', selectedStepId] });

      const previousStep = queryClient.getQueryData<CompleteStep>(['step', selectedStepId]);

      if (!previousStep) throw new Error('edit attribute - step not found');

      const updatedSmartListFilter = {
        attributes: previousStep.smartListFilter?.attributes.map((x) => (x.id === data.id ? { ...x, ...data } : x)),
      };

      queryClient.setQueryData(['step', selectedStepId], () => ({ ...previousStep, smartListFilter: updatedSmartListFilter }));

      return { previousStep };
    },
    onError: (err, data, context) => {
      if (context?.previousStep) {
        queryClient.setQueryData(['step', selectedStepId], context.previousStep);
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['step', selectedStepId] }),
    onMutate: async (attributeId: number) => {
      await queryClient.cancelQueries({ queryKey: ['step', selectedStepId] });

      const previousStep = queryClient.getQueryData<CompleteStep>(['step', selectedStepId]);

      if (!previousStep || !previousStep.smartListFilter) throw new Error('delete attribute - step not found');

      const newAttributes = previousStep.smartListFilter?.attributes.filter((x) => x.id !== attributeId);

      const updatedStep = { ...previousStep, smartListFilter: { ...previousStep.smartListFilter, attributes: newAttributes } };

      queryClient.setQueryData<CompleteStep>(['step', selectedStepId], updatedStep);

      return { previousStep };
    },
    onError: (err, attributeId, context) => {
      if (context?.previousStep) {
        queryClient.setQueryData(['step', selectedStepId], context.previousStep);
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['step', selectedStepId] }),
    onMutate: async (data: CreateItemBody) => {
      await queryClient.cancelQueries({ queryKey: ['step', selectedStepId] });

      const previousStep = queryClient.getQueryData<CompleteStep>(['step', selectedStepId]);

      if (!previousStep) throw new Error('add item - step not found');

      const newItemAttribute = previousStep.smartListFilter?.attributes.find((x) => x.id === data.attributeId);

      const newItem = { ...data, attribute: newItemAttribute };

      queryClient.setQueryData(['step', selectedStepId], () => ({ ...previousStep, items: [...previousStep.items, newItem] }));

      return { previousStep };
    },
    onError: (err, data, context) => {
      if (context?.previousStep) {
        queryClient.setQueryData(['step', selectedStepId], context.previousStep);
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['step', selectedStepId] }),
    onMutate: async ({ itemId, data }: { itemId: number; data: UpdateItemBody }) => {
      await queryClient.cancelQueries({ queryKey: ['step', selectedStepId] });

      const previousStep = queryClient.getQueryData<CompleteStep>(['step', selectedStepId]);

      if (!previousStep) throw new Error('update item - step not found');

      const oldItem = previousStep.items.find((x) => x.id === itemId);

      const updatedItemAttribute =
        data.attributeId !== oldItem?.attributeId
          ? previousStep.smartListFilter?.attributes.find((x) => x.id === data.attributeId)
          : oldItem?.attribute;

      const updatedItem = { ...oldItem, ...data, attribute: updatedItemAttribute };

      const updatedItems = previousStep.items.map((x) => (x.id === itemId ? updatedItem : x));

      queryClient.setQueryData(['step', selectedStepId], () => ({ ...previousStep, items: updatedItems }));

      return { previousStep };
    },
    onError: (err, itemId, context) => {
      if (context?.previousStep) {
        queryClient.setQueryData(['step', selectedStepId], context.previousStep);
      }
      let description = `Failed to update item ${itemId}`;
      if (err instanceof AxiosError) {
        description = err.response?.data.error.message;
      }

      toast({ title: 'Failed to update item', description, variant: 'destructive' });
    },
  });

  const { mutate: deleteItem } = useMutation({
    mutationFn: (itemId: number) => ItemsService.deleteOne(itemId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['step', selectedStepId] }),
    onMutate: async (itemId: number) => {
      await queryClient.cancelQueries({ queryKey: ['step', selectedStepId] });

      const previousStep = queryClient.getQueryData<CompleteStep>(['step', selectedStepId]);

      if (!previousStep) throw new Error('delete item - step not found');

      const newItems = previousStep.items.filter((x) => x.id !== itemId);

      queryClient.setQueryData(['step', selectedStepId], () => ({ ...previousStep, items: newItems }));

      return { previousStep };
    },
    onError: (err, itemId, context) => {
      if (context?.previousStep) {
        queryClient.setQueryData(['step', selectedStepId], context.previousStep);
      }
      let description = `Failed to delete item ${itemId}`;
      if (err instanceof AxiosError) {
        description = err.response?.data.error.message;
      }

      toast({ title: 'Failed to delete item', description, variant: 'destructive' });
    },
  });

  const { mutate: addInfographic } = useMutation({
    mutationFn: (data: CreateInfographicBody) => InfographicsService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['step', selectedStepId] }),
    onMutate: async (data: CreateInfographicBody) => {
      await queryClient.cancelQueries({ queryKey: ['step', selectedStepId] });

      const previousStep = queryClient.getQueryData<CompleteStep>(['step', selectedStepId]);

      if (!previousStep) throw new Error('add infographic - step not found');

      queryClient.setQueryData(['step', selectedStepId], () => ({ ...previousStep, infographics: [...previousStep.infographics, data] }));

      return { previousStep };
    },
    onError: (err, data, context) => {
      if (context?.previousStep) {
        queryClient.setQueryData(['step', selectedStepId], context.previousStep);
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['step', selectedStepId] }),
    onMutate: async (props: { infographicId: number; data: UpdateInfographicBody }) => {
      await queryClient.cancelQueries({ queryKey: ['step', selectedStepId] });

      const previousStep = queryClient.getQueryData<CompleteStep>(['step', selectedStepId]);

      if (!previousStep) throw new Error('edit infographic - step not found');

      const oldInfographic = previousStep.infographics.find((x) => x.id === props.infographicId);
      const newInfographic = { ...oldInfographic, ...props.data };
      const newInfographics = previousStep.infographics.map((x) => (x.id === props.infographicId ? newInfographic : x));

      queryClient.setQueryData(['step', selectedStepId], () => ({ ...previousStep, infographics: newInfographics }));

      return { previousStep };
    },
    onError: (err, { infographicId }, context) => {
      if (context?.previousStep) {
        queryClient.setQueryData(['step', selectedStepId], context.previousStep);
      }
      let description = `Failed to edit infographic ${infographicId}`;
      if (err instanceof AxiosError) {
        description = err.response?.data.error.message;
      }

      toast({ title: 'Failed to edit infographic', description, variant: 'destructive' });
    },
  });

  const { mutate: deleteInfographic } = useMutation({
    mutationFn: (infographicId: number) => InfographicsService.deleteOne(infographicId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['step', selectedStepId] }),
    onMutate: async (infographicId: number) => {
      await queryClient.cancelQueries({ queryKey: ['step', selectedStepId] });

      const previousStep = queryClient.getQueryData<CompleteStep>(['step', selectedStepId]);

      if (!previousStep) throw new Error('delete infographic - step not found');

      const newInfographics = previousStep.infographics.filter((x) => x.id !== infographicId);

      queryClient.setQueryData(['step', selectedStepId], () => ({ ...previousStep, infographics: newInfographics }));

      return { previousStep };
    },
    onError: (err, infographicId, context) => {
      if (context?.previousStep) {
        queryClient.setQueryData(['step', selectedStepId], context.previousStep);
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
