import axios from 'axios';
import {
  REQUEST_LATEST_URL,
  REQUEST_TOPIC_REPLIES,
  REQUEST_TOPIC,
  USER_AGENT
} from './constant';
import { topicsParser } from './parser';

export async function fetchTopics() {
  const res = await axios(REQUEST_LATEST_URL, {
    timeout: 7000,
    responseType: 'text',
    headers: {
      'User-Agent': USER_AGENT
    }
  });
  return topicsParser(res.data);
}

export async function fetchReplies(topicId) {
  const res = await axios(REQUEST_TOPIC_REPLIES, {
    timeout: 7000,
    params: {
      topic_id: topicId,
      _t: Date.now()
    }
  });
  return res.data;
}

export async function fetchTopic(topicId) {
  const res = await axios(REQUEST_TOPIC, {
    timeout: 7000,
    params: {
      id: topicId
    }
  });
  return res.data;
}