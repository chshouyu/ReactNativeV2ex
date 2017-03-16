import { ListView } from 'react-native';
import {
  observable,
  action,
  computed,
  runInAction,
  intercept
} from 'mobx';
import { fetchReplies } from '../fetch';

export default class Store {

  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
  initDS = this.ds.cloneWithRows(this.replies.slice());

  @observable replies = [];
  @observable refreshing = false;

  constructor() {
    intercept(this, 'replies', change => {
      if (Array.isArray(change.newValue)) {
        return change;
      }
      throw new Error('replies format error');
    });
  }

  @action.bound
  async fetchReplies(topicId) {
    this.refreshing = true;
    try {
      const replies = await fetchReplies(topicId);
      runInAction(() => {
        this.replies = replies;
        this.refreshing = false;
      });
    } catch (e) {
      this.refreshing = false;
    }
  }

  @action.bound
  async clearReplies() {
    this.replies = [];
  }

  @computed get hasReply() {
    return this.replies.length > 0;
  }

  @computed get dataSource() {
    return this.initDS.cloneWithRows(this.replies.slice());
  }
}