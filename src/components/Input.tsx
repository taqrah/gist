'use client';
import { useEffect, useState } from 'react';
import { Copy } from './icons';
import { toast } from 'sonner';

function Input() {
  const emptyOtp = ['', '', '', '', ''];
  const [otp, setOtp] = useState(emptyOtp);

  const generate = () => {
    const otp = Array.from({ length: 5 }, () => Math.floor(Math.random() * 9));
    setOtp(otp.toString().split(','));
  };

  useEffect(() => {
    generate();
  }, []);

  const copyOtp = () => {
    if (otp.join('') === '') {
      return;
    }
    const otpValue = otp.join('');
    navigator.clipboard.readText();
    toast.success('Copied to clipboard', {
      duration: 1000,
      position: 'top-left',
      style: {
        border: 'none',
        width: 'fit-content',
      },
      className: 'toast',
    });
  };

  const destroyOtp = () => {
    setOtp(emptyOtp);
  };

  useEffect(() => {
    const expiry = 30000;

    const interval = setInterval(() => {
      if (otp.join('') !== '') {
        destroyOtp();
      }
    }, expiry);

    return () => clearInterval(interval);
  }, [otp]);

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex gap-4'>
        {otp.map((char, index) => (
          <div key={index}>
            <input
              name='otp'
              id='otp'
              value={char[index]}
              className='otp grid place-content-center rounded-md border-b-2 w-12 h-12 text-center font-bold text-2xl'
            />
            <label htmlFor='otp' className='sr-only'>Enter your OTP code</label>
          </div>
        ))}
      </div>
      <div className='flex gap-2 justify-center'>
        <button
          type='button'
          onClick={copyOtp}
          className='btn text-darkTxt dark:text-lightTxt flex items-center gap-4 p-3 rounded-md hover:shadow-sm w-fit'
        >
          <span className='sr-only'>Paste OTP</span>
          <Copy aria-hidden='true' />
        </button>
        <button
          type='button'
          onClick={generate}
          className='btn text-darkTxt dark:text-lightTxt flex justify-between gap-4 p-3 rounded-md hover:shadow-sm '
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
}

export default Input;
