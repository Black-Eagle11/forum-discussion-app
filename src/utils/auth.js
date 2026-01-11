const ACCESS_TOKEN_KEY = 'accessToken';

function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function setAccessToken(token) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

function removeAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

function isAuthenticated() {
  return Boolean(getAccessToken());
}

export {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  isAuthenticated,
};
