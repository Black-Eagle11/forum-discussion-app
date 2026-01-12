import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '../common/Avatar';
import CommentVotes from './CommentVotes';
import { formatDate } from '../../utils/date';

function CommentItem({ comment }) {
  const users = useSelector((state) => state.users.list);
  const owner = users.find((user) => user.id === comment.owner?.id);

  return (
    <div
      style={{
        padding: '1rem',
        border: '1px solid #e5e7eb',
        borderRadius: '6px',
        marginBottom: '0.75rem',
      }}
    >
      <header
        style={{
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
          marginBottom: '0.5rem',
        }}
      >
        <Avatar
          src={owner?.avatar || comment.owner?.avatar}
          name={owner?.name || comment.owner?.name}
          size={32}
        />

        <div>
          <strong>{owner?.name || comment.owner?.name}</strong>
          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
            {formatDate(comment.createdAt)}
          </div>
        </div>
      </header>

      <p style={{ marginBottom: '0.5rem' }}>
        {comment.content}
      </p>

      <CommentVotes comment={comment} />
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CommentItem;
