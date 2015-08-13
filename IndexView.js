
'use strict';

var React = require('react-native');

var DetailView = require('./DetailView');
var Loading = require('./Loading');
var ListCell = require('./ListCell');

var {
  StyleSheet,
  Text,
  View,
  ListView,
  PixelRatio
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
      title: '话题',
      component: DetailView,
      passProps: {item},
      navigator: this.props.navigator
    });
  },
  render () {
    if (!this.state.loaded) {
      return <Loading />;
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderItem}
        renderSeparator={this.renderSeparator}
      />
    );
  },
  renderSeparator () {
    return (
      <View style={styles.separator}></View>
    );
  },
  renderItem (item) {
    return (
      <ListCell key={item.id} item={item} gotoDetail={this.gotoDetail.bind(this, item)} />
    );
  }
});

var styles = StyleSheet.create({
  separator: {
    backgroundColor: 'rgb(226, 226, 226)',
    height: 1 / PixelRatio.get()
  }
});

module.exports = IndexView;