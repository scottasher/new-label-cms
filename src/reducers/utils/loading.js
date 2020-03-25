import { FETCH_LOADING } from '../../actions/types';

export const loading = function (state = false, action) {
  switch (action.type) {
    case FETCH_LOADING:
      // console.log('[FETCH_LOADING REDUCER]', action.payload);
      return action.payload;
    default:
      return state;
  }
}
