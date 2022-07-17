import axios from 'axios';
import { handleSuccess, handleError } from '../utils/axiosHandler';
import { authHeaderJson, authHeader } from '../utils/auth-header';

import config from '../config';
const apiUrl = config.apiUrl;

const model = 'plans/';

const plansServicce = {
  getAll
};


function getAll() {
  const url = `${apiUrl}${model}`;
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.get(url);
}

export default plansServicce;
