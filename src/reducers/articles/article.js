import { FETCH_ARTICLE } from '../../actions/types';

export const article = function (state = {}, action) {
  switch (action.type) {
    case FETCH_ARTICLE:
      // console.log('[FETCH_ARTICLE REDUCER]', action.payload);
      return action.payload;
    default:
      return state;
  }
}
