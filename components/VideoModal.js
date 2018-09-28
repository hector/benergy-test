import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Portal} from 'react-native-paper';
import { Video } from 'expo';
import VideoPlayer from '@expo/videoplayer';

export default class VideoModal extends React.Component {

  static defaultProps = {
    visible: false,
  };

  static propTypes = {
    onDismiss: PropTypes.func,
    uri: PropTypes.string.isRequired,
    visible: PropTypes.bool,
  };

  render() {
    const {onDismiss, uri, visible} = this.props;
    return (
      <Portal>
        <Modal visible={visible} onDismiss={onDismiss}>
          <VideoPlayer
            showFullscreenButton={false}
            playFromPositionMillis={0}
            videoProps={{
              isMuted: false,
              rate: 1.0,
              resizeMode: Video.RESIZE_MODE_CONTAIN,
              shouldPlay: true,
              source: {uri},
              volume: 1.0,
            }}
          />
        </Modal>
      </Portal>
    );
  }

}