'use client';
import { useState } from 'react';
import { DeleteIcon, EditIcon, Like, Replies } from './icons';
import { GistProps } from '../types';
import Image from 'next/image';
import Button from './button';
import { toast } from 'sonner';

const Gist: React.FC<GistProps> = ({
  content,
  currentUser,
  id,
  username,
  createdAt,
  replies,
}) => {
  const [isEditing, setIsediting] = useState(false);
  const [user, setUser] = useState(false);
  const [updatedText, setUpdatedText] = useState<string>(content);

  const viewReplies = () => {
    if (!user) {
      toast.error('Please sign up to join the gist', {
        position: 'top-right',
      });
      return;
    }
  };
  const likeGist = () => {
    if (!user) {
      toast.error('Please sign up to like this gist', {
        position: 'top-right',
      });
      return;
    }
  };

  const update = (event: React.FormEvent) => {
    event.preventDefault();

    setIsediting(!isEditing);
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
        {!isEditing ? (
          <p
            className={`text dark:text-DarkTxt ${currentUser && 'animate-up'}`}
          >
            {content}
          </p>
        ) : (
          <form
            className='edit_field animate-up flex flex-col gap-3'
            onSubmit={update}
          >
            <label htmlFor='update' className='sr-only'>
              Edit your gist
            </label>
            <textarea
              id='update'
              rows={3}
              value={updatedText}
              className='resize-none w-full border cursor-pointer dark:bg-TextArea dark:border-transparent dark:focus:outline dark:focus:outline-SoftBlue dark:text-PaleBlue caret-ModerateBlue dark:caret-SoftBlue rounded-md p-2 focus:outline-ModerateBlue'
              onChange={(e) => setUpdatedText(e.target.value)}
            ></textarea>
            <Button className='w-auto max-sm:w-full sm:self-end bg-ModerateBlue dark:hover:bg-Blueish hover:bg-LightBlue dark:bg-SoftBlue text-white text-sm uppercase font-medium px-4 py-2.5 rounded-md'>
              Update
            </Button>
          </form>
        )}

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
            <Button
              className='reply flex gap-2 items-center justify-self-end text-ModerateBlue dark:text-SoftBlue fill-ModerateBlue dark:fill-SoftBlue hover:text-LightBlue dark:hover:text-Blueish hover:fill-LightBlue dark:hover:fill-Blueish font-bold'
              onClick={() => setIsediting((prev) => !prev)}
            >
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