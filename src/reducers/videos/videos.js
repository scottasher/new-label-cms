import { FETCH_VIDEOS } from '../../actions/types';

export const videos = function (state = [], action) {
  switch (action.type) {
    case FETCH_VIDEOS:
      // console.log('[FETCH_VIDEOS REDUCER]', action.payload);
      return action.payload;
    default:
      return state;
  }
}