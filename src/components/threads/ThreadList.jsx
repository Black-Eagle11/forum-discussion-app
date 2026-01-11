import { useSelector } from 'react-redux';

import ThreadItem from './ThreadItem';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';

function ThreadList() {
  const { list, status, error, categoryFilter } = useSelector(
    (state) => state.threads,
  );

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'error') {
    return <ErrorMessage message={error} />;
  }

  const filteredThreads =
    categoryFilter === 'all'
      ? list
      : list.filter(
          (thread) => thread.category === categoryFilter,
        );

  if (filteredThreads.length === 0) {
    return <p>Tidak ada thread.</p>;
  }

  return (
    <div>
      {filteredThreads.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
    </div>
  );
}

export default ThreadList;
