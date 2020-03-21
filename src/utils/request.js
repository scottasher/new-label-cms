import axios from 'axios';
import { getToken } from './authority';
import { ROOT_URL } from '../defaultSettings';
const ROOT = `${ROOT_URL}/api`;


export default function request(url, option) {
  const options = {
    baseURL: ROOT,
    ...option,
  };

  const headers = {
    headers: {
      Authorization: `Token ${getToken()}`,
    }
  }

  const newOptions = {
    ...options,
    ...headers,
  };

  // console.log('REQUEST',newOptions)

  return axios(url, newOptions)
    .then(res => {
      // console.log(res)
      return res;
    })
    .catch(err => console.log('REQUEST ERR', err))
}
