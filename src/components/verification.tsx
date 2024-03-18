'use client';
import { useState } from 'react';
import Consent from './cards/consent';
import OtpForm from './otpform';

function Verification({
  sendDM,
  recipientId,
}: {
  sendDM: (id: string, otp: string) => void;
  recipientId: string | undefined;
}) {
  const [consent, setConsent] = useState(false);
  const proceed = () => {
    setConsent(true);
    // sendDM();
  };
  return consent ? <OtpForm /> : <Consent proceed={proceed} />;
}

export default Verification;
