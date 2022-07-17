import axios from 'axios';
import { handleSuccess, handleError } from '../utils/axiosHandler';
import { headerJson } from '../utils/auth-header';

import config from '../config';
const apiUrl = config.apiUrl;

const model = 'auth/';

const authService = {
  login,
  signup,
};

function login(dto) {
  const url = `${apiUrl}${model}login`;
  console.log(url);
  console.log(dto);
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.post(url, dto, { headers: headerJson() });
}

function signup(dto) {
  const url = `${apiUrl}${model}register/`;
  console.log(url);
  console.log(dto);
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.post(url, dto, { headers: headerJson() });
}

export default authService;
