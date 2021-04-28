import { AUTH_SUCCESS, AUTH_ERROR } from "./authTypes";

export function authSuccess(user) {
  return {
    type: AUTH_SUCCESS,
    payload: user,
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}
