import Gist from './gist';
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
      {gists.comments.length === 0 ? (
        <div>Sign up to start a gist</div>
      ) : (
        gists.comments.map((comment: any) => (
          <Gist
            id={comment._id}
            key={comment._id}
            content={comment.content}
            createdAt={comment.createdAt}
            username={comment.user.username}
            currentUser={comment.user._id === userId}
            replies={comment.replies}
            isAuthenticated={!!userId}
          />
        ))
      )}
    </>
  );
}
export default Gists;
