import React from 'react';
import ReactNative, {
  UIManager,
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import {getRenderTree, getRenderCount,getDisplayName, findNearestCustomComponent} from './componentTree';
import InspectorOverlay from 'react-native/Libraries/Inspector/InspectorOverlay';

export default class RenderInspector extends React.Component {

  state = {
    inspected: null,
    inspectedViewTag: null,
    inspecting: false
  }

  inspect(frame, node) {
    clearTimeout(this.inspectTimeout);
    var handle = ReactNative.findNodeHandle(node);
    var renderCount = getRenderCount(handle);
    var name = getDisplayName(node);

    this.setState({
      inspected: {
        frame,
        info: {name, renderCount}
      }
    });

    this.inspectTimeout = setTimeout(() => {
      this.inspect(frame, node);
    }, 100);
  }

  onTouchInstance(touched, frame) {
    // console.log('touch', touched)
    // console.log('parent', findNearestCustomComponent(touched))
    // console.log('touched', getRenderCount(ReactNative.findNodeHandle(touched)));

    var nearestParent = findNearestCustomComponent(touched);
    if (nearestParent) {
      let handle = ReactNative.findNodeHandle(nearestParent);
      if (this.state.inspected && this.state.inspected.handle === handle) {
        return;
      }
      let renderCount = getRenderCount(handle);
      let name = getDisplayName(nearestParent);
      // console.log(name, 'count', renderCount);
      // console.log('render tree', getRenderTree())
      UIManager.measure(
        handle,
        (left, top, width, height, x, y) => {
          this.inspect({left: x, top: y, width, height}, nearestParent);
        }
      );
    }
  }
  toggleInspector () {
    if (this.state.inspecting) {
      this.setState({
        inspecting: false,
        inspected: null
      });
    } else {
      this.setState({
        inspecting: true
      });
    }
  }
  render () {
    if (this.state.inspecting) {
      return (
        <View style={styles.above} pointerEvents="box-none">
          <InspectorOverlay
            inspected={this.state.inspected}
            inspectedViewTag={this.props.inspectedViewTag}
            onTouchInstance={this.onTouchInstance.bind(this)}
          />
          <Controls
            active={true}
            onPress={() => this.toggleInspector()}
            data={this.state.inspected && this.state.inspected.info}
          />
        </View>
      )
    }
    return (
      <Controls
        active={false}
        onPress={() => this.toggleInspector()}
        data={this.state.inspected && this.state.inspected.info}
      />
    )
  }
}


function Controls ({active, onPress, data}) {
  return (
    <View style={styles.controls}>
      {data &&
        <View style={styles.data}>
          <Text style={styles.dataText}>Component: {data.name}</Text>
          <Text style={styles.dataText}>Rendered: {data.renderCount}</Text>
        </View>
      }
      {!data && <View />}
      <TouchableOpacity style={styles.toggle} onPress={onPress}>
        <View>
          <Text>{active ? 'Stop Inspecting' : 'Inspect'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  above: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  data: {
    // flexDirection: 'row'
  },
  dataText: {
    fontSize: 12
  },
  toggle: {
    alignSelf: 'flex-end'
  }
});
