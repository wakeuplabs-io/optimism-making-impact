import { useSidebarStore } from '@/state';
import { cn } from '@/lib/utils';
import { IconWithDefault } from '@/components/icon-with-default';

interface RoundListProps {
  title: string;
  rounds: { id: number }[];
}

export function RoundList(props: RoundListProps) {
  const { selectedRound, setSelectedRound } = useSidebarStore((state) => state);

  return (
    <div className="flex flex-col gap-2 mb-6">
      <h2 className="text-sm font-medium text-gray-500">{props.title}</h2>
      <ul className="flex flex-col gap-2">
        {props.rounds.map((round) => (
          <li key={round.id}>
            <button
              className={cn(
                `group flex w-full items-center gap-2 rounded-[10px] px-4 py-2 text-secondary hover:bg-[#F1F4F9] hover:text-dark-high`,
                selectedRound?.id === round.id && 'text-dark-high bg-[#F1F4F9]'
              )}
              onClick={() => setSelectedRound(round.id)}
            >
              <div className='h-[22px] w-[22px]'>
                <IconWithDefault src="dot" />
              </div>
              <span className="truncate text-[16px] leading-5">{`Round ${round.id}`}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
