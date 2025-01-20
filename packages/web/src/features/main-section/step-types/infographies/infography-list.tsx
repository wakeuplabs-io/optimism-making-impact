import { InfographyCard } from '@/features/main-section/step-types/infographies/infography-card';
import { useUserStore } from '@/state';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { Infography } from '@/types';

interface InfographyListProps {
  infographies: Infography[];
  isAdmin?: boolean;
  onDelete?: (infographyId: number) => void;
  onChangeText?: (infographyId: number, markdown: string) => void;
  onChangeImage?: (infographyId: number, image: string) => void;
}

export function InfographyList(props: InfographyListProps) {
  const { deleteInfogrpahy, editInfogrpahy } = useMainSectionStore((state) => state);
  const isAdmin = useUserStore((state) => state.isAdmin);

  if (props.infographies.length < 1) {
    return (
      <div className='flex items-center justify-center w-full h-full'>
        <span>There are no infographies yet.</span>
      </div>
    );
  }

  return (
    <>
      {props.infographies.map((infography, order) => {
        return (
          <InfographyCard
            infography={infography}
            order={order}
            key={`${infography.id}-${order}`}
            isAdmin={isAdmin}
            onDelete={deleteInfogrpahy}
            onChangeText={(infographyId, markdown) => editInfogrpahy(infographyId, { markdown })}
            onChangeImage={(infographyId, image) => editInfogrpahy(infographyId, { image })}
          />
        );
      })}
    </>
  );
}
