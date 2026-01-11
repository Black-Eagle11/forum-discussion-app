import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';

import ThreadItem from '../threads/ThreadItem';

// reducer dummy untuk users
function usersReducer(state = { list: [] }) {
  return state;
}

function renderWithStore(usersState, thread) {
  const store = configureStore({
    reducer: {
      users: usersReducer,
      auth: () => ({ user: null }), 
    },
    preloadedState: {
      users: usersState,
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <ThreadItem thread={thread} />
      </MemoryRouter>
    </Provider>
  );
}

describe('ThreadItem component', () => {
  const thread = {
    id: 'thread-1',
    title: 'Judul Thread',
    body: 'Isi thread yang sangat panjang untuk kebutuhan test.',
    ownerId: 'user-1',
    createdAt: new Date().toISOString(),
    totalComments: 3,
    upVotesBy: [],
    downVotesBy: [],
  };

  test('harus menampilkan judul thread', () => {
    renderWithStore({ list: [] }, thread);

    expect(screen.getByText('Judul Thread')).toBeInTheDocument();
  });

  test('harus menampilkan nama owner jika ditemukan', () => {
    renderWithStore(
      { list: [{ id: 'user-1', name: 'Yoga' }] },
      thread
    );

    expect(screen.getByText('Yoga')).toBeInTheDocument();
  });

  test('harus menampilkan fallback "Unknown User" jika owner tidak ditemukan', () => {
    renderWithStore({ list: [] }, thread);

    expect(screen.getByText('Unknown User')).toBeInTheDocument();
  });

  test('harus menampilkan jumlah komentar', () => {
    renderWithStore({ list: [] }, thread);

    expect(screen.getByText(/3 komentar/i)).toBeInTheDocument();
  });
});
