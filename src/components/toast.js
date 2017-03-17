import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  LayoutAnimation
} from 'react-native';

export default class Toast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      status: ''
    };
  }

  componentWillMount() {
    LayoutAnimation.spring();
  }

  showToast(status) {
    LayoutAnimation.spring();
    this.setState({show: true, status});
    setTimeout(() => {
      this.hideToast();
    }, 1200);
  }

  hideToast() {
    LayoutAnimation.spring();
    this.setState({show: false});
  }

  render() {
    const tipTextMap = {
      success: '更新成功',
      fail: '更新失败'
    };
    const status = this.state.status;
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.toastTip,
            styles[`${status}Background`],
            {top: this.state.show ? 0 : -30}
          ]}>
          <Text style={styles[`${status}Color`]}>{tipTextMap[status]}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  toastTip: {
    flex: 1,
    position: 'absolute',
    top: -30,
    left: 0,
    right: 0,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  successBackground: {
    backgroundColor: '#79C9FF'
  },
  failBackground: {
    backgroundColor: '#FF8E9C'
  },
  successColor: {
    color: 'white'
  },
  failColor: {
    color: '#940012'
  }
});