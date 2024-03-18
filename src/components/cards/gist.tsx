'use client';
import { Avatar, DeleteIcon, EditIcon, Like, Replies } from '../ui/icons';
import { GistProps } from '../../types';
import Button from '../ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const Gist: React.FC<GistProps> = ({
  content,
  currentUser,
  id,
  username,
  createdAt,
  replies,
  isAuthenticated,
}) => {
  const router = useRouter();

  const viewReplies = () => {
    if (!isAuthenticated) {
      toast.error('Please sign up to join the gist', {
        position: 'top-right',
      });
    } else {
      router.push(`/${id}`);
    }
  };

  const likeGist = () => {
    if (!isAuthenticated) {
      toast.error('Please sign up to like this gist', {
        position: 'top-right',
      });
    } else {
      toast.success('Liked gist', {
        position: 'top-right',
      });
    }
  };

  return (
    <li className='com gap-5 grid' id={username}>
      <div className='gist grid gap-y-3 md:gap-x-7 bg-LightCardBg dark:bg-DarkCardBg p-6 rounded-lg shadow-sm dark:shadow-md transition duration-300'>
        <div className='user grid xsm:flex items-center xsm:gap-3 gap-2'>
          {' '}
          <div className=' fill-ModerateBlue dark:fill-SoftBlue hover:fill-LightBlue dark:hover:fill-Blueish'>
            <Avatar aria-hidden='true' />
          </div>
          <p className='text-DarkBlue dark:text-Username font-bold'>
            {username}
          </p>
          {currentUser && (
            <span className='bg-ModerateBlue dark:bg-SoftBlue rounded-sm px-1 text-white text-sm text-center'>
              you
            </span>
          )}
          <span className='dark:text-DarkTxt'>
            {/* {new Date(createdAt).toDateString()} */}
            {createdAt}
          </span>
        </div>
        <p className={`text dark:text-DarkTxt ${currentUser && 'animate-up'}`}>
          {content}
        </p>
        {!currentUser ? (
          <div className='reply flex gap-4'>
            <Button
              className='repl flex gap-2 items-center justify-self-end text-ModerateBlue dark:text-SoftBlue fill-ModerateBlue dark:fill-SoftBlue hover:text-LightBlue dark:hover:text-Blueish hover:fill-LightBlue dark:hover:fill-Blueish font-bold'
              onClick={viewReplies}
            >
              <Replies aria-hidden='true' />
              <span>{replies.length}</span>
            </Button>

            <Button
              className='repl flex gap-2 items-center justify-self-end text-ModerateBlue dark:text-SoftBlue fill-ModerateBlue dark:fill-SoftBlue hover:text-LightBlue dark:hover:text-Blueish hover:fill-LightBlue dark:hover:fill-Blueish font-bold'
              onClick={likeGist}
            >
              <Like aria-hidden='true' />
              <span>{replies.length * 2}</span>
            </Button>
          </div>
        ) : (
          <div className='del flex justify-self-end gap-2'>
            <Button className='reply flex gap-2 items-center justify-self-end text-SoftRed fill-SoftRed hover:text-PaleRed dark:hover:text-DarkRed hover:fill-PaleRed dark:hover:fill-DarkRed font-bold'>
              <DeleteIcon aria-hidden='true' />
              <span>Delete</span>
            </Button>

            <Button className='reply flex gap-2 items-center justify-self-end text-ModerateBlue dark:text-SoftBlue fill-ModerateBlue dark:fill-SoftBlue hover:text-LightBlue dark:hover:text-Blueish hover:fill-LightBlue dark:hover:fill-Blueish font-bold'>
              <EditIcon aria-hidden='true' />
              <span>Edit</span>
            </Button>
          </div>
        )}
      </div>
    </li>
  );
};

export default Gist;
