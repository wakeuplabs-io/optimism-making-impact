import { AttributeOption, attributesOptionsMapper } from '../utils';
import { Attribute } from '@optimism-making-impact/schemas';
import { useMemo } from 'react';

export const nonAssignedOption = { value: 0, label: <span>Non assigned</span> };

interface UseCardFormDataProps {
  attributes?: Attribute[];
}

export function useCardFormData({ attributes }: UseCardFormDataProps) {
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
    attributeOptions,
  };
}
