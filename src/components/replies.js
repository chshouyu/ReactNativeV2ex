import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ListView,
  PixelRatio
} from 'react-native';
import { observer } from 'mobx-react/native';

@observer
export default class Replies extends Component {
  componentDidMount() {
    this.props.store.fetchReplies(this.props.topicId);
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          enableEmptySections={true}
          dataSource={this.props.store.dataSource}
          renderRow={this.renderRow.bind(this)}
          renderSeparator={this.renderSeparator}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    );
  }

  renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <View key={rowData.id}>
        <Text>{rowData.content}</Text>
      </View>
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
    justifyContent: 'center',
  },
  separator: {
    backgroundColor: 'rgb(226, 226, 226)',
    height: 1 / PixelRatio.get()
  }
});