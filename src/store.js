import { ListView, AsyncStorage } from 'react-native';
import {
  observable,
  action,
  computed,
  reaction,
  runInAction,
  intercept
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

    reaction(() => this.topicsToJS(), async (jsTopics) => {
      try {
        await AsyncStorage.setItem(CACHED_TOPICS_KEY, JSON.stringify(jsTopics));
      } catch (e) {}
    }, { delay: 100 });

    intercept(this, 'topics', change => {
      if (!change.newValue) {
        return null;
      }

      if (typeof change.newValue === 'string') {
        try {
          change.newValue = JSON.parse(change.newValue);
        } catch (e) {
          return null;
        }
      }

      if (Array.isArray(change.newValue)) {
        return change;
      }

      return null;
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
    const jsTopics = await AsyncStorage.getItem(CACHED_TOPICS_KEY);
    runInAction(() => {
      this.topics = jsTopics;
    });
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