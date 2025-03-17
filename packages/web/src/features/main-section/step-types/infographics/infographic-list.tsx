import { InfographicCard } from './infographic-card';
import { useUser } from '@/hooks/use-user';
import { Infographic } from '@optimism-making-impact/schemas';

interface InfographicListProps {
  infographics: Infographic[];
}

export function InfographicList(props: InfographicListProps) {
  const { isAdminModeEnabled: isAdmin } = useUser();

  if (props.infographics.length < 1) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
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
