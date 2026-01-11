import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  fetchThreadDetail,
  createNewComment,
} from '../features/threadDetail/threadDetailThunks';
import { clearThreadDetail } from '../features/threadDetail/threadDetailSlice';

import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import Avatar from '../components/common/Avatar';
import CommentList from '../components/comments/CommentList';
import Button from '../components/common/Button';
import { formatDate } from '../utils/date';

function ThreadDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { thread, status, error } = useSelector(
    (state) => state.threadDetail,
  );
  const user = useSelector((state) => state.auth.user);

  const [comment, setComment] = useState('');

  useEffect(() => {
    dispatch(fetchThreadDetail(id));

    return () => {
      dispatch(clearThreadDetail());
    };
  }, [dispatch, id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!comment.trim()) return;

    dispatch(
      createNewComment({
        threadId: id,
        content: comment,
      }),
    );

    setComment('');
  };

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'error') {
    return <ErrorMessage message={error} />;
  }

  if (!thread) {
    return null;
  }

  return (
    <section style={{ maxWidth: '800px', margin: '1.5rem auto' }}>
      <article
        style={{
          padding: '1rem',
          border: '1px solid #e5e7eb',
          borderRadius: '6px',
          marginBottom: '1.5rem',
        }}
      >
        <header
          style={{
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'center',
            marginBottom: '0.75rem',
          }}
        >
          <Avatar
            src={thread.owner.avatar}
            name={thread.owner.name}
            size={40}
          />

          <div>
            <strong>{thread.owner.name}</strong>
            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
              {formatDate(thread.createdAt)}
            </div>
          </div>
        </header>

        <h2 style={{ marginBottom: '0.75rem' }}>
          {thread.title}
        </h2>

        <p style={{ marginBottom: '1rem' }}>
          {thread.body}
        </p>
      </article>

      <section>
        <h3 style={{ marginBottom: '0.75rem' }}>
          Komentar
        </h3>

        {user ? (
          <form
            onSubmit={handleSubmit}
            style={{ marginBottom: '1rem' }}
          >
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              placeholder="Tulis komentar..."
              style={{
                width: '100%',
                padding: '0.5rem',
                marginBottom: '0.5rem',
              }}
            />

            <Button type="submit">
              Kirim Komentar
            </Button>
          </form>
        ) : (
          <p style={{ marginBottom: '1rem' }}>
            Login untuk menulis komentar.
          </p>
        )}

        <CommentList />
      </section>
    </section>
  );
}

export default ThreadDetailPage;
