import React from 'react';
import {StyleSheet, View} from 'react-native';

class Devtools extends React.Component {
  render() {
    return (
      <View style={styles.appContainer}>
        <View style={styles.appContainer}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  }
});

export default Devtools;
