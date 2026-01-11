import usersReducer from '../usersSlice';
import asyncStatus from '../../../utils/asyncStatus';
import { fetchAllUsers } from '../usersThunks';

describe('usersSlice reducer', () => {
  const initialState = {
    list: [],
    status: asyncStatus.IDLE,
    error: null,
  };

  test('harus mengembalikan initial state ketika action tidak dikenal', () => {
    const result = usersReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(result).toEqual(initialState);
  });

  test('harus meng-handle fetchAllUsers.pending', () => {
    const action = { type: fetchAllUsers.pending.type };
    const result = usersReducer(initialState, action);

    expect(result.status).toBe(asyncStatus.LOADING);
    expect(result.error).toBeNull();
  });

  test('harus meng-handle fetchAllUsers.fulfilled dan mengisi list', () => {
    const fakeUsers = [{ id: 'user-1', name: 'Yoga' }];

    const action = {
      type: fetchAllUsers.fulfilled.type,
      payload: fakeUsers,
    };

    const result = usersReducer(initialState, action);

    expect(result.status).toBe(asyncStatus.SUCCESS);
    expect(result.list).toEqual(fakeUsers);
  });

  test('harus meng-handle fetchAllUsers.rejected', () => {
    const action = {
      type: fetchAllUsers.rejected.type,
      payload: 'Fetch error',
    };

    const result = usersReducer(initialState, action);

    expect(result.status).toBe(asyncStatus.ERROR);
    expect(result.error).toBe('Fetch error');
  });
});
