import { useMemo } from 'react';
import { Attribute, Keyword } from '@/types';
import { AttributeOption, attributesOptionsMapper } from '../utils';

export const dontAssignOption = { value: 0, label: <span>Don't assign</span> };

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
      ...dontAssignOption,
      value: dontAssignOption.value.toString(),
    });

    return options;
  }, [attributes]);

  return {
    keywordsOptions,
    attributeOptions,
  };
}
