import { FETCH_USER } from '../../actions/types';

export const user =  function(state = {}, action) {
  switch (action.type) {
    case FETCH_USER:
      // console.log('[FETCH_USER REDUCER]', action.payload.user);
      return action.payload.user;
    default:
      return state;
  }
}
