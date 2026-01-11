import { useSelector } from 'react-redux';

import CommentItem from './CommentItem';

function CommentList() {
  const thread = useSelector((state) => state.threadDetail.thread);

  if (!thread || !thread.comments) {
    return null;
  }

  if (thread.comments.length === 0) {
    return <p>Belum ada komentar.</p>;
  }

  return (
    <div>
      {thread.comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default CommentList;
