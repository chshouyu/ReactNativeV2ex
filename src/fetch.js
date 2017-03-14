import {
  REQUEST_LATEST_URL
} from './constant';

export async function fetchTopics() {
  const res = await fetch(REQUEST_LATEST_URL);
  return await res.json();
}