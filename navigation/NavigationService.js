import {NavigationActions} from 'react-navigation';
import {action, observable} from 'mobx';

class NavigationService {
  @observable currentScreen = 'Home';
  navigator;

  // gets the current screen from navigation state
  _getActiveRouteName = (navigationState) => {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
      return this._getActiveRouteName(route);
    }
    return route.routeName;
  };

  navigate = (routeName, params) => {
    this.navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      })
    );
  };

  @action onNavigationStateChange = (prevState, currentState) => {
    this.currentScreen = this._getActiveRouteName(currentState);
  };

  setNavigator = (navigator) => {
    this.navigator = navigator;
  };

}

export default new NavigationService();