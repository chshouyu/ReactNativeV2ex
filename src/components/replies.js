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

  render() {
    const {
      refreshing,
      dataSource,
      hasReply
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
        {!refreshing && !hasReply &&
          <View style={styles.noReply}>
            <Text style={styles.noReplyText}>暂无回复</Text>
          </View>
        }
        {!refreshing && hasReply &&
          <ListView
            enableEmptySections={true}
            dataSource={dataSource}
            renderRow={this.renderRow.bind(this)}
            renderSeparator={this.renderSeparator}
            automaticallyAdjustContentInsets={false}
          />
        }
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
  },
  noReply: {
    marginTop: 20,
    marginBottom: 30
  },
  noReplyText: {
    color: '#BFBFBF',
    textAlign: 'center'
  }
});