import request from '../../utils/request';
import { FETCH_CATEGORIES } from '../types';
import { createAlert } from '../../utils/alerts';
export const fetchCategories = () => async dispatch => {
    const res = await request('/categories', {
        method: 'get',
    });

    dispatch({ type: FETCH_CATEGORIES, payload: res.data });
};

export const createCategory = (values) => async dispatch => {
    const res = await request('/categories', {
        method: 'post',
        data: { name: values }
    });

    createAlert(res.data)
    dispatch({ type: FETCH_CATEGORIES, payload: res.data });
};