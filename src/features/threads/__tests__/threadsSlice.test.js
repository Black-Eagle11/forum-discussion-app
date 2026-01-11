import threadsReducer, { setCategoryFilter } from '../threadsSlice';
import asyncStatus from '../../../utils/asyncStatus';
import { fetchThreads, voteThread } from '../threadsThunks';

describe('threadsSlice reducer', () => {
  const initialState = {
    list: [],
    status: asyncStatus.IDLE,
    error: null,
    categoryFilter: 'all',
  };

  test('harus mengembalikan initial state ketika action tidak dikenal', () => {
    const result = threadsReducer(undefined, { type: 'UNKNOWN' });
    expect(result).toEqual(initialState);
  });

  test('harus meng-handle fetchThreads.pending', () => {
    const action = { type: fetchThreads.pending.type };
    const result = threadsReducer(initialState, action);

    expect(result.status).toBe(asyncStatus.LOADING);
    expect(result.error).toBeNull();
  });

  test('harus meng-handle fetchThreads.fulfilled dan mengisi list', () => {
    const fakeThreads = [{ id: 'thread-1', title: 'Thread Test' }];
    const action = {
      type: fetchThreads.fulfilled.type,
      payload: fakeThreads,
    };

    const result = threadsReducer(initialState, action);

    expect(result.status).toBe(asyncStatus.SUCCESS);
    expect(result.list).toEqual(fakeThreads);
  });

  test('harus mengubah categoryFilter ketika setCategoryFilter dipanggil', () => {
    const result = threadsReducer(initialState, setCategoryFilter('react'));

    expect(result.categoryFilter).toBe('react');
  });

  test('harus meng-handle voteThread.fulfilled dengan benar', () => {
    const state = {
      ...initialState,
      list: [
        {
          id: 'thread-1',
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };

    const action = {
      type: voteThread.fulfilled.type,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
        voteType: 1,
      },
    };

    const result = threadsReducer(state, action);

    expect(result.list[0].upVotesBy).toContain('user-1');
    expect(result.list[0].downVotesBy).toHaveLength(0);
  });
});
