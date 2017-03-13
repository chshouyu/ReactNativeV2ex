import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  ScrollView
} from 'react-native';

export default class extends Component {
  static navigationOptions = {
    title: ({ state }) => state.params.name
  }

  render() {
    return (
      <View>
        <Text>Topic....</Text>
      </View>
    );
  }
}