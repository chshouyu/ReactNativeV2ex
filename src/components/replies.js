import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ListView,
  PixelRatio,
  ActivityIndicator
} from 'react-native';
import { observer } from 'mobx-react/native';
import Reply from './reply';

@observer
export default class Replies extends Component {
  componentDidMount() {
    this.props.store.fetchReplies(this.props.topicId);
  }

  componentWillUnmount() {
    this.props.store.clearReplies();
  }

  render() {
    const {
      refreshing,
      dataSource
    } = this.props.store;
    return (
      <View style={styles.container}>
        {refreshing &&
          <View style={styles.loading}>
            <ActivityIndicator
              animating={refreshing}
              size="small"
            />
          </View>
        }
        <ListView
          enableEmptySections={true}
          dataSource={dataSource}
          renderRow={this.renderRow.bind(this)}
          renderSeparator={this.renderSeparator}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    );
  }

  renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <Reply key={rowData.id} rowData={rowData} />
    );
  }

  renderSeparator(sectionID, rowID) {
    return (
      <View
        key={`separator-${sectionID}-${rowID}`}
        style={styles.separator}></View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  separator: {
    backgroundColor: '#DCDCDC',
    height: 1 / PixelRatio.get()
  }
});