import { FETCH_ARTICLES } from '../../actions/types';

export const articles = function (state = [], action) {
  switch (action.type) {
    case FETCH_ARTICLES:
      // console.log('[FETCH_ARTICLES REDUCER]', action.payload);
      return action.payload;
    default:
      return state;
  }
}