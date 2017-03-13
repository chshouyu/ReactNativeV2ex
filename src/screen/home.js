import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  ScrollView
} from 'react-native';
import { observer } from 'mobx-react/native';
import Store from '../store';

@observer
class HomeScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;
    const { topics } = this.props.store;
    return (
      <ScrollView>
        <View>
          <Text>hello {topics.length}</Text>
          <Button
            title="click"
            color="#f00"
            onPress={() => navigate('Topic', {name: 'Chen'})} />
        </View>
      </ScrollView>
    );
  }
}

const store = new Store();

export default class extends Component {
  static navigationOptions = {
    title: 'V2EX'
  }
  render() {
    return (
      <HomeScreen store={store} {...this.props} />
    );
  }
}