import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {Button} from 'react-native-paper';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react/native';

import {Colors} from '../constants/Theme';
import VideoModal from '../components/VideoModal';

@observer
export default class HomeScreen extends React.Component {
  @observable showVideo1Modal = false;
  @observable showVideo2Modal = false;

  static navigationOptions = {
    header: null,
  };

  @action _toggleVideo1Modal = () => {
    this.showVideo1Modal = !this.showVideo1Modal;
  };

  @action _toggleVideo2Modal = () => {
    this.showVideo2Modal = !this.showVideo2Modal;
  };

  render() {
    return (
      <View style={styles.container}>
        <Button mode="contained" style={styles.button1} onPress={this._toggleVideo1Modal}>Video 1</Button>
        <Button mode="contained" color={Colors.accent} onPress={this._toggleVideo2Modal}>Video 2</Button>
        <VideoModal
          onDismiss={this._toggleVideo1Modal}
          uri="http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
          visible={this.showVideo1Modal}
        />
        <VideoModal
          onDismiss={this._toggleVideo2Modal}
          uri="https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
          visible={this.showVideo2Modal}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button1: {
    marginBottom: 100,
  }
});
