'use strict';

var React = require('react-native');

var INFO_REG = /((?:http|https):\/\/\S+)|(@\w+)/i;

var {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  LinkingIOS
} = React;

var ParsedContent = React.createClass({
  openLink (url) {
    LinkingIOS.openURL(url);
  },
  render () {
    var match, index = 0, result = null;
    var content = this.props.content;

    var contentStyle = styles[this.props.contentType === 'detail' ? 'detailContent' : 'replyContent'];

    result = content.split(INFO_REG).filter((snippet, index) => !!snippet).map((snippet, index) => {
      if (snippet.match(/^http/)) {
        if (snippet.match(/\.(jpg|png|gif|bmp|jpeg)$/)) {
          return (
            <Image
              source={{uri: snippet}}
              style={styles.contentImage}
              resizeMode="contain"
            />
          );
        } else {
          return (
            <TouchableHighlight underlayColor="#fff" onPress={this.openLink.bind(null, snippet)}>
              <Text style={styles.atLink}>{ snippet }</Text>
            </TouchableHighlight>
          );
        }
      } else if (snippet.match(/^@/)) {
        return (
          <Text style={styles.atLink}>{ snippet }</Text>
        );
      } else {
        return (
          <Text style={contentStyle}>{ snippet }</Text>
        );
      }
    });

    return (
      <View>{ result }</View>
    );
  }
});

var styles = StyleSheet.create({
  contentImage: {
    height: 200,
  },
  detailContent: {
    lineHeight: 22
  },
  replyContent: {
    lineHeight: 20
  },
  atLink: {
    color: 'rgb(119, 128, 135)'
  }
});

module.exports = ParsedContent;