import {
  GET_ITEMS,
  DELETE_ITEM,
  ADD_ITEM,
  ITEM_LOADING,
} from '../actions/types';
const initialState = {
  items: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case DELETE_ITEM:
      const items = state.items.filter(item => item._id !== action.payload);
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
    case ITEM_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
