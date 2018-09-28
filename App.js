import React from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {AppLoading, Asset, Font, Icon} from 'expo';
import {Provider as PaperProvider} from 'react-native-paper';
import {action, observable} from 'mobx';
import {observer, Provider as MobxProvider} from 'mobx-react/native';

import AppNavigator from './navigation/AppNavigator';
import AppStore from './stores/AppStore';
import Drawer from './components/Drawer';
import Header from './components/Header';
import NavigationService from './navigation/NavigationService';
import Theme from './constants/Theme';

@observer
export default class App extends React.Component {
  @observable isLoadingComplete = false;

  stores = {
    'appStore': new AppStore('AppStore'),
  };

  render() {
    if (!this.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      const {appStore} = this.stores;
      return (
        <MobxProvider {...this.stores}>
          <PaperProvider theme={Theme}>
            <Drawer isOpen={appStore.showDrawer} onChange={appStore.setDrawer}>
              <View style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                <Header/>
                <AppNavigator
                  ref={NavigationService.setNavigator}
                  onNavigationStateChange={NavigationService.onNavigationStateChange}
                />
              </View>
            </Drawer>
          </PaperProvider>
        </MobxProvider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    await Promise.all([
      Asset.loadAsync([
        // require('./assets/images/some-image.png'),
        // require('./assets/images/some-image2.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
      }),
      this._loadStores(),
    ]);
    // Register the time for when the app has been opened
    this.stores.appStore.appHasBeenOpened();
  };

  // Load data into stores
  _loadStores = async () => {
    const promises = Object.values(this.stores).map(store => store.init());
    await Promise.all(promises);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  @action _handleFinishLoading = () => {
    this.isLoadingComplete = true;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
