import { FETCH_ADMIN_COLLAPSED } from '../../actions/types';

export const adminCollapsed = function (state = false, action) {
  switch (action.type) {
    case FETCH_ADMIN_COLLAPSED:
      // console.log('[FETCH_ADMIN_COLLAPSED REDUCER]', action.payload);
      return action.payload;
    default:
      return state;
  }
}
