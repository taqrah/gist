function page({ params }: any) {
  const id = params.id;
  return (
    <div className='grid place-items-center min-h-[75vh]'>
      <h1>
        Replies to gist <span className='font-bold text-green-500'>{id}</span>{' '}
        would be here
      </h1>
    </div>
  );
}

export default page;
