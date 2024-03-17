'use client';
import { useRef } from 'react';
import Button from './button';

const PopUp = () => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const cancel = () => {
    modalRef.current?.close();
    // log the user out if they refuse
  };

  const proceed = () => {
    // send otp
    modalRef.current?.close();
  };

  return (
    <dialog
      open
      className='scale-0 m-auto bg-transparent backdrop:bg-black/50 backdrop-blur-xl grid place-content-center p-0'
      ref={modalRef}
      onClose={cancel}
    >
      <div className='max-w-screen-xsm bg-white dark:bg-DarkCardBg p-5 shadow-md rounded-lg'>
        <h2 className='text-DarkBlue text-xl font-bold dark:text-Username'>
          Verification.
        </h2>
        <p className='text-GrayBlue dark:text-DarkTxt my-5'>
          We would like to send you an OTP to your twitter DM to confirm its really
          you. Do you want to proceed?
        </p>
        <div className='flex gap-4 uppercase text-white text-sm'>
          <Button
            className='w-full bg-ModerateBlue dark:bg-SoftBlue hover:bg-LightBlue dark:hover:bg-Blueish px-3 py-3 rounded-md uppercase transition'
            onClick={proceed}
          >
            yes, proceed
          </Button>
        </div>
      </div>
    </dialog>
  );
};

export default PopUp;
