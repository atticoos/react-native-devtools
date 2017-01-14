import React from 'react';
import ReactNative, {StyleSheet, View} from 'react-native';
import DevtoolsContainer from './devtoolsContainer';
import MenuToggle from './menuToggle';
import attach from './componentTree';
import RenderInspector from './renderInspector';
import RenderOutliner from './renderOutliner';

attach(React);

class Devtools extends React.Component {
  state = {
    active: false
  };
  render() {
    return (
      <View style={styles.appContainer}>
        <View style={styles.appContainer} ref={component => {
            if (!this.root) {
              this.root = ReactNative.findNodeHandle(component);
            }
          }}>
          {this.props.children}
        </View>
        <MenuToggle onPress={() => this.setState({active: !this.state.active})} />
        {this.state.active &&
          <RenderOutliner inspectedViewTag={this.root} />
        }
      </View>
    );
  }
}
/*

  <RenderInspector
    inspectedViewTag={this.root}
  />
 */
const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  }
});

export default Devtools;
