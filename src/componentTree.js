import ReactNative, {ElementBox} from 'react-native';

var renderTree = {};

export function getDisplayName (component) {
  return component.displayName || component.constructor.displayName || component.constructor.name;
}

function getNodeId (node) {
  return node._renderedComponent._debugID;
}
function getNodeName(node) {
  return node._currentElement.type.name;
}
function getNodeParent(node) {
  return node._currentElement._owner;
}
function getNodeHandle(node) {
  return ReactNative.findNodeHandle(node._instance);
}

export function getRenderTree () {
  return renderTree;
}

function isReactNativeNode(node) {
  var type = getDisplayName(node._currentElement.type);
  var types = ['RCTText', 'Text', 'View', 'RCTView'];
  return types.indexOf(type) > -1;
}

export function findNearestCustomComponent (node) {
  while (node !== null) {
    if (!isReactNativeNode(node)) {
      return node._instance;
    }
    node = getNodeParent(node);
  }
  return null;
}

export function getRenderCount (tag) {
  function depthFirstSearch (tree, target) {
    if (!tree) {
      return null;
    }

    if (tree.id === target) {
      return tree.renderCount
    }
    if (!tree.children) {
      return null;
    }

    var childrenIds = Object.keys(tree.children);
    for (let i = 0; i < childrenIds.length; i++) {
      let count = depthFirstSearch(tree.children[childrenIds[i]], target);
      if (count !== null) {
        return count;
      }
    }
    return null;
  }

  var keys = Object.keys(renderTree);
  return depthFirstSearch(renderTree[keys[0]], tag);
}


function createReportableNode (id, name) {
  return {
    id,
    name,
    children: {}
  };
}

function buildAncestryPath (node, tree = []) {
  if (node === null) {
    return tree;
  }
  var id = getNodeHandle(node);
  var name = getNodeName(node);

  return buildAncestryPath(getNodeParent(node), tree.concat({id, name}));
}

function traverse (nodes, tree = {}) {
  if (nodes.length === 0) {
    return null;
  }

  var node = nodes[0];
  var treeNode = {
    id: node.id,
    name: node.name,
    render: nodes.length === 1,
    child: traverse(nodes.slice(1))
  };
  return treeNode;
}

function buildTree (node) {
  var path = buildAncestryPath(node);
  var tree = traverse(path.reverse())
  buildRenderTree(tree);
  return tree;
}

function buildRenderTree (tree, renderTreeLevel = renderTree) {
  if (!tree) {
    return;
  }
  if (!renderTreeLevel[tree.id]) {
    renderTreeLevel[tree.id] = {
      id: tree.id,
      name: tree.name,
      renderCount: 0,
      children: {}
    };
  }

  if (tree.render) {
    renderTreeLevel[tree.id].renderCount++;
  }

  buildRenderTree(tree.child, renderTreeLevel[tree.id].children);
}

function createComponentDidUpdate () {
  return function componentDidUpdate (prevProps, prevState) {
    const displayName = getDisplayName(this);
    // console.log(`${displayName} updated`, getNodeId(this._reactInternalInstance));

    var currentNode = this._reactInternalInstance;
    buildTree(currentNode)
    // console.log('HANDLE', this._reactInternalInstance);
    // console.log(buildTree(currentNode));
    // console.log('render tree', renderTree);

    return;

    var nodeTree = {};
    while (currentNode != null) {
      let nodeId = getNodeId(currentNode);
      let nodeName = getNodeName(currentNode);
      let reportableNode = createReportableNode(nodeId, nodeName);

      reportableNode.children = nodeTree;
      nodeTree = reportableNode;
      currentNode = getNodeParent(currentNode);
    }
    // updateTree(nodeTree);
    console.log('tree', nodeTree)
  }
}

export default function attach (React) {
  const origComponentDidUpdate = React.Component.prototype.componentDidUpdate;

  React.Component.prototype.componentDidUpdate = createComponentDidUpdate();
}
