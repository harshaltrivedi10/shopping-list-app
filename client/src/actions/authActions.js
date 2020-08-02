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

//  Register user
export const register = ({ name, email, password }) => dispatch => {
  // headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // request data
  const body = JSON.stringify({ name, email, password });

  axios
    .post('/api/users', body, config)
    .then(result => {
      dispatch({ type: REGISTER_SUCCESS, payload: result.data });
    })
    .catch(error => {
      dispatch(
        returnErrors(
          error.response.data,
          error.response.status,
          'REGISTER_FAIL'
        )
      );
      dispatch({ type: REGISTER_FAIL });
    });
};

export const login = ({ email, password }) => dispatch => {
  // headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // request data
  const body = JSON.stringify({ email, password });

  axios
    .post('/api/auth', body, config)
    .then(result => {
      dispatch({ type: LOGIN_SUCCESS, payload: result.data });
    })
    .catch(error => {
      dispatch(
        returnErrors(error.response.data, error.response.status, 'LOGIN_FAIL')
      );
      dispatch({ type: LOGIN_FAIL });
    });
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
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
