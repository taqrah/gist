import { Gist as GistType } from '@/types';
import Gist from './cards/gist';
import { auth } from '@clerk/nextjs';

import gists from '../data/db.json';

async function getGists() {
  // this is a free instance on render so it takes at least 50s to startup 
  // which may lead to vercel throwing a timeout error when '/' page is visited
  const res = await fetch('https://comment-section-pk6h.onrender.com/comments'); 

  return res.json();
}

async function Gists() {
  const { userId } = auth();
  // const gists = await getGists();

  console.log(gists);

  return (
    <>
      {!gists ? (
        <div className='grid place-content-center min-h-[85vh] dark:text-DarkTxt'>
          An error occured loading your feed
        </div>
      ) : (
        gists.map((gist: GistType) => (
          <Gist
            id={gist._id}
            key={gist._id}
            content={gist.content}
            createdAt={gist.createdAt}
            username={gist.user.username}
            currentUser={gist.user.id === userId}
            replies={gist.replies}
            isAuthenticated={!!userId}
          />
        ))
      )}
    </>
  );
}
export default Gists;
