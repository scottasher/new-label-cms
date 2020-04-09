import request from '../../utils/request';
import { createAlert } from '../../utils/alerts';
import {
    FETCH_ARTICLES,
    FETCH_ARTICLE,
    FETCH_LOADING
} from '../types';

export const fetchArticles = (author, count, status) => async dispatch => {
    dispatch({ type: FETCH_LOADING, payload: true})

    const res = await request(`/articles?${!author ? '' : "author=" + JSON.stringify(author)}${!count ? '' : "&count=" + count}${!status ? '' : "&status=" + status}`, {
        method: 'get',
    });

    dispatch({ type: FETCH_ARTICLES, payload: res.data });
    dispatch({ type: FETCH_LOADING, payload: false})
};

export const fetchArticle = (values) => async dispatch => {
    dispatch({ type: FETCH_LOADING, payload: true})

    const res = await request(`/articles/${values}`, {
        method: 'get',
    });
    // console.log(res)
    dispatch({ type: FETCH_ARTICLE, payload: res.data });
    dispatch({ type: FETCH_LOADING, payload: false})
};

export const clearArticle = (history) => async dispatch => {
    dispatch({ type: FETCH_LOADING, payload: true})
    dispatch({ type: FETCH_ARTICLE, payload: {} })
    dispatch({ type: FETCH_LOADING, payload: false})
}

export const createArticle = (values, history) => async dispatch => {
    dispatch({ type: FETCH_LOADING, payload: true})

    const res = await request('/articles', {
      method: 'post',
      data: values
    });
  
    await createAlert(res.data, history)
    dispatch({ type: FETCH_ARTICLES, payload: res.data.articles });
    dispatch({ type: FETCH_LOADING, payload: false })

};

export const updateArticle = (values, id, history) => async dispatch => {
    dispatch({ type: FETCH_LOADING, payload: true})

    const res = await request(`/articles/${id}`, {
        method: 'put',
        data: values
    });
  
    createAlert(res.data)
    dispatch({ type: FETCH_ARTICLE, payload: res.data });
    dispatch({ type: FETCH_LOADING, payload: false})
};

export const deleteArticle = (id, history) => async dispatch => {
    const res = await request(`/articles/${id}`, {
        method: 'delete',
    });
  
    createAlert(res.data, history)
    dispatch({ type: FETCH_ARTICLES, payload: res.data.articles });
};