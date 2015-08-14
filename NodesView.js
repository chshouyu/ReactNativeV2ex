'use strict';

var React = require('react-native');

var NodesList = require('./NodesList');

var {
  StyleSheet,
  View,
} = React;

var NodesView = React.createClass({
  render () {
    return (
      <View style={styles.container}>
        <NodesList navigator={this.props.navigator} />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

module.exports = NodesView;