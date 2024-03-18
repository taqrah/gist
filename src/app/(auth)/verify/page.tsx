import { toast } from 'sonner';
import { customAlphabet } from 'nanoid';
import { currentUser } from '@clerk/nextjs';
import oauthSignature from 'oauth-signature';
import Verification from '@/components/verification';

const sendDM = async (recipientId: string, otpCode: string) => {
  'use server'
  // list of characters for nanoid to generate from
  const alphabet ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  // generate 32bit string from the above characters
  const nonceGenerator = customAlphabet(alphabet, 32);
  // return the string
  const nonce = nonceGenerator();
  // URL Link for twitter direct message endpoint
  const url = 'https://api.twitter.com/1.1/direct_messages/events/new.json';
  // Generate a timestamp
  const ts = Math.floor(new Date().getTime() / 1000);
  const timestamp = ts.toString();

  // pull in the twitter api keys from the .env file
  const consumerKey = process.env.NEXT_PUBLIC_TWITTER_API_KEY;
  const token = process.env.NEXT_PUBLIC_TWITTER_ACCESS_TOKEN;
  const consumerSecret = process.env.NEXT_PUBLIC_TWITTER_API_SECRET as string;
  const tokenSecret = process.env.NEXT_PUBLIC_TWITTER_ACCESS_TOKEN_SECRET as string;

  // Authorization Parameters
  const params = {
    oauth_version: '1.0',
    oauth_consumer_key: consumerKey,
    oauth_token: token,
    oauth_timestamp: timestamp,
    oauth_nonce: nonce,
    oauth_signature_method: 'HMAC-SHA1',
  };

  // generate oauth_signature
  // https://developer.twitter.com/en/docs/authentication/oauth-1-0a/creating-a-signature
  const signature = oauthSignature.generate( 'POST', url, params, consumerSecret, tokenSecret);

  // Requst body
  const dataString = `{"event": {"type": "message_create", "message_create": {"target": { "recipient_id": "${recipientId}"},"message_data": {"text": "${otpCode}"}}}}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `OAuth oauth_consumer_key="${params.oauth_consumer_key}", oauth_nonce="${params.oauth_nonce}", oauth_signature="${signature}", oauth_signature_method="HMAC-SHA1", oauth_timestamp="${params.oauth_timestamp}", oauth_token="${params.oauth_token}", oauth_version="${params.oauth_version}"`,
        'Content-type': 'application/json',
      },
      body: dataString,
    });
    const data = await res.json();

    if (!res.ok) {
      console.log(data);
      toast.error('An error occured!');
    } else {
      toast.success('OTP sent successfully!');
    }
  } catch (error) {
    console.log(error);
  }
};

// V2 dm method
// const sendOTP = async (recipientId: string, otp: string) => {
//   const accessToken = process.env.NEXT_PUBLIC_TWITTER_ACCESS_TOKEN;
//   const participantId = recipientId;
//   const textMessage = `Your OTP is ${otp}`;

//   const headers = {
//     Authorization: `Bearer ${accessToken}`,
//     'Content-Type': 'application/json',
//   };

//   const requestUrl = `https://api.twitter.com/2/dm_conversations/with/${participantId}/messages`;
//   const requestBody = {
//     text: textMessage,
//   };

//   try {
//     const response = await fetch(requestUrl, {
//       method: 'POST',
//       headers: headers,
//       body: JSON.stringify(requestBody),
//     });
//     const data = await response.json();

//     if (!response.ok) {
//       console.log(data);
//     }

//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// };

async function Page() {
  const user = await currentUser();
  const usersTwitterId = user?.externalAccounts[0].externalId;

  return (
    <>
      <div className='grid place-content-center min-h-[85vh]'>
        <Verification sendDM={sendDM} recipientId={usersTwitterId}/>
      </div>
    </>
  );
}

export default Page;
