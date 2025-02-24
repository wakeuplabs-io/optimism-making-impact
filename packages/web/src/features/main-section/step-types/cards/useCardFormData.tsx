import { useMemo } from 'react';
import { Attribute, Keyword } from '@/types';
import { ColorDot } from '@/components/color-dot';

export const dontAssignOption = { value: 0, label: <span>Don't assign</span> };

interface UseCardFormDataProps {
  keywords: Keyword[];
  attributes?: Attribute[];
}

export function useCardFormData({ keywords, attributes }: UseCardFormDataProps) {
  const keywordsOptions = useMemo(
    () =>
      keywords.map((keyword) => ({
        value: keyword.value,
        label: keyword.value,
      })),
    [keywords],
  );

  const attributeOptions = useMemo(() => {
    if (!attributes) return [];

    const options = attributes.map((a) => ({
      value: a.id.toString(),
      label: (
        <div className='flex items-center gap-2'>
          <ColorDot color={a.color} />
          <span>{a.value}</span>
        </div>
      ),
    }));

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
