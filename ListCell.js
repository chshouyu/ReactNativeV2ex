
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} = React;

var ListCell = React.createClass({
  render () {

    var item = this.props.item;

    return (
      <TouchableHighlight underlayColor="#f1f1f1" onPress={ this.props.gotoDetail }>
        <View style={[styles.container, styles.item]}>
          <Image
            source={{uri: `http:${ item.member.avatar_large }`}}
            style={styles.thumbnail}
          />
          <View style={styles.itemDetail}>
            <Text style={styles.title}>{ item.title }</Text>
            <View style={styles.info}>
              { this.props.showNode ? (
                <View style={styles.nodeWrapper}>
                  <Text style={styles.node}>{ item.node.title }</Text>
                </View>
              ) : null }
              { this.props.showNode ? (
                <Text style={styles.infoDot}>·</Text>
              ) : null }
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
  item: {
    height: 80,
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

module.exports = ListCell;