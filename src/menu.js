import React from 'react';
import {Animated, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const MENU_WIDTH = 250;

export default class Menu extends React.Component {
  state = {
    offset: new Animated.Value(-MENU_WIDTH)
  };
  toggle() {
    if (this.state.offset._value < 0) {
      Animated.timing(
        this.state.offset,
        {toValue: 0}
      ).start();
    } else {
      Animated.timing(
        this.state.offset,
        {toValue: -MENU_WIDTH}
      ).start();
    }
  }
  selectMode(type) {
    this.props.onSelectedMode(this.props.mode === type ? null : type);
    this.toggle();
  }
  render() {
    return (
      <Animated.View style={[styles.container, {right: this.state.offset}]}>
        <Text style={styles.title}>Dev Tools</Text>

        <Row onPress={() => this.selectMode('inspector')} active={this.props.mode === 'inspector'}>
          Render Inspecter
        </Row>
        <Row onPress={() => this.selectMode('outliner')} active={this.props.mode === 'outliner'}>
          Render Outliner
        </Row>

        <TouchableOpacity style={styles.drawerToggle} onPress={() => this.toggle()}>
          <View />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

function Row ({children, onPress, active}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.row}>
        <ActiveIndicator active={active} />
        <Text style={styles.rowText}>{children}</Text>
      </View>
    </TouchableOpacity>
  )
}

function ActiveIndicator ({active}) {
  return (
    <View style={[styles.circle, active && styles.activeCircle]} />
  )
}

const styles = StyleSheet.create({
  container: {
    width: MENU_WIDTH,
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: 'black',
    padding: 20,
    justifyContent: 'flex-start'
  },
  drawerToggle: {
    height: 80,
    backgroundColor: 'black',
    left: -40,
    top: 200
  },
  title: {
    color: 'white',
    fontSize: 28
  },
  row: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowText: {
    color: 'white',
    fontSize: 22
  },
  circle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 10
  },
  activeCircle: {
    backgroundColor: 'green'
  }
});
