import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { voteThread } from '../../features/threads/threadsThunks';
import PropTypes from 'prop-types';

function ThreadVotes({ thread }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;

  const [optimisticVote, setOptimisticVote] = useState(null);

  const upVotesBy =
    optimisticVote?.upVotesBy ?? thread.upVotesBy ?? [];

  const downVotesBy =
    optimisticVote?.downVotesBy ?? thread.downVotesBy ?? [];

  const isUpVoted = userId ? upVotesBy.includes(userId) : false;
  const isDownVoted = userId ? downVotesBy.includes(userId) : false;

  const applyOptimisticVote = (voteType) => {
    if (!userId) return null;

    let nextUp = upVotesBy.filter((id) => id !== userId);
    let nextDown = downVotesBy.filter((id) => id !== userId);

    if (voteType === 1) nextUp.push(userId);
    if (voteType === -1) nextDown.push(userId);

    return { upVotesBy: nextUp, downVotesBy: nextDown };
  };

  const handleVote = (voteType) => {
    if (!userId) {
      alert('Silakan login untuk melakukan vote.');
      return;
    }

    setOptimisticVote(applyOptimisticVote(voteType));

    dispatch(
      voteThread({
        threadId: thread.id,
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
      >
        ▲ {upVotesBy.length}
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
      >
        ▼ {downVotesBy.length}
      </button>
    </div>
  );
}

ThreadVotes.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ThreadVotes;
