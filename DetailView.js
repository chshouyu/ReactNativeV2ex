'use strict';

var React = require('react-native');

var Util = require('./Util');

var UserInfoView = require('./UserInfo');
var Separator = require('./Separator');

var {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  AlertIOS,
  TouchableHighlight,
  PixelRatio,
  ListView
} = React;

var {
  formatTime
} = Util;

var REQUEST_REPLIES_URL = 'https://www.v2ex.com/api/replies/show.json';

var DetailView = React.createClass({
  getInitialState () {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false
    };
  },
  componentDidMount () {
    fetch(`${ REQUEST_REPLIES_URL }?topic_id=${ this.props.item.id }`)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState((state) => {
          return {
            dataSource: state.dataSource.cloneWithRows(responseData),
            loaded: true
          };
        });
      })
      .done();
  },
  gotoUserInfo(member) {
    this.props.navigator.push({
      title: '成员',
      component: UserInfoView,
      passProps: {
        memberId: member.id
      }
    });
  },
  render () {

    var item = this.props.item;
    var dateTime = formatTime(item.created);

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
          <TouchableHighlight style={styles.thumbnailWrapper} onPress={ this.gotoUserInfo.bind(this, item.member) }>
            <Image
              source={{uri: `http:${ item.member.avatar_large }`}}
              style={styles.thumbnail}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.contentWrapper}>
          <Text style={styles.content}>{ item.content }</Text>
        </View>
        <View style={styles.container}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderItem}
            renderSeparator={this.renderSeparator}
            automaticallyAdjustContentInsets={false}
          />
        </View>
      </ScrollView>
    );
  },
  renderItem (item) {
    return (
      <View key={item.id}>
        <Text>{ item.content }</Text>
      </View>
    );
  },
  renderSeparator () {
    return <Separator />;
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

module.exports = DetailView;