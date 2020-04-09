import { FETCH_COLLAPSED, FETCH_ADMIN_COLLAPSED } from '../types';
import { createAlert } from '../../utils/alerts';
import request from '../../utils/request';

export const sideCollapse = values => dispatch => {
    dispatch({ type: FETCH_COLLAPSED, payload: values });
};

export const adminCollapse = values => dispatch => {
    dispatch({ type: FETCH_ADMIN_COLLAPSED, payload: values });
};

export const contactUs = () => async dispatch => {
    const res = await request('/contact-us', {
        method: 'get',
    }); 

    createAlert(res.data)
};