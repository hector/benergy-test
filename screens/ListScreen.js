import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {List} from 'react-native-paper';

import file1 from '../assets/data/file1.json';

export default class ListScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <List.Section title="Listado">
          {file1.list.map(item =>
            <List.Item key={item} title={item}/>
          )}
        </List.Section>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
