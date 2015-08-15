'use strict';

var React = require('react-native');

var Separator = require('./Separator');
var ReplyCell = require('./ReplyCell');

var {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  ActivityIndicatorIOS
} = React;

var REQUEST_REPLIES_URL = 'https://www.v2ex.com/api/replies/show.json';

var Reply = React.createClass({
  getInitialState () {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false
    };
  },
  componentDidMount () {

    var url = `${ REQUEST_REPLIES_URL }?page_size=100&_t=${ Date.now() }&topic_id=${ this.props.id }`;
    
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState((state) => {
          return {
            dataSource: state.dataSource.cloneWithRows(responseData),
            loaded: true
          };
        });
      })
      .done();
  },
  render () {
    return (
      <View style={styles.container}>
        { !this.state.loaded ? (
          <View style={styles.loading}>
            <ActivityIndicatorIOS
              animating={true}
            />
          </View>
        ) : null }
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderItem}
          renderSeparator={this.renderSeparator}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    );
  },
  renderItem (item) {
    return <ReplyCell key={item.id} item={item} />;
  },
  renderSeparator () {
    return <Separator />;
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

module.exports = Reply;