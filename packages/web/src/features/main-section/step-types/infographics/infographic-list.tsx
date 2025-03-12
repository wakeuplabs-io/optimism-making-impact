import { InfographicCard } from './infographic-card';
import { useUserStore } from '@/state';
import { Infographic } from '@optimism-making-impact/schemas';

interface InfographicListProps {
  infographics: Infographic[];
}

export function InfographicList(props: InfographicListProps) {
  const isAdmin = useUserStore((state) => state.isAdminModeEnabled);

  if (props.infographics.length < 1) {
    return (
      <div className='flex items-center justify-center w-full h-full'>
        <span>There are no infographics yet.</span>
      </div>
    );
  }

  return (
    <div className='flex w-full flex-col gap-y-16'>
      {props.infographics.map((infographic, order) => {
        return <InfographicCard infographic={infographic} order={order} key={`${infographic.id}-${order}`} isAdmin={isAdmin} />;
      })}
    </div>
  );
}
