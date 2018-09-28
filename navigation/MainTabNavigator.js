import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import ListScreen from '../screens/ListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TabBarIcon from '../components/TabBarIcon';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const ListStack = createStackNavigator({
  List: ListScreen,
});

ListStack.navigationOptions = {
  tabBarLabel: 'List',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-list${focused ? '' : '-outline'}` : 'md-list'}
    />
  ),
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-person${focused ? '' : '-outline'}` : 'md-person'}
    />
  ),
};

export default createMaterialBottomTabNavigator({
  HomeStack,
  ListStack,
  ProfileStack,
});
