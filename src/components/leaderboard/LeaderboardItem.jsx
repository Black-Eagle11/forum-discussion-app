import Avatar from '../common/Avatar';
import PropTypes from 'prop-types';

function LeaderboardItem({ leaderboard }) {
  const { user, score } = leaderboard;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 1rem',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <Avatar
          src={user.avatar}
          name={user.name}
          size={36}
        />

        <span style={{ fontWeight: 'bold' }}>
          {user.name}
        </span>
      </div>

      <span
        style={{
          fontWeight: 'bold',
          color: '#2563eb',
        }}
      >
        {score}
      </span>
    </div>
  );
}

LeaderboardItem.propTypes = {
  leaderboard: PropTypes.shape({
    score: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default LeaderboardItem;
