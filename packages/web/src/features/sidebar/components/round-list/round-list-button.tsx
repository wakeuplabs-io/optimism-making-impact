import { SidebarListButton } from '../sidebar-list-button';
import { getRoundName } from '@/lib/utils';
import { CompleteRound } from '@/types/rounds';
import { Circle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useMemo, useRef, useState } from 'react';

interface RoundListButtonProps {
  round: CompleteRound;
  isSelected: boolean;
  onSelect: (round: CompleteRound) => void;
}

export function RoundListButton({ round, isSelected, onSelect }: RoundListButtonProps) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const holdTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart = () => {
    holdTimeout.current = setTimeout(() => {
      setTooltipOpen(true);
    }, 500);
  };

  const handleTouchEnd = () => {
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current);
      holdTimeout.current = null;
    }
    setTooltipOpen(false);
  };

  const roundName = useMemo(() => { return getRoundName(round.id) }, [round])
  const isRoundNameLong = useMemo(() => { return roundName.length > 23 }, [roundName])

  return (
    <SidebarListButton isSelected={isSelected} isLoading={round.status === 'PENDING'} onClick={() => onSelect(round)}>
      <div className='flex gap-4 w-full'>
        <div className='flex h-[20px] w-[20px] items-center justify-center'>
          <Circle className='h-[7px] w-[7px]' strokeWidth={6} />
        </div>
        {isRoundNameLong &&
          <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
            <TooltipTrigger asChild>
              <span
                className="text-sm truncate w-full text-start"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {roundName}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <span className='text-sm'>{roundName}</span>
            </TooltipContent>
          </Tooltip>
        }
        {!isRoundNameLong &&
          <span className='text-sm truncate w-full text-start'>{roundName}</span>
        }

      </div>
    </SidebarListButton>
  );
}
