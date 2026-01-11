import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';

import Navbar from '../common/Navbar';
import authReducer from '../../features/auth/authSlice';

function renderWithStore(preloadedAuthState) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: preloadedAuthState,
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </Provider>
  );
}

describe('Navbar component', () => {
  test('harus menampilkan Login dan Register ketika user belum login', () => {
    renderWithStore({
      user: null,
      status: 'idle',
      error: null,
      isAuthChecked: true,
    });

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('harus menampilkan Logout ketika user sudah login', () => {
    renderWithStore({
      user: { id: 'user-1', name: 'Yoga' },
      status: 'success',
      error: null,
      isAuthChecked: true,
    });

    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.getByText('Buat Thread')).toBeInTheDocument();
  });

  test('harus memanggil logout ketika tombol Logout diklik', () => {
    renderWithStore({
      user: { id: 'user-1', name: 'Yoga' },
      status: 'success',
      error: null,
      isAuthChecked: true,
    });

    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    // Setelah logout, tombol Login akan muncul kembali
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});
