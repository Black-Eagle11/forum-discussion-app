import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createNewThread } from '../features/threads/threadsThunks';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import Button from '../components/common/Button';

function AddThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.threads);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted && status === 'success') {
      navigate('/', { replace: true });
    }
  }, [isSubmitted, status, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitted(true);

    await dispatch(
      createNewThread({
        title,
        body,
        category: category || undefined,
      }),
    );
  };

  return (
    <section style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2 style={{ marginBottom: '1rem' }}>Buat Thread Baru</h2>

      {status === 'loading' && <Loading />}
      {error && <ErrorMessage message={error} />}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '0.75rem' }}>
          <label htmlFor="title">Judul</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '0.75rem' }}>
          <label htmlFor="category">Kategori (opsional)</label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="body">Isi Thread</label>
          <textarea
            id="body"
            rows={6}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <Button type="submit" disabled={status === 'loading'}>
          Kirim
        </Button>
      </form>
    </section>
  );
}

export default AddThreadPage;
