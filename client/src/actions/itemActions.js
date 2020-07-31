import axios from 'axios';
import { GET_ITEMS, DELETE_ITEM, ADD_ITEM, ITEM_LOADING } from './types';

export const getItems = () => dispatch => {
  dispatch(setItemLoading());
  axios.get('/api/items').then(result =>
    dispatch({
      type: GET_ITEMS,
      payload: result.data,
    })
  );
};

export const addItem = item => dispatch => {
  axios.post('/api/items', item).then(result =>
    dispatch({
      type: ADD_ITEM,
      payload: result.data,
    })
  );
};

export const deleteItem = id => dispatch => {
  axios.post(`/api/items/${id}`).then(result =>
    dispatch({
      type: DELETE_ITEM,
      payload: id,
    })
  );
};

export const setItemLoading = () => {
  return {
    type: ITEM_LOADING,
  };
};
