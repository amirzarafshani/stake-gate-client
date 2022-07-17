import axios from 'axios';
import { handleSuccess, handleError } from '../utils/axiosHandler';
import { authHeaderJson, authHeader } from '../utils/auth-header';

import config from '../config';
const apiUrl = config.apiUrl;

const model = 'profile/';

const profileService = {
  get,
  update,
  getUserInfo,
  getUserReferrals,
  deposit,
  withdraw,
  getPlans
};

function get() {
  const url = `${apiUrl}${model}`;
  console.log(url);
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.get(url, { headers: authHeaderJson() });
}

function update(dto) {
  const url = `${apiUrl}${model}`;
  console.log(dto);
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.put(url, dto, { headers: authHeaderJson() });
}

function getUserInfo() {
  const url = `${apiUrl}profile`;
  console.log(url);
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.get(url, { headers: authHeader() });
}

function getUserReferrals() {
  const url = `${apiUrl}referrals`;
  console.log(url);
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.get(url, { headers: authHeader() });
}

function deposit(dto) {
  const url = `${apiUrl}deposit`;
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.post(url, dto, { headers: authHeaderJson() });
}

function withdraw(dto) {
  const url = `${apiUrl}withdraw`;
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.post(url, dto, { headers: authHeaderJson() });
}

function getPlans() {
  const url = `${apiUrl}${model}plans`;
  axios.interceptors.response.use(handleSuccess, handleError);
  return axios.get(url, { headers: authHeader() });
}

export default profileService;
