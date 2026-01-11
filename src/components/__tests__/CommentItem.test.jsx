import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import CommentItem from '../comments/CommentItem';

// reducer dummy untuk users
function usersReducer(state = { list: [] }) {
  return state;
}

function renderWithStore(usersState, comment) {
  const store = configureStore({
    reducer: {
      users: usersReducer,
      auth: () => ({ user: null }),
      threadDetail: () => ({ thread: { id: 'thread-1' } }),
    },
    preloadedState: {
      users: usersState,
    },
  });

  return render(
    <Provider store={store}>
      <CommentItem comment={comment} />
    </Provider>
  );
}

describe('CommentItem component', () => {
  const comment = {
    id: 'comment-1',
    content: 'Ini komentar testing',
    createdAt: new Date().toISOString(),
    owner: {
      id: 'user-1',
      name: 'Yoga',
      avatar: 'avatar.png',
    },
    upVotesBy: [],
    downVotesBy: [],
  };

  test('harus menampilkan nama dari Redux store jika user ditemukan', () => {
    renderWithStore(
      { list: [{ id: 'user-1', name: 'Zia' }] },
      comment
    );

    expect(screen.getByText('Zia')).toBeInTheDocument();
  });

  test('harus menampilkan nama dari comment.owner jika user tidak ditemukan di store', () => {
    renderWithStore({ list: [] }, comment);

    expect(screen.getByText('Yoga')).toBeInTheDocument();
  });

  test('harus menampilkan isi komentar', () => {
    renderWithStore({ list: [] }, comment);

    expect(screen.getByText('Ini komentar testing')).toBeInTheDocument();
  });
});
