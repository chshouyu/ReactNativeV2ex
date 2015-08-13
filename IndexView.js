
'use strict';

var React = require('react-native');

var DetailView = require('./DetailView');

var {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  Navigator,
  NavigatorIOS,
  TouchableHighlight,
  AlertIOS
} = React;

var REQUEST_URL = 'https://www.v2ex.com/api/topics/latest.json';

var IndexView = React.createClass({
  getInitialState () {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false
    };
  },
  componentDidMount () {
    fetch(REQUEST_URL)
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
  gotoDetail (item) {
    // AlertIOS.alert('你好', '再见');
    this.props.navigator.push({
      title: item.title,
      component: DetailView,
      passProps: {
        item: item
      },
      navigator: this.props.navigator
    });
  },
  render () {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderItem}
        style={styles.listView}
      />
    );
  },
  renderLoadingView () {
    return (
      <View style={styles.loading}>
        <Text>加载中……</Text>
      </View>
    );
  },
  renderItem (item) {
    return (
      <TouchableHighlight underlayColor="#f1f1f1" onPress={ this.gotoDetail.bind(this, item) }>
        <View style={[styles.container, styles.item]}>
          <Image
            source={{uri: `http:${ item.member.avatar_large }`}}
            style={styles.thumbnail}
          />
          <View style={styles.itemDetail}>
            <Text style={styles.title}>{ item.title }</Text>
            <View style={styles.info}>
              <View style={styles.nodeWrapper}>
                <Text style={styles.node}>{ item.node.title }</Text>
              </View>
              <Text style={styles.infoDot}>·</Text>
              <Text style={styles.username}>{ item.member.username }</Text>
            </View>
          </View>
          <View style={styles.repliesWrapper}>
            <Text style={styles.replies}>{ item.replies }</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    paddingTop: 100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  listView: {
    // paddingTop: 20,
  },
  item: {
    height: 80,
    borderBottomColor: 'rgb(226, 226, 226)',
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingRight: 10
  },
  thumbnail: {
    width: 60,
    height: 60
  },
  itemDetail: {
    flex: 1,
    height: 60,
    marginLeft: 10
  },
  title: {
    lineHeight: 16,
    height: 32,
    overflow: 'hidden',
    color: '#778087'
  },
  info: {
    marginTop: 12,
    flex: 1,
    flexDirection: 'row',
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

module.exports = IndexView;