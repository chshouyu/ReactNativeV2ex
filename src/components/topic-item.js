import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image
} from 'react-native';
import { observer } from 'mobx-react/native';

@observer
export default class TopicItem extends Component {
  render() {
    const { rowData, showNode } = this.props;
    return (
      <View style={[styles.container, styles.item]}>
        <Image
          source={{uri: `https:${rowData.member.avatar_large}`}}
          style={styles.thumbnail}
        />
        <View style={styles.itemDetail}>
          <Text numberOfLines={2} style={styles.title}>{rowData.title}</Text>
          <View style={styles.info}>
            {showNode && (
              <View style={styles.nodeWrapper}>
                <Text style={styles.node}>{rowData.node.title}</Text>
              </View>
            )}
            {showNode && (
              <Text style={styles.infoDot}>·</Text>
            )}
            <Text style={styles.username}>{rowData.member.username}</Text>
          </View>
        </View>
        <View style={styles.repliesWrapper}>
          <Text style={styles.replies}>{rowData.replies}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    height: 80,
    paddingLeft: 10,
    paddingRight: 10
  },
  thumbnail: {
    width: 60,
    height: 60
  },
  itemDetail: {
    width: 0,
    flexGrow: 1,
    height: 60,
    marginLeft: 10
  },
  title: {
    lineHeight: 16,
    height: 32,
    color: '#778087'
  },
  info: {
    marginTop: 12,
    flexDirection: 'row'
  },
  nodeWrapper: {
    backgroundColor: 'rgb(226, 226, 226)',
    borderRadius: 2,
    paddingLeft: 2,
    paddingRight: 2,
  },
  node: {
    fontSize: 12,
    color: 'rgb(153, 153, 153)',
    fontFamily: 'arial'
  },
  infoDot: {
    marginLeft: 6,
    marginRight: 6,
    color: 'rgb(204, 204, 204)'
  },
  username: {
    fontSize: 12,
    color: 'rgb(119, 128, 135)',
    fontWeight: '700'
  },
  repliesWrapper: {
    width: 26,
    marginLeft: 10,
  },
  replies: {
    textAlign: 'center',
    backgroundColor: 'rgb(170, 176, 198)',
    color: '#fff',
    fontWeight: '700',
    fontSize: 12
  }
});