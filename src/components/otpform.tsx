'use client';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function OtpForm() {
  const emptyOtp = new Array(4).fill('');
  const [otp, setOtp] = useState<string[]>(emptyOtp);
  const [previousOTP, setPreviousOtp] = useState<string | null>('2222');
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const router = useRouter();

  const generate = () => {
    // generate new otp
    const otp = Array.from({ length: 4 }, () => Math.floor(Math.random() * 9));
    // store generated otp for future comparison
    setPreviousOtp(otp.join(''));
  };

  const verify = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    // compare values
    if (previousOTP === otp.join('')) {
      // show user success message
      toast.success('OTP verified successfully!', {
        position: 'top-left',
      });
      // redirect user to dashboard
      router.push('/dashboard');
    } else {
      // show user error message
      toast.error('Invalid OTP!', {
        position: 'top-left',
      });
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    // extract current value from input
    const { value } = event.target;
    // create a new otp array
    const newOtp = [...otp];
    // check if value is not a number or length is greater than 1
    if (isNaN(Number(value)) || value.length > 1) return;
    // update the new otp array with the new value at the current index
    newOtp[index] = value;
    // check if value is not empty and index is less than 4
    if (value && index < 3) {
      // Move focus to next input field
      inputRefs.current[index + 1]?.focus();
    }

    // update the state with the new otp array
    setOtp(newOtp);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // extract key from event
    const { key } = event;
    // check if key pressed is backspace and index is greater than 0 and current otp value is empty
    if (key === 'Backspace' && index > 0 && !otp[index]) {
      // Move focus to previous input field on backspace press
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    const expiry = 90000;

    const interval = setInterval(() => {
      if (otp.join('') !== '') {
        setOtp(emptyOtp);
        setPreviousOtp(null);
      }
    }, expiry);

    return () => clearInterval(interval);
  }, [otp]);

  return (
    <form onSubmit={verify} className='animate-up flex flex-col gap-8'>
      <small className='dark:text-DarkTxt'>default otp is 2222</small>
      <div className='flex gap-4'>
        {otp.map((num, index) => (
          <div key={index}>
            <input
              ref={(element) => (inputRefs.current[index] = element)}
              id={`otp-${index}`}
              type='number'
              value={num}
              autoFocus={index === 0}
              placeholder='-'
              onChange={(event) => handleChange(event, index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className='hide-spin-button rounded-md w-12 h-12 dark:text-DarkTxt text-center font-bold text-xl border dark:outline-none dark:border-transparent focus:placeholder:text-transparent focus:outline-ModerateBlue dark:focus:outline-SoftBlue dark:bg-TextArea dark:text-PaleBlue caret-ModerateBlue'
            />
            <label htmlFor={`otp-${index}`} className='sr-only'>
              Enter OTP
            </label>
          </div>
        ))}
      </div>
      <div className='flex gap-2 justify-center'>
        <button
          type='submit'
          className='text-white dark:text-DarkTxt bg-ModerateBlue hover:bg-Blueish flex items-center gap-4 px-3 py-2 rounded-md shadow-sm hover:shadow-md w-fit'
        >
          Confirm
        </button>
        <button
          type='button'
          onClick={generate}
          className='text-white dark:text-DarkTxt bg-ModerateBlue hover:bg-Blueish flex items-center gap-4 px-3 py-2 rounded-md shadow-sm hover:shadow-sm w-fit'
        >
          Resend
        </button>
      </div>
    </form>
  );
}

export default OtpForm;
