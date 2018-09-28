import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {Divider, Drawer as PaperDrawer, Switch} from 'react-native-paper';
import {Constants} from 'expo';
import SideMenu from 'react-native-side-menu';
import {inject, observer} from 'mobx-react/native';

import {Colors} from '../constants/Theme';
import Layout from '../constants/Layout';
import NavigationService from '../navigation/NavigationService';

export default class Drawer extends React.Component {

  static defaultProps = {
    isOpen: false,
  };

  static propTypes = {
    isOpen: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static width = Layout.window.width * 3 / 4;

  render() {
    const {children, isOpen, onChange} = this.props;
    return (
      <SideMenu
        isOpen={isOpen}
        onChange={onChange}
        menu={<DrawerContent/>}
        openMenuOffset={this.constructor.width}
      >
        {children}
      </SideMenu>
    );
  }

}

@inject('appStore')
@observer
class DrawerContent extends React.Component {

  _navigate = (...args) => {
    NavigationService.navigate(...args);
    this.props.appStore.closeDrawer();
  };

  render() {
    const {appStore} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.statusBar}/>
        <PaperDrawer.Section title="Menu">
          <PaperDrawer.Item
            label="Home"
            active={NavigationService.currentScreen === 'Home'}
            onPress={() => this._navigate('HomeStack')}
          />
          <PaperDrawer.Item
            label="List"
            active={NavigationService.currentScreen === 'List'}
            onPress={() => this._navigate('ListStack')}
          />
          <PaperDrawer.Item
            label="Profile"
            active={NavigationService.currentScreen === 'Profile'}
            onPress={() => this._navigate('ProfileStack')}
          />
          <PaperDrawer.Item label="More info" active={false} onPress={() => {}}/>
          <Divider/>
          <View style={styles.notificationsContainer}>
            <PaperDrawer.Item
              label="Push Notifications"
              active={false}
              style={styles.notifications}
              onPress={appStore.togglePushNotifications}
            />
            <Switch
              style={styles.switch}
              value={appStore.pushNotifications}
              onValueChange={appStore.togglePushNotifications}
            />
          </View>
          <Divider/>
          <PaperDrawer.Item label="Log off" active={false} onPress={() => {}}/>
        </PaperDrawer.Section>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  notificationsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 10,
  },
  notifications: {
    paddingRight: 0,
    marginRight: 0,
  },
  statusBar: {
    backgroundColor: Colors.surface,
    height: Constants.statusBarHeight,
  },
  switch: {
    paddingLeft: 0,
    marginLeft: 0,
  },
});