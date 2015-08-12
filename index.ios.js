/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image
} = React;

var REQUEST_URL = 'https://www.v2ex.com/api/topics/latest.json';

var ReactNativeV2ex = React.createClass({
  getInitialState () {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false
    };
  },
  componentDidMount () {
    fetch(REQUEST_URL)
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
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderItem}
        style={styles.listView}
      />
    );
  },
  renderLoadingView () {
    return (
      <View style={styles.loading}>
        <Text>加载中……</Text>
      </View>
    );
  },
  renderItem (item) {
    return (
      <View style={styles.item}>
        <Image
          source={{uri: `http:${ item.member.avatar_normal }`}}
          style={styles.thumbnail}
        />
        <View style={styles.itemDetail}>
          <Text style={styles.title}>{ item.title }</Text>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  loading: {
    paddingTop: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  item: {
    height: 50,
    borderBottomColor: '#111',
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  thumbnail: {
    width: 50,
    height: 50
  },
  itemDetail: {
    flex: 1,
  },
  title: {
    // fontSize: 20,
    marginBottom: 10
  }
});

AppRegistry.registerComponent('ReactNativeV2ex', () => ReactNativeV2ex);
