import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import ThreadFilter from '../threads/ThreadFilter';
import threadsReducer from '../../features/threads/threadsSlice';

function renderWithStore(preloadedThreadsState) {
  const store = configureStore({
    reducer: {
      threads: threadsReducer,
    },
    preloadedState: {
      threads: preloadedThreadsState,
    },
  });

  return render(
    <Provider store={store}>
      <ThreadFilter />
    </Provider>
  );
}

describe('ThreadFilter component', () => {
  test('harus menampilkan opsi default "Semua"', () => {
    renderWithStore({
      list: [],
      status: 'idle',
      error: null,
      categoryFilter: 'all',
    });

    expect(screen.getByText('Semua')).toBeInTheDocument();
  });

  test('harus menampilkan kategori unik dari list threads', () => {
    renderWithStore({
      list: [
        { id: '1', category: 'react' },
        { id: '2', category: 'redux' },
        { id: '3', category: 'react' },
      ],
      status: 'idle',
      error: null,
      categoryFilter: 'all',
    });

    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('redux')).toBeInTheDocument();
  });

  test('harus dispatch setCategoryFilter ketika select berubah', () => {
    renderWithStore({
      list: [{ id: '1', category: 'react' }],
      status: 'idle',
      error: null,
      categoryFilter: 'all',
    });

    const select = screen.getByLabelText(/filter kategori/i);

    fireEvent.change(select, { target: { value: 'react' } });

    expect(select.value).toBe('react');
  });
});
