'use client';

const Consent = ({ proceed }: { proceed: () => void }) => {
  return (
    <div className='animate-down'>
      <div className='max-w-screen-xsm bg-white dark:bg-DarkCardBg p-5 shadow-md rounded-lg'>
        <h2 className='text-DarkBlue text-xl font-bold dark:text-Username'>
          Verification.
        </h2>
        <p className='text-GrayBlue dark:text-DarkTxt my-5'>
          We would like to send you an OTP to you on twitter to confirm its
          really you. Do you want to proceed?
        </p>
        <p className='text-GrayBlue dark:text-DarkTxt mb-4 font-bold'>
          Make sure you enable direct messages.
        </p>
        <div className='flex gap-4 uppercase text-white text-sm'>
          <button
            type='button'
            className='w-full bg-ModerateBlue dark:bg-SoftBlue hover:hover:bg-Blueish px-3 py-3 rounded-md uppercase p-1 outline-inherit transition duration-300'
            onClick={proceed}
          >
            yes, proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Consent;
