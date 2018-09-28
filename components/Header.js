import React from 'react';
import {View} from 'react-native';
import {Appbar, Divider} from 'react-native-paper';
import {inject, observer} from 'mobx-react/native'

@inject('appStore')
@observer
export default class Header extends React.Component {

  render() {
    const {appStore} = this.props;
    return (
      <View>
        <Appbar.Header>
          <Appbar.Action icon="menu" onPress={appStore.openDrawer}/>
          <Appbar.Content title="Title"/>
        </Appbar.Header>
        <Divider/>
      </View>
    );
  }

}