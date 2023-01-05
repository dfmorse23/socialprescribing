import {QueryClient} from 'react-query'
import axios from 'axios'

axios.defaults.withCredentials = true;

export const API_URL = process.env.REACT_APP_API_URL

export const queryClient = new QueryClient();

export const checkAuth = async () => {
  const res = await axios.get(`${API_URL}/v2/auth/check`);
  return res.data;
};