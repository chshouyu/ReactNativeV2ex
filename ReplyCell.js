'use strict';

var React = require('react-native');

var Util = require('./Util');

var {
  StyleSheet,
  Text,
  View,
  Image,
  PixelRatio,
  ListView
} = React;

var {
  formatTime
} = Util;

var ReplyCell = React.createClass({
  render () {

    var item = this.props.item;

    return (
      <View style={[styles.container, styles.item]}>
        <Image
          source={{uri: `http:${ item.member.avatar_normal }`}}
          style={styles.thumbnail}
        />
        <View style={styles.itemDetail}>
          <Text>
            <Text style={styles.username}>{ item.member.username }</Text>
            {'  '}
            <Text style={styles.datetime}>{ formatTime(item.last_modified) }</Text>
          </Text>
          <View style={styles.contentWrapper}>
            <Text style={styles.content}>{ item.content }</Text>
          </View>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
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

module.exports = ReplyCell;