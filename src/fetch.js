import axios from 'axios';
import {
  REQUEST_LATEST_URL
} from './constant';

export async function fetchTopics() {
  const res = await axios(REQUEST_LATEST_URL, { timeout: 3000 });
  return res.data;
}