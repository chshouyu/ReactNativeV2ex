
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} = React;

var NodeCell = React.createClass({
  render () {

    var item = this.props.item;

    return (
      <TouchableHighlight underlayColor="#f1f1f1" onPress={ this.props.gotoNodeList }>
        <View style={[styles.container, styles.item]}>
          <Text style={styles.text}>{ item.title }</Text>
        </View>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    height: 40,
    paddingLeft: 10
  },
  text: {
    fontSize: 15
  }
});

module.exports = NodeCell;