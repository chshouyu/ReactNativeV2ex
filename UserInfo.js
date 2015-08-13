'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image
} = React;

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
  },
  render () {

    if (!this.state.userInfo) {
      return this.renderLoading();
    }

    var userInfo = this.state.userInfo;
    var joinTime = this.formatTime(userInfo.created);

    return (
      <ScrollView style={[styles.container, styles.wrapper]}>
        <Image
          source={{uri: `http:${ userInfo.avatar_large }`}}
          style={styles.thumbnail}
        />
        <View>
          <Text style={styles.title}>{ userInfo.username }</Text>
          <Text style={styles.item}>加入时间：{ joinTime }</Text>
          <Text style={styles.item}>网址：{ userInfo.website || '暂无' }</Text>
          <Text style={styles.item}>位置：{ userInfo.location || '暂无' }</Text>
          <Text style={styles.item}>备注：{ userInfo.bio || '暂无' }</Text>
        </View>
      </ScrollView>
    );   
  },
  renderLoading () {
    return (
      <View style={[styles.container, styles.loading]}>
        <Text>加载中……</Text>
      </View>
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
  loading: {
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'center',
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
  }
});

module.exports = UserInfoView;