import axios from 'axios';
import { handleSuccess, handleError } from '../utils/axiosHandler';
import { authHeader } from '../utils/auth-header';

import config from '../config';
const apiUrl = config.apiUrl;

const model = 'sliders/';

const slidersService = {
  getAll,
};

function getAll() {
  const url = `${apiUrl}${model}`;
  console.log(url);
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.get(url, { headers: authHeader() });
}

export default slidersService;
