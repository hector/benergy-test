import React from 'react';
import {createDrawerNavigator} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import ListScreen from '../screens/ListScreen';
import ProfileScreen from '../screens/ProfileScreen';

export default createDrawerNavigator({
  HomeScreen,
  ListScreen,
  ProfileScreen,
});