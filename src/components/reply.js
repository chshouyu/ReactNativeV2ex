import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image
} from 'react-native';
import { observer } from 'mobx-react/native';
import { formatTime } from '../util';

@observer
export default class Reply extends Component {
  render() {
    const rowData = this.props.rowData;
    return (
      <View style={[styles.container, styles.item]}>
        <Image
          source={{uri: `https:${rowData.member.avatar_normal}`}}
          style={styles.thumbnail}
        />
        <View style={styles.itemDetail}>
          <Text>
            <Text style={styles.username}>{rowData.member.username}</Text>
            {'  '}
            <Text style={styles.datetime}>{formatTime(rowData.last_modified)}</Text>
          </Text>
          <View style={styles.contentWrapper}>
            <Text style={styles.content}>{rowData.content}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  item: {
    paddingTop: 10,
    paddingBottom: 10
  },
  thumbnail: {
    width: 30,
    height: 30
  },
  itemDetail: {
    flex: 1,
    marginLeft: 10
  },
  username: {
    fontSize: 12,
    color: 'rgb(119, 128, 135)',
    fontWeight: '700'
  },
  datetime: {
    fontSize: 12,
    color: '#999',
    marginLeft: 8
  },
  contentWrapper: {
    marginTop: 4
  },
  content: {
    lineHeight: 20
  }
});