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
    title: ({ state }) => state.params.rowData.title
  }

  render() {
    const { state } = this.props.navigation;
    return (
      <ScrollView>
        <View>
          <Text>{state.params.rowData.title}</Text>
        </View>
      </ScrollView>
    );
  }
}