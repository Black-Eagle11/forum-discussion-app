import { registerUser, loginUser, fetchOwnProfile } from '../authThunks';
import dicodingForumApi from '../../../api/dicodingForumApi';

jest.mock('../../../api/dicodingForumApi');

describe('authThunks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser thunk', () => {
    test('harus fulfilled ketika register berhasil', async () => {
      dicodingForumApi.register.mockResolvedValueOnce();

      const dispatch = jest.fn();
      const result = await registerUser({
        name: 'Yoga',
        email: 'yoga@mail.com',
        password: '123456',
      })(dispatch, () => ({}), undefined);

      expect(dicodingForumApi.register).toHaveBeenCalled();
      expect(result.type).toBe('auth/registerUser/fulfilled');
    });

    test('harus rejected ketika register gagal', async () => {
      dicodingForumApi.register.mockRejectedValueOnce(new Error('Register error'));

      const dispatch = jest.fn();
      const result = await registerUser({
        name: 'Yoga',
        email: 'yoga@mail.com',
        password: '123456',
      })(dispatch, () => ({}), undefined);

      expect(dicodingForumApi.register).toHaveBeenCalled();
      expect(result.type).toBe('auth/registerUser/rejected');
      expect(result.payload).toBe('Register error');
    });
  });

  describe('loginUser thunk', () => {
    test('harus fulfilled ketika login berhasil', async () => {
      dicodingForumApi.login.mockResolvedValueOnce();

      const dispatch = jest.fn();
      const result = await loginUser({
        email: 'yoga@mail.com',
        password: '123456',
      })(dispatch, () => ({}), undefined);

      expect(dicodingForumApi.login).toHaveBeenCalled();
      expect(result.type).toBe('auth/loginUser/fulfilled');
    });

    test('harus rejected ketika login gagal', async () => {
      dicodingForumApi.login.mockRejectedValueOnce(new Error('Login error'));

      const dispatch = jest.fn();
      const result = await loginUser({
        email: 'yoga@mail.com',
        password: '123456',
      })(dispatch, () => ({}), undefined);

      expect(dicodingForumApi.login).toHaveBeenCalled();
      expect(result.type).toBe('auth/loginUser/rejected');
      expect(result.payload).toBe('Login error');
    });
  });

  describe('fetchOwnProfile thunk', () => {
    test('harus fulfilled dan mengembalikan user ketika API berhasil', async () => {
      const fakeUser = { id: 'user-1', name: 'Yoga' };
      dicodingForumApi.getOwnProfile.mockResolvedValueOnce({
        user: fakeUser,
      });

      const dispatch = jest.fn();
      const result = await fetchOwnProfile()(
        dispatch,
        () => ({}),
        undefined,
      );

      expect(dicodingForumApi.getOwnProfile).toHaveBeenCalled();
      expect(result.type).toBe('auth/fetchOwnProfile/fulfilled');
      expect(result.payload).toEqual(fakeUser);
    });

    test('harus rejected ketika API gagal', async () => {
      dicodingForumApi.getOwnProfile.mockRejectedValueOnce(
        new Error('Fetch error'),
      );

      const dispatch = jest.fn();
      const result = await fetchOwnProfile()(
        dispatch,
        () => ({}),
        undefined,
      );

      expect(dicodingForumApi.getOwnProfile).toHaveBeenCalled();
      expect(result.type).toBe('auth/fetchOwnProfile/rejected');
      expect(result.payload).toBe('Fetch error');
    });
  });
});
