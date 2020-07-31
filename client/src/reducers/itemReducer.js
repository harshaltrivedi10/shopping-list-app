import { v4 as uuid } from 'uuid';
import { GET_ITEMS, DELETE_ITEM, ADD_ITEM } from '../actions/types';
const initialState = {
  items: [
    { id: uuid(), name: 'Eggs' },
    { id: uuid(), name: 'Milk' },
    { id: uuid(), name: 'Bread' },
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
      };
    case DELETE_ITEM:
      const items = state.items.filter(item => item.id !== action.payload);
      state.items = items;
      return {
        ...state,
      };
    case ADD_ITEM:
      const newItems = [action.payload, ...state.items];
      state.items = newItems;
      return {
        ...state,
      };
    default:
      return state;
  }
}
