import { ListView } from 'react-native';
import {
  observable,
  action,
  computed
} from 'mobx';
import { fetchTopics } from './fetch';

export default class Store {
  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
  initDS = this.ds.cloneWithRows(this.topics.slice());
  @observable topics = [];
  @observable refreshing = false;

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
    }
  }

  @action
  setTopics(topics) {
    this.topics = topics;
    this.refreshing = false;
  }
}