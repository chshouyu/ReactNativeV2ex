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

    return (
      <ScrollView style={[styles.container, styles.wrapper]}>
        <View>
          <Text style={styles.title}>{ userInfo.username }</Text>
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
  title: {
    fontSize: 30
  },
  item: {
    fontSize: 16,
    marginTop: 10
  }
});

module.exports = UserInfoView;