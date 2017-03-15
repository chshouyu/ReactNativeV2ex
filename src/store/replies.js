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

  @action.bound
  async fetchReplies(topicId) {
    try {
      const replies = await fetchReplies(topicId);
      runInAction(() => {
        this.replies = replies;
      });
    } catch (e) {}
  }

  @computed get dataSource() {
    return this.initDS.cloneWithRows(this.replies.slice());
  }
}