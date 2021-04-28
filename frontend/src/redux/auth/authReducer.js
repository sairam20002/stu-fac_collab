import { AUTH_SUCCESS, AUTH_ERROR } from "./authTypes";

const initialState = {
  loading: false,
  user: {},
  error: "",
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        error: "",
      };
    case AUTH_ERROR:
      return {
        loading: false,
        user: {},
        error: action.payload,
      };
    default:
      return state;
  }
}

export default authReducer;
