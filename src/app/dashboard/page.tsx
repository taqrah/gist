import { auth, currentUser } from '@clerk/nextjs';

async function Dashboard() {
  const { userId } = auth();

  const user = await currentUser();

  if (!userId || !user) {
    return (
      <div className='min-h-screen grid place-content-center'>
        <h1>Can&apos;t access this page without logging in</h1>
      </div>
    );
  }

  return (
    <div className='min-h-[85vh] grid place-content-center'>
      <h1 className='mb-8 text-center text-3xl font-bold'>
        Welcome, {user?.firstName}
      </h1>
      <div className='flex flex-col p-6 gap-8'>
        <div className='flex gap-2'>
          <h2 className='font-semibold'>Display Name:</h2>
          <p>{user?.firstName}</p>
        </div>
        {user.username && (
          <div className='flex gap-2'>
            <h2 className='font-semibold'>Username:</h2>
            <p>@{user?.username}</p>
          </div>
        )}
        <div className='flex gap-2'>
          <h2 className='font-semibold'>Email:</h2>
          <p>{user?.emailAddresses[0]?.emailAddress || 'not provided'}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
