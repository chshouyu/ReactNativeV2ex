'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image
} = React;

var DetailView = React.createClass({
  render () {

    var item = this.props.item;
    var dateTime = this.formatTime(item.created);

    return (
      <ScrollView style={[styles.container, styles.wrapper]}>
        <View style={[styles.container, styles.titleContainer]}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{ item.title }</Text>
            <View style={styles.info}>
              <Text style={styles.username}>{ item.member.username }</Text>
              <Text style={styles.dot}>·</Text>
              <Text style={styles.datetime}>{ dateTime }</Text>
            </View>
          </View>
          <Image
            source={{uri: `http:${ item.member.avatar_normal }`}}
            style={styles.thumbnail}
          />
        </View>
        <View style={styles.contentWrapper}>
          <Text style={styles.content}>{ item.content }</Text>
        </View>
      </ScrollView>
    );
  },
  formatTime (timestamp) {
    var date = new Date(timestamp * 1000);
    var year = date.getFullYear();
    var mon = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    return `${year}-${mon}-${day} ${hour}:${min}:${sec}`;
  }
});

var styles = StyleSheet.create({
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
    borderBottomWidth: 1,
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
  thumbnail: {
    width: 60,
    height: 60,
    marginLeft: 10
  },
  contentWrapper: {
    marginBottom: 20
  },
  content: {
    lineHeight: 22,
  }
});

module.exports = DetailView;