import { ListView } from 'react-native';
import {
  observable,
  action,
  computed,
  runInAction,
  intercept
} from 'mobx';
import { fetchReplies, fetchTopic } from '../fetch';

export default class Store {

  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
  initDS = this.ds.cloneWithRows(this.replies.slice());

  @observable topic = null;
  @observable replies = [];
  @observable topicRefreshing = false;
  @observable repliesRefreshing = false;

  constructor() {
    intercept(this, 'replies', change => {
      if (Array.isArray(change.newValue)) {
        return change;
      }
      throw new Error('replies format error');
    });

    intercept(this, 'topic', change => {
      if (!change.newValue) {
        return null;
      }

      if (typeof change.newValue === 'object') {
        return change;
      }

      throw new Error('topic format error');
    });
  }

  @action.bound
  async fetchReplies(topicId) {
    this.repliesRefreshing = true;
    try {
      const replies = await fetchReplies(topicId);
      runInAction(() => {
        this.replies = replies.map((reply, index) => {
          reply.floor = index + 1;
          reply.is_author = this.topic ? this.topic.member.username === reply.member.username : false
          return reply;
        });
        this.repliesRefreshing = false;
      });
    } catch (e) {
      this.repliesRefreshing = false;
    }
  }

  @action.bound
  async fetchTopic(topicId) {
    this.topicRefreshing = true;
    try {
      const topic = await fetchTopic(topicId);
      runInAction(() => {
        this.topic = topic[0];
        this.topicRefreshing = false;
      });
    } catch (e) {
      this.topicRefreshing = false;
    }
  }

  @computed get hasReply() {
    return this.replies.length > 0;
  }

  @computed get dataSource() {
    return this.initDS.cloneWithRows(this.replies.slice());
  }
}