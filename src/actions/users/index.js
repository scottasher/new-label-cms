import request from '../../utils/request';
import { FETCH_CURRENT_USER, FETCH_LOADING, FETCH_USERS, FETCH_USER } from '../types';
import { setAuthority, setToken } from '../../utils/authority';
import { createAlert } from '../../utils/alerts';
import { parseQuery } from '../../utils';

export const fetchUser = (values) => async dispatch => {
    dispatch({ type: FETCH_LOADING, payload: true })
    let user;
    const res = await request(`/users/${values}`, {
        method: 'get',
    });
    // console.log(res);
    // // setLocale('enUs');
    if(!res) {
        user = { user: {  } }
    } else {
        user = res.data
    }
    // console.log('FETCHUSER ACTION', user)
  
    dispatch({ type: FETCH_USER, payload: user });
    dispatch({ type: FETCH_LOADING, payload: false })
};

export const fetchCurrentUser = () => async dispatch => {
    dispatch({ type: FETCH_LOADING, payload: true })

    let user;
    const res = await request('/users/current', {
        method: 'get',
    });
    // console.log(res);
    // // setLocale('enUs');
    if(!res) {
        user = { user: { active: false } }
    } else {
        user = res.data
    }
    // console.log('FETCHUSER ACTION', user)
  
    dispatch({ type: FETCH_CURRENT_USER, payload: user });
    dispatch({ type: FETCH_LOADING, payload: false })
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
    dispatch({ type: FETCH_CURRENT_USER, payload: res.data });
};

export const userLogout = history => async dispatch => {
    const res = { user: { active: false } }
    setToken('');
    setAuthority('');
    history.push('/');
    dispatch({ type: FETCH_CURRENT_USER, payload: res });
};

export const forgotPassword = values => async dispatch => {
    dispatch({ type: FETCH_LOADING, payload: true})

    const res = await request('/users/password/reset/request', {
        method: 'post',
        data: values
    });

    createAlert(res.data)
    dispatch({ type: FETCH_CURRENT_USER, payload: res.data });
    dispatch({ type: FETCH_LOADING, payload: false})
}

export const changePassword = (values, token, history) => async dispatch => {
    setToken(parseQuery(token).token);

    dispatch({ type: FETCH_LOADING, payload: true});

    const res = await request(`/users/password/reset`, {
        method: 'put',
        data: values
    });
    setToken('');
    createAlert(res.data, history);
    dispatch({ type: FETCH_LOADING, payload: false});
    // return dispatch({ type: FETCH_CURRENT_USER, payload: res.data });
}

export const fetchUsers = count => async dispatch => {
    dispatch({ type: FETCH_LOADING, payload: true})

    const res = await request(`/users?${!count ? '' : "&count=" + count}`, {
        method: 'get',
    });
    
    dispatch({ type: FETCH_LOADING, payload: false})
    return dispatch({ type: FETCH_USERS, payload: res.data });
}

export const updateUser = (values) => async dispatch => {
    const res = await request(`/users/${values.id}`, {
        method: 'put',
        data: values
    });

    return dispatch({ type: FETCH_USERS, payload: res.data });
}

export const createUser = (values, history) => async dispatch => {
    dispatch({ type: FETCH_LOADING, payload: true })

    const res = await request('/users', {
        method:'post',
        data: { user: values }
    });

    dispatch({ type: FETCH_LOADING, payload: false });
    createAlert(res.data, history);
    dispatch({ type: FETCH_USERS, payload: res.data.users });
}

export const deleteUser = (id) => async dispatch => {
    dispatch({ type: FETCH_LOADING, payload: true })

    const res = await request(`/users/${id}`, {
        method: 'delete',
    });

    dispatch({ type: FETCH_LOADING, payload: false });
    createAlert(res.data);
    dispatch({ type: FETCH_USERS, payload: res.data.users });
}

export const clearUser = () => async dispatch => {
    dispatch({ type: FETCH_LOADING, payload: true})
    dispatch({ type: FETCH_USER, payload: {user: {}} })
    dispatch({ type: FETCH_LOADING, payload: false})
}

export const resendVerifyEmail = (id) => async dispatch => {
    dispatch({ type: FETCH_LOADING, payload: true });
    const res = await request(`/users/resend/verify/${id}`, {
        method: 'get',
    });

    createUser(res.data)
    dispatch({ type: FETCH_USER, payload: res.data });
    dispatch({ type: FETCH_LOADING, payload: false });
}

