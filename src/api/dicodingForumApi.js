const BASE_URL = 'https://forum-api.dicoding.dev/v1';

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(token) {
  localStorage.setItem('accessToken', token);
}

function fetchWithAuth(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
      ...options.headers,
    },
  });
}

async function handleResponse(response) {
  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(responseJson.message || 'Something went wrong');
  }

  return responseJson.data;
}

/* =========================
   AUTH
========================= */

async function register({ name, email, password }) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  return handleResponse(response);
}

async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await handleResponse(response);
  putAccessToken(data.token);

  return data;
}

async function getOwnProfile() {
  const response = await fetchWithAuth(`${BASE_URL}/users/me`);
  return handleResponse(response);
}

/* =========================
   USERS
========================= */

async function getAllUsers() {
  const response = await fetch(`${BASE_URL}/users`);
  return handleResponse(response);
}

/* =========================
   THREADS
========================= */

async function getAllThreads() {
  const response = await fetch(`${BASE_URL}/threads`);
  return handleResponse(response);
}

async function getThreadDetail(threadId) {
  const response = await fetch(`${BASE_URL}/threads/${threadId}`);
  return handleResponse(response);
}

async function createThread({ title, body, category }) {
  const response = await fetchWithAuth(`${BASE_URL}/threads`, {
    method: 'POST',
    body: JSON.stringify({ title, body, category }),
  });

  return handleResponse(response);
}

/* =========================
   COMMENTS
========================= */

async function createComment({ threadId, content }) {
  const response = await fetchWithAuth(
    `${BASE_URL}/threads/${threadId}/comments`,
    {
      method: 'POST',
      body: JSON.stringify({ content }),
    },
  );

  return handleResponse(response);
}

/* =========================
   THREAD VOTES
========================= */

async function upVoteThread(threadId) {
  const response = await fetchWithAuth(
    `${BASE_URL}/threads/${threadId}/up-vote`,
    { method: 'POST' },
  );

  return handleResponse(response);
}

async function downVoteThread(threadId) {
  const response = await fetchWithAuth(
    `${BASE_URL}/threads/${threadId}/down-vote`,
    { method: 'POST' },
  );

  return handleResponse(response);
}

async function neutralVoteThread(threadId) {
  const response = await fetchWithAuth(
    `${BASE_URL}/threads/${threadId}/neutral-vote`,
    { method: 'POST' },
  );

  return handleResponse(response);
}

/* =========================
   COMMENT VOTES
========================= */

async function upVoteComment({ threadId, commentId }) {
  const response = await fetchWithAuth(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
    { method: 'POST' },
  );

  return handleResponse(response);
}

async function downVoteComment({ threadId, commentId }) {
  const response = await fetchWithAuth(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
    { method: 'POST' },
  );

  return handleResponse(response);
}

async function neutralVoteComment({ threadId, commentId }) {
  const response = await fetchWithAuth(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
    { method: 'POST' },
  );

  return handleResponse(response);
}

/* =========================
   LEADERBOARD
========================= */

async function getLeaderboards() {
  const response = await fetch(`${BASE_URL}/leaderboards`);
  return handleResponse(response);
}

const dicodingForumApi = {
  register,
  login,
  getOwnProfile,
  getAllUsers,
  getAllThreads,
  getThreadDetail,
  createThread,
  createComment,
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
  upVoteComment,
  downVoteComment,
  neutralVoteComment,
  getLeaderboards,
};

export { getAccessToken, putAccessToken };
export default dicodingForumApi;
