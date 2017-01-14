/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import ReactNative, {UIManager} from 'react-native';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native';
// import attach, {getRenderTree} from './audit';
// import Inspector from './inspector';
// attach(React);

const endpoint = 'http://localhost:8092';
const endpoint2 = 'http://localhost:8093';

export default class App extends Component {
  state = {
    count: 0
  };
  foo(){
    this.setState({count: this.state.count - 1});
  }
  render() {

    return (
     <TouchableOpacity style={styles.container} onPress={() => this.setState({count: this.state.count + 1})}>
      <View style={styles.flex} ref={component => this.root = component}>
        <Text>Parent</Text>

        <Child count={this.state.count} />
      </View>
      </TouchableOpacity>
    );
  }
}

const s = StyleSheet.create({
  highlight: {
    position: 'absolute',
    backgroundColor: 'yellow',
    top: 166,
    left: 386,
    width: 100,
    height: 100
  }
});

class Child extends React.Component {
  state = {
    count: 0
  };
  render () {
    return (
      <TouchableOpacity onPress={() => this.setState({count: this.state.count + 1})}>
        <View style={styles.component}>
          <Text>Child A</Text>
          <DeeplyNestedChild name="B" count={this.props.count} />
          <DeeplyNestedChild name="C" count={this.props.count} />
        </View>
      </TouchableOpacity>
    )
  }
}

class DeeplyNestedChild extends React.Component {
  state = {
    count: 0
  };
  render () {
    return (
      <TouchableOpacity
        style={styles.component}
        onPress={() => this.setState({count: this.state.count + 1})}>
        <View>
          <Text>Deeply Nested Child {this.props.name}</Text>
          <Text>Click to Render</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    flex: 1,
  },
  component: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    margin: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
