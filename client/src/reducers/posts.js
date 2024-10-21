import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH } from '../constants/actionTypes';

const initialState = {
  posts: [],
  currentPage: 1,
  numberOfPages: 1
};

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages
      };
    case FETCH_BY_SEARCH:
      return { 
        ...state, 
        posts: action.payload 
      };
    case CREATE:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      };
    case UPDATE:
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))
      };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload)
      };
    default:
      return state;
  }
}
