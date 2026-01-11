import { render, screen } from '@testing-library/react';
import LeaderboardItem from '../leaderboard/LeaderboardItem';

describe('LeaderboardItem component', () => {
  const leaderboard = {
    user: {
      id: 'user-1',
      name: 'Yoga',
      avatar: 'avatar.png',
    },
    score: 120,
  };

  test('harus menampilkan nama user', () => {
    render(<LeaderboardItem leaderboard={leaderboard} />);

    expect(screen.getByText('Yoga')).toBeInTheDocument();
  });

  test('harus menampilkan score user', () => {
    render(<LeaderboardItem leaderboard={leaderboard} />);

    expect(screen.getByText('120')).toBeInTheDocument();
  });
});
