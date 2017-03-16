import { ListView } from 'react-native';
import {
  observable,
  action,
  computed,
  runInAction
} from 'mobx';
import { fetchReplies } from '../fetch';

export default class Store {

  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
  initDS = this.ds.cloneWithRows(this.replies.slice());

  @observable replies = [];
  @observable refreshing = false;

  @action.bound
  async fetchReplies(topicId) {
    this.refreshing = true;
    try {
      const replies = await fetchReplies(topicId);
      runInAction(() => {
        this.refreshing = false;
        this.replies = replies;
      });
    } catch (e) {
      this.refreshing = false;
    }
  }

  @action.bound
  async clearReplies() {
    this.replies = [];
  }

  @computed get dataSource() {
    return this.initDS.cloneWithRows(this.replies.slice());
  }
}