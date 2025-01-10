import RetroList from '@/assets/retro-list.png';
import VoteHere from '@/assets/vote-here.png';
import { ImageButton } from '@/components/image-button';
import { useSidebarStore } from '@/state';

export default function LogosSection() {
  const selectedRound = useSidebarStore((state) => state.selectedRound);

  return (
    <div className='flex w-full flex-col gap-4'>
      <a href={selectedRound.link1} target='_blank' rel='noreferrer'>
        <ImageButton src={RetroList} />
      </a>
      <a href={selectedRound.link2} target='_blank' rel='noreferrer'>
        <ImageButton src={VoteHere} />
      </a>
    </div>
  );
}
