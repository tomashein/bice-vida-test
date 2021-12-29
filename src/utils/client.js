import axios from 'axios';
import { sleep } from '@utils';

const Client = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

Client.interceptors.response.use(async (response) => {
  await sleep(import.meta.env.VITE_API_DELAY);
  return response;
});

export default Client;
