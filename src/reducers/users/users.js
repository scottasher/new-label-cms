import { FETCH_USERS } from '../../actions/types';

export const users =  function(state = [], action) {
  switch (action.type) {
    case FETCH_USERS:
      // console.log('[FETCH_USERS REDUCER]', action.payload);
      return action.payload;
    default:
      return state;
  }
}
