import {QueryClient} from 'react-query'
import axios from 'axios'

axios.defaults.withCredentials = true;

export const queryClient = new QueryClient();

export const checkAuth = async () => {
  const res = await axios.get(`/v2/auth/check`);
  return res.data;
};