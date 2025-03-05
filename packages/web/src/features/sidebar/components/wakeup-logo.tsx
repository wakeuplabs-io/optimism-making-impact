import WakeUpLogoImg from '@/assets/wake-up-logo.png';
import { WAKEUP_URL } from '@/config';

export function WakeUpLogo() {
  return (
    <a
      href={WAKEUP_URL}
      target='_blank'
      rel='noreferrer'
      className='w-full flex items-center justify-center bg-mi-stone-300 p-2 rounded-xl'
    >
      <img src={WakeUpLogoImg} alt={'WakeUp Logo'} className='w-[124px] transition-all duration-300 hover:brightness-75' />
    </a>
  );
}
