import { IndexRouteSearchParams } from '@/routes';
import { useSidebarStore } from '@/state';
import { useStepsStore } from '@/state/steps/steps-store';
import { useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const useRouterObserver = () => {
  const [search, setSearch] = useState<IndexRouteSearchParams>({});
  const router = useRouter();

  //Subscribe to changes in the state to update the URL
  useEffect(() => {
    const unsubscribeSideBar = useSidebarStore.subscribe((state, prevState) => {
      if (state.selectedRound !== prevState.selectedRound) {
        setSearch((prev) => ({ ...prev, roundId: state.selectedRound?.id }));
      }

      if (state.selectedCategoryId !== prevState.selectedCategoryId) {
        setSearch((prev) => ({ ...prev, categoryId: state.selectedCategoryId }));
      }
    });

    const unsubscribeStepper = useStepsStore.subscribe((state, prevState) => {
      if (state.selectedStep !== prevState.selectedStep) {
        setSearch((prev) => ({ ...prev, stepId: state.selectedStep?.id }));
      }
    });

    return () => {
      unsubscribeSideBar();
      unsubscribeStepper();
    };
  }, []);

  useEffect(() => {
    router.navigate({ search: () => search, reloadDocument: false, to: '/' });
  }, [search, router]);
};
