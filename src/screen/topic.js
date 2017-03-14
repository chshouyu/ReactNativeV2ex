import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableHighlight,
  PixelRatio
} from 'react-native';
import { formatTime } from '../util';

export default class extends Component {
  static navigationOptions = {
    title: '话题'
  }

  render() {
    const { state: { params: { rowData } } } = this.props.navigation;
    return (
      <ScrollView style={[styles.container, styles.wrapper]}>
        <View style={[styles.container, styles.titleContainer]}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{rowData.title}</Text>
            <View style={styles.info}>
              <Text style={styles.username}>{rowData.member.username}</Text>
              <Text style={styles.dot}>·</Text>
              <Text style={styles.datetime}>{formatTime(rowData.created)}</Text>
            </View>
          </View>
          <TouchableHighlight style={styles.thumbnailWrapper} onPress={null}>
            <Image
              source={{uri: `https:${rowData.member.avatar_large}`}}
              style={styles.thumbnail}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.contentWrapper}>
          <Text style={styles.content}>{rowData.content}</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  titleWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    lineHeight: 26,
  },
  info: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
  },
  username: {
    fontSize: 12,
    color: 'rgb(119, 128, 135)',
    fontWeight: '700'
  },
  dot: {
    marginLeft: 6,
    marginRight: 6,
    color: 'rgb(204, 204, 204)'
  },
  datetime: {
    fontSize: 12,
    color: '#999'
  },
  thumbnailWrapper: {
    width: 60,
    height: 60,
    marginLeft: 10
  },
  thumbnail: {
    width: 60,
    height: 60
  },
  contentWrapper: {
    marginBottom: 20
  },
  content: {
    lineHeight: 22,
  }
});