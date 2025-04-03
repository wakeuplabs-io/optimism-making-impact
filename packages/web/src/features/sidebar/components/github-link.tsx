import GithubLogoImg from '@/assets/github-logo.svg';
import { REPOSITORY_URL } from '@/config';

export function GithubLink() {
  return (
    <a
      href={REPOSITORY_URL}
      target='_blank'
      rel='noreferrer'
      className='w-[80px] flex flex-col items-center justify-center bg-mi-stone-300 p-2 rounded-xl'
    >
      <img src={GithubLogoImg} alt={'Github logo'} className='w-[28px] transition-all duration-300 hover:brightness-75' />
    </a>
  );
}
