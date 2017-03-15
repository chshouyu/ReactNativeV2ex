import { TabNavigator, StackNavigator } from 'react-navigation';
import Home from './screen/home';
import Topic from './screen/topic';

const HomeTab = TabNavigator({
  Home: { screen: Home }
}, {
  swipeEnabled: true,
  lazyLoad: true,
  tabBarOptions: {
    activeTintColor: '#505050',
    labelStyle: {
      fontSize: 12
    }
  }
});

export default StackNavigator({
  Home: { screen: HomeTab },
  Topic: { screen: Topic }
});