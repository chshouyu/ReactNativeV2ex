import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ListView,
  PixelRatio,
  TouchableHighlight,
  RefreshControl
} from 'react-native';
import { observer } from 'mobx-react/native';
import EventEmitter from 'eventemitter3';
import Store from '../store';
import TopicItem from '../components/topic-item';
import {
  EVENT_LOADING_TOPICS_SUCCESS,
  EVENT_LOADING_TOPICS_FAIL
} from '../constant';

@observer
class HomeScreen extends Component {
  componentDidMount() {
    this.initEventEmitter();
    this.initTopics();
  }

  componentWillUnmount() {
    const eventEmitter = this.props.eventEmitter;
    eventEmitter.removeListener(EVENT_LOADING_TOPICS_SUCCESS, this.onLoadingSuccess);
    eventEmitter.removeListener(EVENT_LOADING_TOPICS_FAIL, this.onLoadingFail);
  }

  initEventEmitter() {
    const eventEmitter = this.props.eventEmitter;
    eventEmitter.on(EVENT_LOADING_TOPICS_SUCCESS, this.onLoadingSuccess);
    eventEmitter.on(EVENT_LOADING_TOPICS_FAIL, this.onLoadingFail);
  }

  onLoadingSuccess() {}

  onLoadingFail() {}

  async initTopics() {
    const { fetchTopics, fetchCachedTopics } = this.props.store;
    await fetchCachedTopics();
    fetchTopics();
  }

  renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <TouchableHighlight
        key={rowData.id}
        underlayColor="#f1f1f1"
        onPress={() => {
          highlightRow(sectionID, rowID)
          this.gotoTopic(rowData);
        }}>
        <View>
          <TopicItem showNode={true} rowData={rowData} />
        </View>
      </TouchableHighlight>
    );
  }

  gotoTopic(rowData) {
    const { navigate } = this.props.navigation;
    navigate('Topic', { rowData });
  }

  renderSeparator(sectionID, rowID) {
    return (
      <View
        key={`separator-${sectionID}-${rowID}`}
        style={styles.separator}></View>
    );
  }

  render() {
    const {
      dataSource,
      refreshing,
      fetchTopics
    } = this.props.store;
    return (
      <ListView
        initialListSize={20}
        dataSource={dataSource}
        renderRow={this.renderRow.bind(this)}
        enableEmptySections={true}
        renderSeparator={this.renderSeparator}
        refreshControl={
          <RefreshControl
            title="加载中..."
            onRefresh={fetchTopics}
            refreshing={refreshing} />
        } />
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: 'rgb(226, 226, 226)',
    height: 1 / PixelRatio.get()
  }
});

const ee = new EventEmitter();
const store = new Store(ee);

export default class extends Component {
  static navigationOptions = {
    title: 'V2EX'
  }

  render() {
    return (
      <HomeScreen eventEmitter={ee} store={store} {...this.props} />
    );
  }
}