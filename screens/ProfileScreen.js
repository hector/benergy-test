import React from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {
  Headline,
  Subheading,
  Text,
} from 'react-native-paper';
import {inject} from 'mobx-react/native'
import fecha from 'fecha';

@inject('appStore')
export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const {appStore} = this.props;
    return (
      <View style={styles.container}>
        <Image
          source={{uri: 'https://pbs.twimg.com/profile_images/859982100904148992/hv5soju7_400x400.jpg'}}
          style={styles.image}
        />
        <Headline>Donald Trump</Headline>
        <View style={styles.accessInfo}>
          <Text>La última vez que entraste en la aplicación fué el:</Text>
          <Subheading>{fecha.format(appStore.appOpenedAt, 'DD/MM/YYYY HH:mm:ss')}</Subheading>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 25,
  },
  accessInfo: {
    alignItems: 'center',
    marginTop: 20,
  }
});
