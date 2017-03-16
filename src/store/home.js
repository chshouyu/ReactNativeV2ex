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
  EVENT_LOADING_TOPICS_SUCCESS,
  EVENT_LOADING_TOPICS_FAIL,
  CACHED_TOPICS_KEY
} from '../constant';

export default class Store {

  eventEmitter;
  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
  initDS = this.ds.cloneWithRows(this.topics.slice());
  appState = AppState.currentState;

  @observable topics = [];
  @observable refreshing = false;
  @observable loadingStatus = '';

  constructor(eventEmitter) {
    this.eventEmitter = eventEmitter;
    AppState.addEventListener('change', this.appStateChange.bind(this));

    reaction(() => toJS(this.topics), async (jsTopics) => {
      try {
        await AsyncStorage.setItem(CACHED_TOPICS_KEY, JSON.stringify(jsTopics));
      } catch (e) {}
    }, { delay: 5000 });

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

      throw new Error('fetch topics error');
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
    try {
      const topics = await fetchTopics();
      runInAction(() => {
        this.refreshing = false;
        this.topics = topics;
        this.loadingStatus = 'success';
      });
    } catch (e) {
      runInAction(() => {
        this.refreshing = false;
        this.loadingStatus = 'fail';
      });
    }
  }

  @action.bound
  async fetchCachedTopics() {
    try {
      const jsTopics = await AsyncStorage.getItem(CACHED_TOPICS_KEY);
      runInAction(() => {
        this.topics = jsTopics;
      });
    } catch (e) {}
  }
}