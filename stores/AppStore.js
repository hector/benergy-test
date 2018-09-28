import {action, observable} from 'mobx';
import {date, serializable} from 'serializr';

import AsyncStore from './AsyncStore';

export default class AppStore extends AsyncStore {
  @serializable(date()) @observable appOpenedAt;
  @serializable @observable pushNotifications = false;
  @observable showDrawer = false;

  @action appHasBeenOpened = () => {
    this.appOpenedAt = new Date();
  };

  @action closeDrawer = () => {
    this.showDrawer = false;
  };

  @action openDrawer = () => {
    this.showDrawer = true;
  };

  @action setDrawer = (show) => {
    console.log('set drawer');
    console.log(show);
    this.showDrawer = show;
  };

  @action toggleDrawer = (isOpen) => {
    // if (typeof isOpen === 'object') return;
    // this.showDrawer = (isOpen === undefined) ? !this.showDrawer : isOpen;
    this.showDrawer = !this.showDrawer;
  };

  @action togglePushNotifications = () => {
    this.pushNotifications = !this.pushNotifications;
  }

}
