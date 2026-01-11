import {
  fetchThreadDetail,
  createNewComment,
  voteComment,
} from '../threadDetailThunks';
import dicodingForumApi from '../../../api/dicodingForumApi';

jest.mock('../../../api/dicodingForumApi');

describe('threadDetailThunks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchThreadDetail thunk', () => {
    test('harus fulfilled ketika API sukses', async () => {
      const fakeThread = { id: 'thread-1', title: 'Test Thread' };

      dicodingForumApi.getThreadDetail.mockResolvedValueOnce({
        detailThread: fakeThread,
      });

      const dispatch = jest.fn();
      const result = await fetchThreadDetail('thread-1')(
        dispatch,
        () => ({}),
        undefined,
      );

      expect(dicodingForumApi.getThreadDetail).toHaveBeenCalledWith('thread-1');
      expect(result.type).toBe(
        'threadDetail/fetchThreadDetail/fulfilled',
      );
      expect(result.payload).toEqual(fakeThread);
    });

    test('harus rejected ketika API gagal', async () => {
      dicodingForumApi.getThreadDetail.mockRejectedValueOnce(
        new Error('Fetch error'),
      );

      const dispatch = jest.fn();
      const result = await fetchThreadDetail('thread-1')(
        dispatch,
        () => ({}),
        undefined,
      );

      expect(result.type).toBe(
        'threadDetail/fetchThreadDetail/rejected',
      );
      expect(result.payload).toBe('Fetch error');
    });
  });

  describe('createNewComment thunk', () => {
    test('harus fulfilled ketika API sukses', async () => {
      const fakeComment = { id: 'comment-1', content: 'Komentar test' };

      dicodingForumApi.createComment.mockResolvedValueOnce({
        comment: fakeComment,
      });

      const dispatch = jest.fn();
      const result = await createNewComment({
        threadId: 'thread-1',
        content: 'Halo',
      })(dispatch, () => ({}), undefined);

      expect(dicodingForumApi.createComment).toHaveBeenCalled();
      expect(result.type).toBe(
        'threadDetail/createNewComment/fulfilled',
      );
      expect(result.payload).toEqual(fakeComment);
    });

    test('harus rejected ketika API gagal', async () => {
      dicodingForumApi.createComment.mockRejectedValueOnce(
        new Error('Create comment error'),
      );

      const dispatch = jest.fn();
      const result = await createNewComment({
        threadId: 'thread-1',
        content: 'Halo',
      })(dispatch, () => ({}), undefined);

      expect(result.type).toBe(
        'threadDetail/createNewComment/rejected',
      );
      expect(result.payload).toBe('Create comment error');
    });
  });

  describe('voteComment thunk', () => {
    test('harus memanggil upVoteComment ketika voteType = 1', async () => {
      dicodingForumApi.upVoteComment.mockResolvedValueOnce();

      const dispatch = jest.fn();
      const result = await voteComment({
        threadId: 'thread-1',
        commentId: 'comment-1',
        voteType: 1,
        userId: 'user-1',
      })(dispatch, () => ({}), undefined);

      expect(dicodingForumApi.upVoteComment).toHaveBeenCalledWith({
        threadId: 'thread-1',
        commentId: 'comment-1',
      });
      expect(result.type).toBe('threadDetail/voteComment/fulfilled');
    });

    test('harus memanggil downVoteComment ketika voteType = -1', async () => {
      dicodingForumApi.downVoteComment.mockResolvedValueOnce();

      const dispatch = jest.fn();
      const result = await voteComment({
        threadId: 'thread-1',
        commentId: 'comment-1',
        voteType: -1,
        userId: 'user-1',
      })(dispatch, () => ({}), undefined);

      expect(dicodingForumApi.downVoteComment).toHaveBeenCalledWith({
        threadId: 'thread-1',
        commentId: 'comment-1',
      });
      expect(result.type).toBe('threadDetail/voteComment/fulfilled');
    });

    test('harus memanggil neutralVoteComment ketika voteType = 0', async () => {
      dicodingForumApi.neutralVoteComment.mockResolvedValueOnce();

      const dispatch = jest.fn();
      const result = await voteComment({
        threadId: 'thread-1',
        commentId: 'comment-1',
        voteType: 0,
        userId: 'user-1',
      })(dispatch, () => ({}), undefined);

      expect(dicodingForumApi.neutralVoteComment).toHaveBeenCalledWith({
        threadId: 'thread-1',
        commentId: 'comment-1',
      });
      expect(result.type).toBe('threadDetail/voteComment/fulfilled');
    });

    test('harus rejected ketika API gagal', async () => {
      dicodingForumApi.upVoteComment.mockRejectedValueOnce(
        new Error('Vote error'),
      );

      const dispatch = jest.fn();
      const result = await voteComment({
        threadId: 'thread-1',
        commentId: 'comment-1',
        voteType: 1,
        userId: 'user-1',
      })(dispatch, () => ({}), undefined);

      expect(result.type).toBe('threadDetail/voteComment/rejected');
      expect(result.payload).toBe('Vote error');
    });
  });
});
