import { GET_ITEMS, DELETE_ITEM, ADD_ITEM } from './types';

export const getItems = () => {
  return {
    type: GET_ITEMS,
  };
};
