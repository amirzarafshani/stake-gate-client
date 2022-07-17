import axios from 'axios';
import { handleSuccess, handleError } from '../utils/axiosHandler';
import { authHeaderJson, authHeader } from '../utils/auth-header';

import config from '../config';
const apiUrl = config.apiUrl;

const model = 'assets/';

const assetsService = {
  add,
  getAssets,
};


function add(dto) {
  const url = `${apiUrl}${model}`;
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.post(url, dto, { headers: authHeaderJson() });
}

function getAssets(page, page_size) {
  const url = `${apiUrl}${model}?page=${page}&page_size=${page_size}`;
  console.log(url);
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.get(url, { headers: authHeader() });
}

export default assetsService;
