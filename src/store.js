import {
  observable,
  action
} from 'mobx';
import V4 from 'uuid/v4';
import { fetchTopics } from './fetch';

export default class Store {
  @observable topics = [];

  @action.bound
  async fetchTopics() {
    const topics = await fetchTopics();
    this.setTopics(topics);
  }

  @action
  setTopics(topics) {
    this.topics = topics;
  }
}