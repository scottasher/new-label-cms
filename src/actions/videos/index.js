import request from '../../utils/request';
import { createAlert } from '../../utils/alerts';
import {
    FETCH_VIDEOS,
    FETCH_VIDEO,
    FETCH_LOADING
} from '../types';

export const fetchVideos = (author, count, status) => async dispatch => {
    dispatch({ type: FETCH_LOADING, payload: true})

    const res = await request(`/videos?${!author ? '' : "author=" + JSON.stringify(author)}${!count ? '' : "&count=" + count}${!status ? '' : "&status=" + status}`, {
        method: 'get',
    });

    dispatch({ type: FETCH_VIDEOS, payload: res.data });
    dispatch({ type: FETCH_LOADING, payload: false})
};

export const fetchVideo = (values) => async dispatch => {
    dispatch({ type: FETCH_LOADING, payload: true})

    const res = await request(`/videos/${values}`, {
        method: 'get',
    });
    // console.log(res)
    dispatch({ type: FETCH_VIDEO, payload: res.data });
    dispatch({ type: FETCH_LOADING, payload: false})
};

export const clearVideo = (history) => async dispatch => {
    dispatch({ type: FETCH_LOADING, payload: true})
    dispatch({ type: FETCH_VIDEO, payload: {} })
    dispatch({ type: FETCH_LOADING, payload: false})
}

export const clearVideos = (history) => async dispatch => {
    dispatch({ type: FETCH_LOADING, payload: true})
    dispatch({ type: FETCH_VIDEOS, payload: [] })
    dispatch({ type: FETCH_LOADING, payload: false})
}

export const createVideo = (values, history) => async dispatch => {
    dispatch({ type: FETCH_LOADING, payload: true})

    const res = await request('/videos', {
      method: 'post',
      data: values
    });
  
    await createAlert(res.data, history)
    dispatch({ type: FETCH_VIDEOS, payload: res.data.videos });
    dispatch({ type: FETCH_LOADING, payload: false })

};

export const updateVideo = (values, id, history) => async dispatch => {
    dispatch({ type: FETCH_LOADING, payload: true})

    const res = await request(`/videos/${id}`, {
        method: 'put',
        data: values
    });
  
    createAlert(res.data)
    dispatch({ type: FETCH_VIDEO, payload: res.data });
    dispatch({ type: FETCH_LOADING, payload: false})
};

export const deleteVideo = (id, history) => async dispatch => {
    const res = await request(`/videos/${id}`, {
        method: 'delete',
    });
  
    createAlert(res.data, history)
    dispatch({ type: FETCH_VIDEOS, payload: res.data.videos });
};