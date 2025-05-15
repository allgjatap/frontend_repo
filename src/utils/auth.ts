import { StorageKey, storage } from './storage';

const jwtTokenName = StorageKey.ACCESS_TOKEN;

export const setToken = (
  token: string,
  // rememberMe = false
) => {
  // if (rememberMe) {
  storage.setItem(jwtTokenName, token);
  // } else {
  // sessionStorage.setItem(jwtTokenName, token);
  // }
};

export const getToken = () => storage.getItem('accessToken'); //JSON.parse(localStorage.getItem('activeUser') || '').access_token || '';

export const removeToken = () => {
  localStorage.removeItem(jwtTokenName);
  sessionStorage.removeItem(jwtTokenName);
};

export const hasTokens = () => !!getToken();

export const isAuthenticated = (): boolean => {
  // Check whether the current time is past the
  // access token's expiry time
  // let expiresAt = "";
  let token: string | null = '';
  try {
    token = storage.getItem(jwtTokenName);
    // JSON.parse(localStorage.getItem("activeUser") || "0").expires_at || "0";
    // JSON.parse(localStorage.getItem('activeUser') || '').access_token || '';
  } catch (error) {
    /** Do nothing **/
    console.log(error);
  }

  // return new Date().getTime() < Number(expiresAt);
  return !!token;
};

export const setUserSession = (user: unknown) => {
  localStorage.setItem('activeUser', JSON.stringify(user));
};