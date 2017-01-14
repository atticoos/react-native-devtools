import React from 'react';
import ReactNative, {View, StyleSheet} from 'react-native';
import RenderInspector from './renderInspector';

const Tool = {
  RENDER_INSPECTOR: 'RENDER_INSPECTOR',
  RENDER_HEATMAP: 'RENDER_HEATMAP'
};

class DevtoolsContainer extends React.Component {
  state = {
    tool: Tool.RENDER_INSPECTOR
  };
  render() {
    return (
      <View>
        <RenderInspector
          inspectedViewTag={this.props.root && ReactNative.findNodeHandle(this.props.root)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

export default DevtoolsContainer;
