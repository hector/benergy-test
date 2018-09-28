// Basic store that gets serialized using React Native's AsyncStorage

import {
  serialize,
  update,
} from 'serializr';
import {
  autorunAsync,
  runInAction,
} from 'mobx';
import store from 'react-native-simple-store';

const voidFunc = function voidFunc() {};

export default class AsyncStore {
  id;
  storePromise;

  constructor(id) {
    this.id = id;
    // Save the promise that returns the store JSON
    this.storePromise = store.get(this.id);
  }

  init = async () => {
    const json = await this.deserialize();
    autorunAsync(this.serialize, 100);
    return json;
  };

  deserialize = async () => {
    const json = await this.storePromise;
    runInAction(() => {
      this.beforeDeserialize && this.beforeDeserialize(json);
      if (json) update(this, json, voidFunc, {store: this});
      this.afterDeserialize && this.afterDeserialize(json);
    });
    return json;
  };

  serialize = async () => {
    const json = serialize(this);
    return store.save(this.id, json);
  }

}