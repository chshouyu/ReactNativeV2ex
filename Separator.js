
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  PixelRatio
} = React;

var Separator = React.createClass({
  render () {
    return <View style={styles.separator}></View>;
  }
});

var styles = StyleSheet.create({
  separator: {
    backgroundColor: 'rgb(226, 226, 226)',
    height: 1 / PixelRatio.get()
  }
});

module.exports = Separator;