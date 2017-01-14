import React from 'react';
import ReactNative, {StyleSheet, View} from 'react-native';
import DevtoolsContainer from './devtoolsContainer';
import MenuToggle from './menuToggle';
import attach from './componentTree';
import RenderInspector from './renderInspector';
import RenderOutliner from './renderOutliner';
import DevMenu from './menu';

attach(React);

class Devtools extends React.Component {
  state = {
    mode: null
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
        <DevMenu
          mode={this.state.mode}
          onSelectedMode={mode => this.setState({mode})}
        />
        {this.state.mode === 'outliner' &&
          <RenderOutliner inspectedViewTag={this.root} />
        }
        {this.state.mode === 'inspector' &&
          <RenderInspector inspectedViewTag={this.root} />
        }
      </View>
    );
  }
}
/*


 */
const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  }
});

export default Devtools;
