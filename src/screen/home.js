import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ListView,
  PixelRatio,
  TouchableHighlight
} from 'react-native';
import { observer } from 'mobx-react/native';
import Store from '../store';
import TopicItem from '../components/topic-item';

@observer
class HomeScreen extends Component {
  componentDidMount() {
    this.props.store.fetchTopics();
  }

  renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <TouchableHighlight
        key={rowData.id}
        underlayColor="#f1f1f1"
        onPress={() => highlightRow(sectionID, rowID)}>
        <View>
          <TopicItem showNode={true} rowData={rowData} />
        </View>
      </TouchableHighlight>
    );
  }

  renderSeparator(sectionID, rowID) {
    return (
      <View
        key={`separator-${sectionID}-${rowID}`}
        style={styles.separator}></View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    const { dataSource } = this.props.store;
    return (
      <ListView
        initialListSize={10}
        dataSource={dataSource}
        renderRow={this.renderRow}
        enableEmptySections={true}
        renderSeparator={this.renderSeparator} />
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: 'rgb(226, 226, 226)',
    height: 1 / PixelRatio.get()
  }
});

const store = new Store();

export default class extends Component {
  static navigationOptions = {
    title: 'V2EX'
  }

  render() {
    return (
      <HomeScreen store={store} {...this.props} />
    );
  }
}