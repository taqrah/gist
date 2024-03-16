import { DeleteIcon, EditIcon, Like } from './icons';
import { ReplyProps } from '../types';
import Image from 'next/image';
import Button from './button';
import { toast } from 'sonner';

const GistReply: React.FC<ReplyProps> = ({
  content,
  currentUser,
  username,
  createdAt,
  likes,
}) => {
  
  const likeReply = () => {
    toast.success('Liked reply', {
      position: 'top-right',
    });
  };

  return (
    <li className='com gap-5 grid' id={username}>
      <div className='gist grid gap-y-3 md:gap-x-7 bg-LightCardBg dark:bg-DarkCardBg p-6 rounded-lg shadow-sm dark:shadow-md transition duration-300'>
        <div className='user grid xsm:flex items-center xsm:gap-3 gap-2'>
          {' '}
          <Image src={''} alt='Avatar' className='rounded-full' />
          <p className='text-DarkBlue dark:text-Username font-bold'>
            {username}
          </p>
          {currentUser && (
            <span className='bg-ModerateBlue dark:bg-SoftBlue rounded-sm px-1 text-white text-sm text-center'>
              you
            </span>
          )}
          <span className='dark:text-DarkTxt'>{createdAt}</span>
        </div>
        <p className={`text dark:text-DarkTxt ${currentUser && 'animate-up'}`}>
          {content}
        </p>
        {!currentUser ? (
          <Button
            className='reply flex gap-2 items-center justify-self-end text-ModerateBlue dark:text-SoftBlue fill-ModerateBlue dark:fill-SoftBlue hover:text-LightBlue dark:hover:text-Blueish hover:fill-LightBlue dark:hover:fill-Blueish font-bold'
            onClick={likeReply}
          >
            <Like aria-hidden='true' />
            <span>{likes}</span>
          </Button>
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

export default GistReply;
