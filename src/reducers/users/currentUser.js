import { FETCH_CURRENT_USER } from '../../actions/types';

export const currentUser =  function(state = {}, action) {
  switch (action.type) {
    case FETCH_CURRENT_USER:
      // console.log('[FETCH_CURRENT_USER REDUCER]', action.payload.user);
      return action.payload.user;
    default:
      return state;
  }
}
