import { ListView, AsyncStorage, AppState } from 'react-native';
import {
  observable,
  action,
  computed,
  reaction,
  runInAction,
  intercept,
  toJS
} from 'mobx';
import { fetchTopics } from '../fetch';
import {
  EVENT_LOADING_STATUS,
  CACHED_TOPICS_KEY
} from '../constant';

export default class Store {

  eventEmitter;
  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
  initDS = this.ds.cloneWithRows(this.topics.slice());
  appState = AppState.currentState;
  source = '';
  MAX_CACHE_LENGTH = 10;

  @observable topics = [];
  @observable refreshing = false;

  constructor(eventEmitter) {
    this.eventEmitter = eventEmitter;
    AppState.addEventListener('change', this.appStateChange.bind(this));

    reaction(() => toJS(this.topics), async (jsTopics) => {
      if (this.source === 'online' && jsTopics.length > 0) {
        try {
          await AsyncStorage.setItem(CACHED_TOPICS_KEY, JSON.stringify(jsTopics.slice(0, this.MAX_CACHE_LENGTH)));
          this.source = '';
        } catch (e) {}
      }
    }, { delay: 1000 });

    intercept(this, 'topics', change => {
      if (!change.newValue) {
        return null;
      }

      if (typeof change.newValue === 'string') {
        change.newValue = JSON.parse(change.newValue);
      }

      if (Array.isArray(change.newValue)) {
        return change;
      }

      throw new Error('topics format error');
    });
  }

  appStateChange(nextAppState) {
    if (this.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.fetchTopics();
    }
    this.appState = nextAppState;
  }

  @computed get dataSource() {
    return this.initDS.cloneWithRows(this.topics.slice());
  }

  @action.bound
  async fetchTopics() {
    this.refreshing = true;
    this.source = 'online';
    try {
      const topics = await fetchTopics();
      runInAction(() => {
        this.topics = topics;
        this.refreshing = false;
      });
      this.eventEmitter.emit(EVENT_LOADING_STATUS, 'success');
    } catch (e) {
      runInAction(() => {
        this.refreshing = false;
      });
      this.eventEmitter.emit(EVENT_LOADING_STATUS, 'fail');
    }
  }

  @action.bound
  async fetchCachedTopics() {
    this.source = 'cache';
    try {
      const jsTopics = await AsyncStorage.getItem(CACHED_TOPICS_KEY);
      runInAction(() => {
        this.topics = jsTopics;
      });
    } catch (e) {}
  }
}