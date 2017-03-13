import {
  REQUEST_LATEST_URL
} from './constant';

export function fetchTopics() {
  return new Promise((resolve, reject) => {
    fetch(REQUEST_LATEST_URL)
      .then(res => res.json())
      .then(data => {
        resolve(data);
      }).catch((e) => reject(e));
  });
}