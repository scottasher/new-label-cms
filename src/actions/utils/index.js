import { FETCH_COLLAPSED, FETCH_CONTACT_RE } from '../types';
import { createAlert } from '../../utils/alerts';
import request from '../../utils/request';

export const sideCollapse = values => dispatch => {
    dispatch({ type: FETCH_COLLAPSED, payload: values });
};

export const contactUs = values => async dispatch => {
    const res = await request('/articles', {
        method: 'get',
    }); 

    createAlert(res.data)
};