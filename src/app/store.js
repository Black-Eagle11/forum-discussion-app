import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import usersReducer from '../features/users/usersSlice';
import threadsReducer from '../features/threads/threadsSlice';
import threadDetailReducer from '../features/threadDetail/threadDetailSlice';
import leaderboardReducer from '../features/leaderboard/leaderboardSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    leaderboard: leaderboardReducer,
  },
});

export default store;
