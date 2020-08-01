import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from '../actions/types';

//  Check token and load user
export const loadUser = () => (dispatch, getState) => {
  //  Initialize user loading
  dispatch({ type: USER_LOADING });

  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then(result => {
      dispatch({ type: USER_LOADED, payload: result.data });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

export const tokenConfig = getState => {
  //   get token from localStorage
  const token = getState().auth.token;

  //   Add token to the header
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //   add the token if present
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
