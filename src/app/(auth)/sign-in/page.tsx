import { SignIn } from '@clerk/nextjs';

function Page() {
  return (
    <div className='grid place-content-center min-h-[80vh]'>
      <SignIn path='/sign-in'/>
    </div>
  );
}

export default Page;