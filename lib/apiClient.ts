import https from 'https';

import axios from 'axios';
import { parseCookies } from 'nookies';

import { API_URL } from '@/constants';

const instance = axios.create({
  baseURL: API_URL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

const { token } = parseCookies({});

if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default instance;
