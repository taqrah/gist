import Gist from '@/components/gist';
import Gists from '@/components/gists';

export default function Home() {
  return (
    <>
      <h1 className='sr-only'>
        Welcome to gists, start a conversation or join one.
      </h1>
      <ul className='flex flex-col gap-10'>
        <Gists />
      </ul>
    </>
  );
}
