/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var IndexView = require('./IndexView');
var NodesList = require('./NodesList');

var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  TabBarIOS,
  View,
  Text
} = React;

var ReactNativeV2ex = React.createClass({
  getInitialState () {
    return {
      selectedTab: 'home'
    };
  },
  changeTab (tab) {
    this.setState({
      selectedTab: tab
    });
  },
  render () {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="主页"
          selected={this.state.selectedTab === 'home'}
          onPress={this.changeTab.bind(this, 'home')}>
          <NavigatorIOS
            style={styles.container}
            initialRoute={{
              component: IndexView,
              title: 'V2EX'
            }}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="全部节点"
          selected={this.state.selectedTab === 'nodes'}
          onPress={this.changeTab.bind(this, 'nodes')}>
          <NavigatorIOS
            style={styles.container}
            initialRoute={{
              component: NodesList,
              title: '节点列表'
            }}
          />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('ReactNativeV2ex', () => ReactNativeV2ex);
