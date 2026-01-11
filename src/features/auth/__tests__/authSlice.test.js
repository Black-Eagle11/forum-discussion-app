import authReducer, { logout } from '../authSlice';
import asyncStatus from '../../../utils/asyncStatus';
import { registerUser } from '../authThunks';

describe('authSlice reducer', () => {
  const initialState = {
    user: null,
    status: asyncStatus.IDLE,
    error: null,
    isAuthChecked: false,
  };

  test('harus mengembalikan initial state ketika action tidak dikenal', () => {
    const result = authReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(result).toEqual(initialState);
  });

  test('harus meng-handle logout dengan benar', () => {
    const state = {
      user: { id: 'user-1', name: 'Yoga' },
      status: asyncStatus.SUCCESS,
      error: 'Error',
      isAuthChecked: false,
    };

    const result = authReducer(state, logout());

    expect(result.user).toBeNull();
    expect(result.status).toBe(asyncStatus.IDLE);
    expect(result.error).toBeNull();
    expect(result.isAuthChecked).toBe(true);
  });

  test('harus meng-handle registerUser.pending', () => {
    const action = { type: registerUser.pending.type };

    const result = authReducer(initialState, action);

    expect(result.status).toBe(asyncStatus.LOADING);
    expect(result.error).toBeNull();
  });

  test('harus meng-handle registerUser.rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      payload: 'Registrasi gagal',
    };

    const result = authReducer(initialState, action);

    expect(result.status).toBe(asyncStatus.ERROR);
    expect(result.error).toBe('Registrasi gagal');
  });
});
