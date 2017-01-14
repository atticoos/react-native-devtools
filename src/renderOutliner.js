import React from 'react';
import ReactNative, {
  UIManager,
  StyleSheet,
  View
} from 'react-native';
import {getRenderTree, getRenderCount,getDisplayName, subscribeToRenders, findNearestCustomComponent} from './componentTree';
import ElementBox from 'react-native/Libraries/Inspector/ElementBox';

export default class RenderOutliner extends React.Component {
  state = {
    outlines: []
  };
  timers = [];
  componentDidMount() {
    this.renderUnsubscribe = subscribeToRenders(this.onComponentRendered.bind(this));
  }
  componentWillUnmount() {
    this.renderUnsubscribe();
  }
  onComponentRendered(touched) {

    var nearestParent = findNearestCustomComponent(touched);
    if (!nearestParent) {
      return;
    }
    UIManager.measure(
      ReactNative.findNodeHandle(nearestParent),
      (rLeft, rTop, width, height, left, top) => {
        console.log({rLeft, rTop, width, height, left, top})
        this.addOutline(left, top, width, height);
      }
    );
  }

  addOutline (left, top, width, height) {
    var frame = {left, top, width, height};
    this.setState({
      outlines: this.state.outlines.concat(frame)
    });
    this.timers.push(setTimeout(() => {
      this.setState({
        outlines: this.state.outlines.filter(outline => outline !== frame)
      });
    }, 500));
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.outlines.map((outline, i) => (
          <View key={i} style={[styles.outline, outline]} />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 0,
    overflow: 'visible'
  },
  outline: {
    position: 'absolute',
    // backgroundColor: 'rgba(0,0,0,0.5)'
    borderColor: 'rgba(185, 70, 70, 1)',
    borderWidth: 2,
    borderStyle: 'dashed'
  }
});
