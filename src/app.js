import React, { Component } from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Home from './screen/home';
import Topic from './screen/topic';

const HomeTabNavigator = StackNavigator({
  Home: { screen: Home },
  Topic: { screen: Topic }
});

class HomeTab extends Component {
  static navigationOptions = {
    title: 'V2EX'
  }
  render() {
    return (
      <HomeTabNavigator />
    );
  }
}

export default TabNavigator({
  HomeTab: { screen: HomeTab }
});