import request from '../../utils/request';
import { FETCH_USER, FETCH_LOADING } from '../types';
import { setAuthority, setToken } from '../../utils/authority';
import { createAlert } from '../../utils/alerts';

export const fetchUser = () => async dispatch => {
    let user;
    const res = await request('/users/current', {
        method: 'get',
    });
    console.log(res);
    // // setLocale('enUs');
    if(!res) {
        user = { user: { active: false } }
    } else {
        user = res.data
    }
    // console.log('FETCHUSER ACTION', user)
  
    // dispatch({ type: FETCH_USER, payload: user });
};

export const userLogin = (values, history, redirect) => async dispatch => {
    dispatch({ type: FETCH_LOADING, payload: true })
    const res = await request('/users/login', {
        method: 'post',
        data: values
    });
    if(!res.data.currentAuthority) {
        setAuthority('');
        setToken('');
        dispatch({ type: FETCH_LOADING, payload: false });
        return createAlert(res.data);
    } 
  
    setAuthority(res.data.currentAuthority);
    setToken(res.data.user.token);
    history.push('/dashboard');
    dispatch({ type: FETCH_LOADING, payload: false });
    dispatch({ type: FETCH_USER, payload: res.data });
};

