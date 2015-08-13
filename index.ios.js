/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var IndexView = require('./IndexView');

var {
  AppRegistry,
  StyleSheet,
  Navigator,
  NavigatorIOS,
} = React;

var ReactNativeV2ex = React.createClass({
  render () {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          component: IndexView,
          title: 'v2ex'
        }}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('ReactNativeV2ex', () => ReactNativeV2ex);
