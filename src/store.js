import { ListView } from 'react-native';
import {
  observable,
  action,
  computed
} from 'mobx';
import V4 from 'uuid/v4';
import { fetchTopics } from './fetch';

export default class Store {
  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
  initDS = this.ds.cloneWithRows(this.topics.slice());
  @observable topics = [];

  @computed get dataSource() {
    return this.initDS.cloneWithRows(this.topics.slice());
  }

  @action.bound
  async fetchTopics() {
    try {
      const topics = await fetchTopics();
      this.setTopics(topics);
    } catch (e) {}
  }

  @action
  setTopics(topics) {
    this.topics = topics;
  }
}