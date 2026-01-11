import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ThreadVotes from './ThreadVotes';
import Avatar from '../common/Avatar';
import { formatDate } from '../../utils/date';

function ThreadItem({ thread }) {
  const users = useSelector((state) => state.users.list);
  const owner = users.find((user) => user.id === thread.ownerId);

  return (
    <article
      style={{
        padding: '1rem',
        border: '1px solid #e5e7eb',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
    >
      <header
        style={{
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center',
          marginBottom: '0.5rem',
        }}
      >
        <Avatar
          src={owner?.avatar}
          name={owner?.name}
          size={36}
        />

        <div>
          <strong>{owner?.name || 'Unknown User'}</strong>
          <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
            {formatDate(thread.createdAt)}
          </div>
        </div>
      </header>

      <h3 style={{ marginBottom: '0.5rem' }}>
        <Link
          to={`/threads/${thread.id}`}
          style={{ textDecoration: 'none', color: '#111827' }}
        >
          {thread.title}
        </Link>
      </h3>

      <p
        style={{
          marginBottom: '0.75rem',
          color: '#374151',
        }}
      >
        {thread.body.slice(0, 120)}
        {thread.body.length > 120 && '...'}
      </p>

      <footer
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.85rem',
          color: '#6b7280',
        }}
      >
        <span>💬 {thread.totalComments} komentar</span>

        <ThreadVotes thread={thread} />
      </footer>
    </article>
  );
}

export default ThreadItem;
