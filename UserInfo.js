'use strict';

var React = require('react-native');

var Util = require('./Util');

var Loading = require('./Loading');

var {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  PixelRatio
} = React;

var {
  formatTime
} = Util;

var REQUEST_URL = 'https://www.v2ex.com/api/members/show.json';

var UserInfoView = React.createClass({
  getInitialState () {
    return {
      userInfo: null
    };
  },
  componentDidMount () {
    var id = this.props.memberId;
    fetch(`${ REQUEST_URL }?id=${ id }`)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          userInfo: responseData
        });
      })
      .done();
  },
  render () {

    if (!this.state.userInfo) {
      return <Loading />;
    }

    var userInfo = this.state.userInfo;
    var joinTime = formatTime(userInfo.created);

    return (
      <ScrollView style={[styles.container, styles.wrapper]}>
        <Image
          source={{uri: `http:${ userInfo.avatar_large }`}}
          style={styles.thumbnail}
        />
        <View>
          <Text style={styles.title}>{ userInfo.username }</Text>
          <View style={styles.border}></View>
          <Text style={styles.item}>加入时间：{ joinTime }</Text>
          <Text style={styles.item}>网址：{ userInfo.website || '暂无' }</Text>
          <Text style={styles.item}>位置：{ userInfo.location || '暂无' }</Text>
          <Text style={styles.item}>备注：{ userInfo.bio || '暂无' }</Text>
        </View>
      </ScrollView>
    );   
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    padding: 10
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginBottom: 10
  },
  title: {
    fontSize: 30
  },
  item: {
    fontSize: 16,
    marginTop: 8,
    lineHeight: 22
  },
  border: {
    height: 1 / PixelRatio.get(),
    backgroundColor: 'rgb(226, 226, 226)',
    marginTop: 10
  }
});

module.exports = UserInfoView;