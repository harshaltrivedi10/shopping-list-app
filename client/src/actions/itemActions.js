import axios from 'axios';
import { GET_ITEMS, DELETE_ITEM, ADD_ITEM, ITEM_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getItems = () => dispatch => {
  dispatch(setItemLoading());
  axios
    .get('/api/items')
    .then(result =>
      dispatch({
        type: GET_ITEMS,
        payload: result.data,
      })
    )
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
    });
};

export const addItem = item => (dispatch, getState) => {
  console.log(tokenConfig(getState));
  axios
    .post('/api/items', item, tokenConfig(getState))
    .then(result => {
      console.log(result.data);
      dispatch({
        type: ADD_ITEM,
        payload: result.data,
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
    });
};

export const deleteItem = id => (dispatch, getState) => {
  console.log(tokenConfig(getState));
  axios
    .post(`/api/items/${id}`, tokenConfig(getState))
    .then(result => {
      console.log(result.data);
      dispatch({
        type: DELETE_ITEM,
        payload: id,
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
    });
};

export const setItemLoading = () => {
  return {
    type: ITEM_LOADING,
  };
};
