import request from '../../utils/request';
import { createAlert } from '../../utils/alerts';
import {
    FETCH_ARTICLES,
    FETCH_ARTICLE,
    FETCH_LOADING
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

export const uploadArticle = (values, history) => async dispatch => {
    dispatch({ type: FETCH_LOADING, payload: true})
    const { body, category, extra1, extra2, tags, textSnippet, title, articleImage } = values
    
    let imagePath;

    if(!articleImage) {
      imagePath = null
    } else {
      imagePath = values.articleImage[0].name;
    }
    const newValues = { body, category, extra1, extra2, tags, textSnippet, title, imagePath };
  
    const res = await request('/articles', {
      method: 'post',
      data: newValues
    });
    dispatch({ type: FETCH_LOADING, payload: false })
  
    await createAlert(res.data, history)
    
    dispatch({ type: FETCH_ARTICLES, payload: res.data.articles });
};

export const deleteArticle = (id, history) => async dispatch => {
    const res = await request(`/articles/${id}`, {
        method: 'delete',
    });
  
    createAlert(res.data, history)
    dispatch({ type: FETCH_ARTICLES, payload: res.data.articles });
};