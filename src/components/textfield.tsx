'use client';
import { useState } from 'react';
import Button from './button';
import { Avatar } from './icons';

const TextField = () => {
  const [reply, setReply] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='textfield sticky bottom-7 md:bottom-10 grid gap-3 max-md:gap-x-0 dark:text-DarkTxt bg-white dark:bg-DarkCardBg p-5 rounded-lg shadow-sm transition animate-down'
    >
      <label htmlFor='comment' className='sr-only'>
        Add a reply
      </label>
      <textarea
        id='comment'
        placeholder='Join the conversation...'
        className='input resize-none w-full border dark:outline-none dark:border-transparent focus:outline-ModerateBlue dark:focus:outline-SoftBlue dark:bg-TextArea dark:text-PaleBlue caret-ModerateBlue rounded-md p-2 '
        rows={3}
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      />
      <div className=' fill-ModerateBlue dark:fill-SoftBlue hover:fill-LightBlue dark:hover:fill-Blueish'>
        <Avatar aria-hidden='true'/>
      </div>
      <Button className='submit text-sm h-fit px-7 py-3 justify-self-end bg-ModerateBlue dark:hover:bg-Blueish dark:bg-SoftBlue hover:bg-LightBlue text-white font-medium uppercase'>
        reply
      </Button>
    </form>
  );
};

export default TextField;
