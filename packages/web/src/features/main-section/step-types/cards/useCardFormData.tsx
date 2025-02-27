import { useMemo } from 'react';
import { Keyword } from '@/types';
import { AttributeOption, attributesOptionsMapper } from '../utils';
import { Attribute } from '@optimism-making-impact/schemas';

export const nonAssignedOption = { value: 0, label: <span>Non assigned</span> };

interface UseCardFormDataProps {
  keywords: Keyword[];
  attributes?: Attribute[];
}

export type KeywordOption = {
  value: string;
  label: string;
};

export function useCardFormData({ keywords, attributes }: UseCardFormDataProps) {
  const keywordsOptions: KeywordOption[] = useMemo(
    () =>
      keywords.map((keyword) => ({
        value: keyword.value,
        label: keyword.value,
      })),
    [keywords],
  );

  const attributeOptions: AttributeOption[] = useMemo(() => {
    if (!attributes) return [];

    const options = attributesOptionsMapper(attributes);

    options.unshift({
      ...nonAssignedOption,
      value: nonAssignedOption.value.toString(),
    });

    return options;
  }, [attributes]);

  return {
    keywordsOptions,
    attributeOptions,
  };
}
