import { ListView } from 'react-native';
import {
  observable,
  action,
  computed
} from 'mobx';
import { fetchTopics } from './fetch';
import {
  EVENT_LOADING_TOPICS_SUCCESS,
  EVENT_LOADING_TOPICS_FAIL
} from './constant';

export default class Store {
  eventEmitter;
  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
  initDS = this.ds.cloneWithRows(this.topics.slice());
  @observable topics = [];
  @observable refreshing = false;

  constructor(eventEmitter) {
    this.eventEmitter = eventEmitter;
  }

  @computed get dataSource() {
    return this.initDS.cloneWithRows(this.topics.slice());
  }

  @action.bound
  async fetchTopics() {
    this.refreshing = true;
    try {
      const topics = await fetchTopics();
      this.setTopics(topics);
    } catch (e) {
      this.refreshing = false;
      this.eventEmitter.emit(EVENT_LOADING_TOPICS_FAIL);
    }
  }

  @action
  setTopics(topics) {
    this.refreshing = false;
    this.topics = topics;
    this.eventEmitter.emit(EVENT_LOADING_TOPICS_SUCCESS);
  }
}