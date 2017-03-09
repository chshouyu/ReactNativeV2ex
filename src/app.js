import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { observer } from 'mobx-react/native';
import Store from './store';

@observer
class App extends Component {
  render() {
    return (
      <View>
        <Text>hello</Text>
      </View>
    );
  }
}

const store = new Store();

export default class extends Component {
  render() {
    return (
      <App store={store} />
    );
  }
}