import request from '../../utils/request';
import { createAlert } from '../../utils/alerts';
import {
    FETCH_ARTICLES,
    FETCH_ARTICLE,
} from '../types';

export const fetchArticles = () => async dispatch => {
    const res = await request('/articles', {
        method: 'get',
    });

    dispatch({ type: FETCH_ARTICLES, payload: res.data });
};

export const fetchArticle = (values) => async dispatch => {
    const res = await request(`/article/${values}`, {
        method: 'get',
    });

    dispatch({ type: FETCH_ARTICLE, payload: res.data });
};

export const deleteArticle = (id, history) => async dispatch => {
    const res = await request(`/articles/${id}`, {
        method: 'delete',
    });
  
    createAlert(res.data, history)
    dispatch({ type: FETCH_ARTICLES, payload: res.data.articles });
};