import { Gist as GistType } from '@/types';
import Gist from './cards/gist';
import { auth } from '@clerk/nextjs';

async function getGists() {
  const res = await fetch('https://comment-section-pk6h.onrender.com/comments');

  return res.json();
}

async function Gists() {
  const { userId } = auth();

  const gists = await getGists();

  console.log(gists);

  return (
    <>
      {!gists ? (
        <div className='grid place-content-center min-h-[85vh] dark:text-DarkTxt'>
          An error occured loading your feed
        </div>
      ) : (
        gists.comments.map((comment: GistType) => (
          <Gist
            id={comment._id}
            key={comment._id}
            content={comment.content}
            createdAt={comment.createdAt}
            username={comment.user.username}
            currentUser={comment.user.id === userId}
            replies={comment.replies}
            isAuthenticated={!!userId}
          />
        ))
      )}
    </>
  );
}
export default Gists;
