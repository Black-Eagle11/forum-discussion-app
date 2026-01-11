import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchLeaderboards } from '../features/leaderboard/leaderboardThunks';
import LeaderboardItem from '../components/leaderboard/LeaderboardItem';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

function LeaderboardPage() {
  const dispatch = useDispatch();

  const { list, status, error } = useSelector(
    (state) => state.leaderboard,
  );

  useEffect(() => {
    dispatch(fetchLeaderboards());
  }, [dispatch]);

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'error') {
    return <ErrorMessage message={error} />;
  }

  return (
    <section style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2 style={{ marginBottom: '1rem' }}>Leaderboard</h2>

      {list.length === 0 ? (
        <p>Belum ada data leaderboard.</p>
      ) : (
        <div
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            overflow: 'hidden',
          }}
        >
          {list.map((leaderboard) => (
            <LeaderboardItem
              key={leaderboard.user.id}
              leaderboard={leaderboard}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default LeaderboardPage;
