import threadDetailReducer, { clearThreadDetail } from '../threadDetailSlice';
import asyncStatus from '../../../utils/asyncStatus';
import {
  fetchThreadDetail,
  createNewComment,
  voteComment,
} from '../threadDetailThunks';

describe('threadDetailSlice reducer', () => {
  const initialState = {
    thread: null,
    status: asyncStatus.IDLE,
    error: null,
  };

  test('harus mengembalikan initial state ketika action tidak dikenal', () => {
    const result = threadDetailReducer(undefined, { type: 'UNKNOWN' });
    expect(result).toEqual(initialState);
  });

  test('harus meng-handle fetchThreadDetail.pending', () => {
    const action = { type: fetchThreadDetail.pending.type };
    const result = threadDetailReducer(initialState, action);

    expect(result.status).toBe(asyncStatus.LOADING);
    expect(result.error).toBeNull();
  });

  test('harus meng-handle fetchThreadDetail.fulfilled', () => {
    const fakeThread = { id: 'thread-1', title: 'Test Thread' };

    const action = {
      type: fetchThreadDetail.fulfilled.type,
      payload: fakeThread,
    };

    const result = threadDetailReducer(initialState, action);

    expect(result.status).toBe(asyncStatus.SUCCESS);
    expect(result.thread).toEqual(fakeThread);
  });

  test('harus meng-handle fetchThreadDetail.rejected', () => {
    const action = {
      type: fetchThreadDetail.rejected.type,
      payload: 'Error',
    };

    const result = threadDetailReducer(initialState, action);

    expect(result.status).toBe(asyncStatus.ERROR);
    expect(result.error).toBe('Error');
  });

  test('harus meng-handle clearThreadDetail dengan benar', () => {
    const state = {
      thread: { id: 'thread-1' },
      status: asyncStatus.SUCCESS,
      error: 'Error',
    };

    const result = threadDetailReducer(state, clearThreadDetail());

    expect(result).toEqual(initialState);
  });

  test('harus menambahkan komentar ketika createNewComment.fulfilled', () => {
    const state = {
      ...initialState,
      thread: {
        id: 'thread-1',
        comments: [],
      },
    };

    const newComment = { id: 'comment-1', content: 'Test comment' };

    const action = {
      type: createNewComment.fulfilled.type,
      payload: newComment,
    };

    const result = threadDetailReducer(state, action);

    expect(result.thread.comments).toHaveLength(1);
    expect(result.thread.comments[0]).toEqual(newComment);
  });

  test('harus melakukan optimistic update ketika voteComment.pending', () => {
    const state = {
      ...initialState,
      thread: {
        id: 'thread-1',
        comments: [
          {
            id: 'comment-1',
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
      },
    };

    const action = {
      type: voteComment.pending.type,
      meta: {
        arg: {
          commentId: 'comment-1',
          userId: 'user-1',
          voteType: 1,
        },
      },
    };

    const result = threadDetailReducer(state, action);

    expect(result.thread.comments[0].upVotesBy).toContain('user-1');
    expect(result.thread.comments[0].downVotesBy).toHaveLength(0);
  });
});
