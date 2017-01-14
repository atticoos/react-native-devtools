import React from 'react';
import {
  Animated,
  StyleSheet,
  View,
  PanResponder,
  TouchableOpacity
} from 'react-native';

class MenuToggle extends React.Component {
  state = {
    pan: new Animated.ValueXY()
  };

  componentWillMount() {
    this.panResponder = PanResponder.create({
      // onMoveShouldSetResponderCapture: () => true,
      // onMoveShouldSetPanResponderCapture: () => true,
      // onPanResponderGrant: () => {
      //   // Start off where last left off
      //   this.state.pan.setOffset({
      //     x: this.state.pan.x._value,
      //     y: this.state.pan.y._value
      //   });
      //   this.state.pan.setValue({x: 0, y: 0});
      // },
      // onPanResponderMove: Animated.event([
      //   null,
      //   {dx: this.state.pan.x, dy: this.state.pan.y}
      // ]),
      // onPanResponderRelease: () => {
      //   // Flatten the offset to avoid erratic behavior
      //   this.state.pan.flattenOffset();
      // }
    });
  }

  render() {
    var {pan} = this.state;
    var [translateX, translateY] = [pan.x, pan.y];
    var position = {transform: [{translateX}, {translateY}]};
    return (
      <Animated.View
        style={[styles.container, styles.size, position]}
        {...this.panResponder.panHandlers}
      >
        <TouchableOpacity
          style={[styles.size, styles.button]}
          onPress={this.props.onPress}
        >
          <View>

          </View>
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  size: {
    width: 50,
    height: 50
  },
  container: {
    position: 'absolute',
    right: 5,
    top: 200
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
});

export default MenuToggle;
