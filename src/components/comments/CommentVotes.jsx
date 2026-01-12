import { useDispatch, useSelector } from 'react-redux';

import { voteComment } from '../../features/threadDetail/threadDetailThunks';
import PropTypes from 'prop-types';

function CommentVotes({ comment }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const threadId = useSelector(
    (state) => state.threadDetail.thread?.id,
  );

  const userId = user?.id;

  const isUpVoted = userId
    ? comment.upVotesBy.includes(userId)
    : false;

  const isDownVoted = userId
    ? comment.downVotesBy.includes(userId)
    : false;

  const handleVote = (voteType) => {
    if (!userId) {
      alert('Silakan login untuk melakukan vote.');
      return;
    }

    dispatch(
      voteComment({
        threadId,
        commentId: comment.id,
        userId,
        voteType,
      }),
    );
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <button
        type="button"
        onClick={() => handleVote(isUpVoted ? 0 : 1)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: isUpVoted ? '#16a34a' : '#6b7280',
        }}
        aria-label="Up vote comment"
      >
        ▲ {comment.upVotesBy.length}
      </button>

      <button
        type="button"
        onClick={() => handleVote(isDownVoted ? 0 : -1)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: isDownVoted ? '#dc2626' : '#6b7280',
        }}
        aria-label="Down vote comment"
      >
        ▼ {comment.downVotesBy.length}
      </button>
    </div>
  );
}

export default CommentVotes;

CommentVotes.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
