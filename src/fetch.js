import axios from 'axios';
import {
  REQUEST_LATEST_URL,
  REQUEST_TOPIC_REPLIES
} from './constant';

export async function fetchTopics() {
  const res = await axios(REQUEST_LATEST_URL, { timeout: 3000 });
  return res.data;
}

export async function fetchReplies(topicId) {
  const res = await axios(REQUEST_TOPIC_REPLIES, {
    timeout: 3000,
    params: {
      topic_id: topicId,
      page_size: 100,
      _t: Date.now()
    }
  });
  return res.data;
}