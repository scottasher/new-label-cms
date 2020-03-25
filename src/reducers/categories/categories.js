import { FETCH_CATEGORIES } from '../../actions/types';

export const categories =  function(state = [], action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      // console.log('[FETCH_CATEGORIES REDUCER]', action.payload.categories);
      return action.payload.categories;
    default:
      return state;
  }
}
