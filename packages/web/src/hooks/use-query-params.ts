import { router } from '@/router';
import { useSearch } from '@tanstack/react-router';

type QueryParamKey = 'roundId' | 'stepId' | 'categoryId';
type QueryParamValue = number | undefined;

interface QueryParams {
  selectedRoundId: QueryParamValue;
  selectedCategoryId: QueryParamValue;
  selectedStepId: QueryParamValue;
  setSelectedRoundId: (id: QueryParamValue) => void;
  setSelectedCategoryId: (id: QueryParamValue) => void;
  setSelectedStepId: (id: QueryParamValue) => void;
}

export function useQueryParams(): QueryParams {
  const { stepId, roundId, categoryId } = useSearch({ from: '/' });

  return {
    selectedStepId: stepId,
    selectedRoundId: roundId,
    selectedCategoryId: categoryId,
    setSelectedStepId: setQueryParam.bind(null, 'stepId'),
    setSelectedRoundId: setQueryParam.bind(null, 'roundId'),
    setSelectedCategoryId: setQueryParam.bind(null, 'categoryId'),
  };
}

function setQueryParam(key: QueryParamKey, id: QueryParamValue) {
  router.navigate({
    search: (prev) => ({ ...prev, [key]: id }),
    reloadDocument: false,
    to: '/',
  });
}
