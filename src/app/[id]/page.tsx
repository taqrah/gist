import TextField from '@/components/textfield';

function page({ params }: any) {
  const id = params.id;
  return (
    <>
      <div className='grid place-items-center min-h-[60vh]'>
        <h1 className='dark:text-DarkTxt'>
          Replies to gist <span className='font-bold text-green-500'>{id}</span>{' '}
          would be here
        </h1>
      </div>

      <TextField />
    </>
  );
}

export default page;
