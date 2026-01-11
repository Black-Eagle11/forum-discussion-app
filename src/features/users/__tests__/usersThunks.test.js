import { fetchAllUsers } from '../usersThunks';
import dicodingForumApi from '../../../api/dicodingForumApi';

jest.mock('../../../api/dicodingForumApi');

describe('usersThunks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('harus fulfilled ketika API sukses', async () => {
    const fakeUsers = [
      { id: 'user-1', name: 'Yoga' },
      { id: 'user-2', name: 'Zia' },
    ];

    dicodingForumApi.getAllUsers.mockResolvedValueOnce({
      users: fakeUsers,
    });

    const dispatch = jest.fn();
    const result = await fetchAllUsers()(dispatch, () => ({}), undefined);

    expect(dicodingForumApi.getAllUsers).toHaveBeenCalled();
    expect(result.type).toBe('users/fetchAllUsers/fulfilled');
    expect(result.payload).toEqual(fakeUsers);
  });

  test('harus rejected ketika API gagal', async () => {
    dicodingForumApi.getAllUsers.mockRejectedValueOnce(
      new Error('Fetch users error'),
    );

    const dispatch = jest.fn();
    const result = await fetchAllUsers()(dispatch, () => ({}), undefined);

    expect(result.type).toBe('users/fetchAllUsers/rejected');
  });
});
