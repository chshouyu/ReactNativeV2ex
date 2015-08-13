'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View
} = React;

var Loading = React.createClass({
  render () {
    return (
      <View style={styles.loading}>
        <Text>加载中……</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  loading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 100,
  },
});

module.exports = Loading;