import { FETCH_COLLAPSED } from '../../actions/types';

export const collapsed = function (state = false, action) {
  switch (action.type) {
    case FETCH_COLLAPSED:
      // console.log('[FETCH_COLLAPSED REDUCER]', action.payload);
      return action.payload;
    default:
      return state;
  }
}
