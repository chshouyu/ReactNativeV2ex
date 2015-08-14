'use strict';

var React = require('react-native');

var TopicList = require('./TopicList');

var {
  StyleSheet,
  View,
} = React;

var IndexView = React.createClass({
  render () {
    return (
      <View style={styles.container}>
        <TopicList navigator={this.props.navigator} />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

module.exports = IndexView;