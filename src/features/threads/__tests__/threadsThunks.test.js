import {
  fetchThreads,
  createNewThread,
  voteThread,
} from '../threadsThunks';
import dicodingForumApi from '../../../api/dicodingForumApi';

jest.mock('../../../api/dicodingForumApi');

describe('threadsThunks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchThreads thunk', () => {
    test('harus fulfilled ketika API sukses', async () => {
      const fakeThreads = [{ id: 'thread-1', title: 'Test Thread' }];
      dicodingForumApi.getAllThreads.mockResolvedValueOnce({
        threads: fakeThreads,
      });

      const dispatch = jest.fn();
      const result = await fetchThreads()(dispatch, () => ({}), undefined);

      expect(dicodingForumApi.getAllThreads).toHaveBeenCalled();
      expect(result.type).toBe('threads/fetchThreads/fulfilled');
      expect(result.payload).toEqual(fakeThreads);
    });

    test('harus rejected ketika API gagal', async () => {
      dicodingForumApi.getAllThreads.mockRejectedValueOnce(
        new Error('Fetch error'),
      );

      const dispatch = jest.fn();
      const result = await fetchThreads()(dispatch, () => ({}), undefined);

      expect(dicodingForumApi.getAllThreads).toHaveBeenCalled();
      expect(result.type).toBe('threads/fetchThreads/rejected');
      expect(result.payload).toBe('Fetch error');
    });
  });

  describe('createNewThread thunk', () => {
    test('harus fulfilled ketika API sukses', async () => {
      const fakeThread = { id: 'thread-1', title: 'Thread Baru' };
      dicodingForumApi.createThread.mockResolvedValueOnce({
        thread: fakeThread,
      });

      const dispatch = jest.fn();
      const result = await createNewThread({
        title: 'Judul',
        body: 'Isi',
        category: 'react',
      })(dispatch, () => ({}), undefined);

      expect(dicodingForumApi.createThread).toHaveBeenCalled();
      expect(result.type).toBe('threads/createNewThread/fulfilled');
      expect(result.payload).toEqual(fakeThread);
    });

    test('harus rejected ketika API gagal', async () => {
      dicodingForumApi.createThread.mockRejectedValueOnce(
        new Error('Create error'),
      );

      const dispatch = jest.fn();
      const result = await createNewThread({
        title: 'Judul',
        body: 'Isi',
        category: 'react',
      })(dispatch, () => ({}), undefined);

      expect(dicodingForumApi.createThread).toHaveBeenCalled();
      expect(result.type).toBe('threads/createNewThread/rejected');
      expect(result.payload).toBe('Create error');
    });
  });

  describe('voteThread thunk', () => {
    test('harus memanggil upVoteThread ketika voteType = 1', async () => {
      dicodingForumApi.upVoteThread.mockResolvedValueOnce();

      const dispatch = jest.fn();
      const result = await voteThread({
        threadId: 'thread-1',
        userId: 'user-1',
        voteType: 1,
      })(dispatch, () => ({}), undefined);

      expect(dicodingForumApi.upVoteThread).toHaveBeenCalledWith('thread-1');
      expect(result.type).toBe('threads/voteThread/fulfilled');
    });

    test('harus memanggil downVoteThread ketika voteType = -1', async () => {
      dicodingForumApi.downVoteThread.mockResolvedValueOnce();

      const dispatch = jest.fn();
      const result = await voteThread({
        threadId: 'thread-1',
        userId: 'user-1',
        voteType: -1,
      })(dispatch, () => ({}), undefined);

      expect(dicodingForumApi.downVoteThread).toHaveBeenCalledWith('thread-1');
      expect(result.type).toBe('threads/voteThread/fulfilled');
    });

    test('harus memanggil neutralVoteThread ketika voteType = 0', async () => {
      dicodingForumApi.neutralVoteThread.mockResolvedValueOnce();

      const dispatch = jest.fn();
      const result = await voteThread({
        threadId: 'thread-1',
        userId: 'user-1',
        voteType: 0,
      })(dispatch, () => ({}), undefined);

      expect(dicodingForumApi.neutralVoteThread).toHaveBeenCalledWith('thread-1');
      expect(result.type).toBe('threads/voteThread/fulfilled');
    });

    test('harus rejected ketika API gagal', async () => {
      dicodingForumApi.upVoteThread.mockRejectedValueOnce(
        new Error('Vote error'),
      );

      const dispatch = jest.fn();
      const result = await voteThread({
        threadId: 'thread-1',
        userId: 'user-1',
        voteType: 1,
      })(dispatch, () => ({}), undefined);

      expect(result.type).toBe('threads/voteThread/rejected');
      expect(result.payload).toBe('Vote error');
    });
  });
});
