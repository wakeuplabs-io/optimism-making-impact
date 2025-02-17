import { useCallback, useEffect, useState } from 'react';
import { IndexRouteSearchParams, Route } from '@/routes';
import { useSidebarStore } from '@/state';
import { useStepsStore } from '@/state/steps/steps-store';
import { useRouter } from '@tanstack/react-router';

export const useRouterObserver = (): { initializeObserver: () => void } => {
  const search = Route.useSearch();
  const router = useRouter();
  const [searchParams, setSearchParams] = useState<IndexRouteSearchParams>({});

  //Subscribe to changes in the state to update the URL
  useEffect(() => {
    const unsubscribeSideBar = useSidebarStore.subscribe((state, prevState) => {
      if (state.selectedRound !== prevState.selectedRound) {
        setSearchParams((prev) => ({ ...prev, roundId: state.selectedRound?.id }));
      }

      if (state.selectedCategoryId !== prevState.selectedCategoryId) {
        setSearchParams((prev) => ({ ...prev, categoryId: state.selectedCategoryId }));
      }
    });

    const unsubscribeStepper = useStepsStore.subscribe((state, prevState) => {
      if (state.selectedStep !== prevState.selectedStep) {
        setSearchParams((prev) => ({ ...prev, stepId: state.selectedStep?.id }));
      }
    });

    return () => {
      unsubscribeSideBar();
      unsubscribeStepper();
    };
  }, []);

  useEffect(() => {
    router.navigate({ search: () => searchParams, reloadDocument: false, to: '/' });
  }, [searchParams, router]);

  const initializeObserver = useCallback(() => {
    const { roundId, categoryId, stepId } = search;
    const rounds = useSidebarStore.getState().rounds;

    const searchRound = rounds.find((round) => round.id === roundId);

    //if no searchRound, return the last round or the first round from the list
    if (!searchRound) {
      useSidebarStore.setState(() => ({ selectedRound: rounds[0], selectedCategoryId: rounds[0].categories[0].id }));
      return;
    }

    const searchCategoryExists = searchRound.categories.find((category) => category.id === categoryId);

    //if no searchCategory, return the first category from the list
    if (!searchCategoryExists) {
      useSidebarStore.setState(() => ({ selectedRound: searchRound, selectedCategoryId: searchRound.categories[0].id }));
      return;
    }

    //set the selected step id
    if (stepId) useStepsStore.setState(() => ({ searchSelectedStepId: stepId }));

    //finally if both searchRound and searchCategory exists, set the state
    useSidebarStore.setState(() => ({ selectedRound: searchRound, selectedCategoryId: categoryId }));
  }, [search]);

  return { initializeObserver };
};
