'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  ActivityIndicatorIOS
} = React;

var Loading = React.createClass({
  render () {
    return (
      <View style={styles.loading}>
        <ActivityIndicatorIOS
          animating={true}
          size="large"
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

module.exports = Loading;