import React from 'react';
import ReactNative, {StyleSheet, View} from 'react-native';
import DevtoolsContainer from './devtoolsContainer';
import MenuToggle from './menuToggle';
import attach from './componentTree';
import RenderInspector from './renderInspector';

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
              this.root = component;
            }
            console.log('r', this.root)
          }}>
          {this.props.children}
        </View>
        <MenuToggle onPress={() => this.setState({active: !this.state.active})} />
        {this.state.active &&
          <RenderInspector
            inspectedViewTag={this.root && ReactNative.findNodeHandle(this.root)}
          />
        }
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
