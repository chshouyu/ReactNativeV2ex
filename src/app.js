import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import { observer } from 'mobx-react/native';
import Store from './store';

@observer
class App extends Component {
  render() {
    const { topics } = this.props.store;
    return (
      <View style={styles.container}>
        <Text>hello</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20
  }
});

const store = new Store();

export default class extends Component {
  render() {
    return (
      <App store={store} />
    );
  }
}