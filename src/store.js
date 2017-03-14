import { ListView, AsyncStorage } from 'react-native';
import {
  observable,
  action,
  computed,
  reaction,
  runInAction
} from 'mobx';
import { fetchTopics } from './fetch';
import {
  EVENT_LOADING_TOPICS_SUCCESS,
  EVENT_LOADING_TOPICS_FAIL,
  CACHED_TOPICS_KEY
} from './constant';

export default class Store {
  eventEmitter;
  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
  initDS = this.ds.cloneWithRows(this.topics.slice());
  @observable topics = [];
  @observable refreshing = false;

  constructor(eventEmitter) {
    this.eventEmitter = eventEmitter;

    reaction(() => this.topicsToJS(), (jsTopics) => {
      AsyncStorage.setItem(CACHED_TOPICS_KEY, JSON.stringify(jsTopics));
    });
  }

  @computed get dataSource() {
    return this.initDS.cloneWithRows(this.topics.slice());
  }

  @action.bound
  async fetchTopics() {
    this.refreshing = true;
    try {
      const topics = await fetchTopics();
      runInAction(() => {
        this.refreshing = false;
        this.topics = topics;
      });
      this.eventEmitter.emit(EVENT_LOADING_TOPICS_SUCCESS);
    } catch (e) {
      this.refreshing = false;
      this.eventEmitter.emit(EVENT_LOADING_TOPICS_FAIL);
    }
  }

  @action.bound
  async fetchCachedTopics() {
    try {
      const jsTopics = await AsyncStorage.getItem(CACHED_TOPICS_KEY);
      const topics = JSON.parse(jsTopics);
      runInAction(() => {
        this.topics = topics;
      });
    } catch (e) {}
  }

  topicsToJS() {
    return this.topics.map((topic) => {
      return Object.keys(topic).reduce((obj, key) => {
        obj[key] = topic[key];
        return obj;
      }, {});
    });
  }
}