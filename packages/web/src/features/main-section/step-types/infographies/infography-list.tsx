import { InfographicCard } from '@/features/main-section/step-types/infographies/infography-card';
import { useUserStore } from '@/state';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { Infographic } from '@/types';

interface InfographicListProps {
  infographics: Infographic[];
  isAdmin?: boolean;
  onDelete?: (infographicId: number) => void;
  onChangeText?: (infographicId: number, markdown: string) => void;
  onChangeImage?: (infographicId: number, image: string) => void;
}

export function InfographicList(props: InfographicListProps) {
  const { deleteInfographic, editInfographic } = useMainSectionStore((state) => state);
  const isAdmin = useUserStore((state) => state.isAdminModeEnabled);

  if (props.infographics.length < 1) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <span>There are no infographics yet.</span>
      </div>
    );
  }

  return (
    <>
      {props.infographics.map((infographic, order) => {
        return (
          <InfographicCard
            infographic={infographic}
            order={order}
            key={`${infographic.id}-${order}`}
            isAdmin={isAdmin}
            onDelete={deleteInfographic}
            onChangeText={(infographicId, markdown) => editInfographic(infographicId, { markdown })}
            onChangeImage={(infographicId, image) => editInfographic(infographicId, { image })}
          />
        );
      })}
    </>
  );
}
