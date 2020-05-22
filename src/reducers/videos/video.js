import { FETCH_VIDEO } from '../../actions/types';

export const video = function (state = {}, action) {
  switch (action.type) {
    case FETCH_VIDEO:
      // console.log('[FETCH_VIDEO REDUCER]', action.payload);
      return action.payload;
    default:
      return state;
  }
}
