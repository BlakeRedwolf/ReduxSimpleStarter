import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_POST:
      return _.omit(state, action.payload); // Looks @ state object & if it has a key of the posts id, just drop it (omit it) and return a new object with that post id not present anymore
      //return _.reject(state, post => post.id === action.payload); // if we a state object of an array it would look something like this
    case FETCH_POST:
    //  const post = action.payload.data;
    //  const newState = { ...state,  };
    //  newState[post.id] = post;
    //  return newState;
    return { ...state, [action.payload.data.id]: action.payload.data }; // This is identical to ^ the commented code
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id'); // we used mapKeys to treat our state object as a object rather then an array, action.payload.data, 'id' is helping us fetch only the post we are interested in
    default:
      return state;
  }
}