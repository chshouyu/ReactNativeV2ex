'use strict';

var React = require('react-native');

var IMAGE_URI_REG = /(http|https):\/\/.+?\.(jpg|png|gif|bmp|jpeg)/gi;

var {
  StyleSheet,
  Text,
  View,
  Image
} = React;

var ParsedContent = React.createClass({
  render () {
    var match, index = 0, result = [];
    var content = this.props.content;

    var contentStyle = styles[this.props.contentType === 'detail' ? 'detailContent' : 'replyContent'];
  
    while (match = IMAGE_URI_REG.exec(content)) {
      if (match.index > 0) {
        result.push(
          <Text style={contentStyle}>{ content.slice(index, match.index) }</Text>
        );
      }
      result.push(
        <Image
          source={{uri: match[0]}}
          style={{height: 200}}
          resizeMode="contain"
        />
      );
      index = match.index + match[0].length;
    }
    
    result.push(
      <Text style={contentStyle}>{ content.slice(index) }</Text>
    );

    return (
      <View>{ result }</View>
    );
  }
});

var styles = StyleSheet.create({
  detailContent: {
    lineHeight: 22
  },
  replyContent: {
    lineHeight: 20
  }
});

module.exports = ParsedContent;