
'use strict';

var React = require('react-native');

var Loading = require('./Loading');
var NodeCell = require('./NodeCell');
var IndexView = require('./IndexView');

var {
  StyleSheet,
  Text,
  View,
  ListView,
  PixelRatio
} = React;

var REQUEST_URL = 'https://www.v2ex.com/api/nodes/all.json';

var NodesList = React.createClass({
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
  gotoNodeList (item) {
    this.props.navigator.push({
      title: item.title,
      component: IndexView,
      passProps: {
        nodeId: item.id
      }
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
      <NodeCell item={item} gotoNodeList={this.gotoNodeList.bind(this, item)} />
    );
  }
});

var styles = StyleSheet.create({
  separator: {
    backgroundColor: 'rgb(226, 226, 226)',
    height: 1 / PixelRatio.get()
  }
});

module.exports = NodesList;