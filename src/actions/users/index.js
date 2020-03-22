import request from '../../utils/request';
import { FETCH_USER, FETCH_LOADING } from '../types';
import { setAuthority, setToken } from '../../utils/authority';
import { createAlert } from '../../utils/alerts';

export const fetchUser = () => async dispatch => {
    let user;
    const res = await request('/users/current', {
        method: 'get',
    });
  
    // // setLocale('enUs');
    if(!res.data) {
        user = { user: { active: false } }
    } else {
        user = res.data
    }
    // console.log('FETCHUSER ACTION', user)
  
    dispatch({ type: FETCH_USER, payload: user });
};

export const userLogin = (values, history, redirect) => async dispatch => {
    dispatch({ type: FETCH_LOADING, payload: true })
    const user = { user: values };
    const res = await request('/users/account', {
        method: 'post',
        data: user
    });
    
    if(!res.data.currentAuthority) {
        // console.log(res.data)
        setAuthority('');
        setToken('');
        dispatch({ type: FETCH_LOADING, payload: false })
        return createAlert(res.data) 
    } 
    // console.log('[TOKEN IN USER LOGIN ACTION]', res.data.user.token)
  
    setAuthority(res.data.currentAuthority);
    setToken(res.data.user.token);
    
    dispatch({ type: FETCH_USER, payload: res.data });
};

