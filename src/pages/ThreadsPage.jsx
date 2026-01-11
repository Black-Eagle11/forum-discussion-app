import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import asyncStatus from '../utils/asyncStatus';
import { fetchThreads } from '../features/threads/threadsThunks';
import { fetchAllUsers } from '../features/users/usersThunks';

import ThreadList from '../components/threads/ThreadList';
import ThreadFilter from '../components/threads/ThreadFilter';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

function ThreadsPage() {
  const dispatch = useDispatch();

  const threadsStatus = useSelector((state) => state.threads.status);
  const threadsError = useSelector((state) => state.threads.error);
  const usersStatus = useSelector((state) => state.users.status);

  useEffect(() => {
    dispatch(fetchThreads());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  if (
    threadsStatus === asyncStatus.LOADING ||
    usersStatus === asyncStatus.LOADING
  ) {
    return <Loading />;
  }

  if (threadsStatus === asyncStatus.ERROR) {
    return <ErrorMessage message={threadsError} />;
  }

  return (
    <section style={{ maxWidth: '800px', margin: '1.5rem auto' }}>
      <h2 style={{ marginBottom: '1rem' }}>Daftar Thread</h2>

      <ThreadFilter />
      <ThreadList />
    </section>
  );
}

export default ThreadsPage;
