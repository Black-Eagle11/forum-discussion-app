import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../src/features/auth/authSlice';
import threadsReducer from '../src/features/threads/threadsSlice';
import usersReducer from '../src/features/users/usersSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    threads: threadsReducer,
    users: usersReducer,
  },
});

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    </Provider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
};
