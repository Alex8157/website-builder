const body = document.getElementsByTagName('body');
let counter = 0;

class ButtonFactory {
  create() {
    const button = document.createElement('button');
    button.innerHTML = 'Добавить';
    return button;
  }
}

class VirtualNode {
  constructor(type, button) {
    this.type = type;
    this.nodes = [];
    this.DOMElement = document.createElement(type);
    this.DOMElement.appendChild(button);
  }
  addNode(node) {
    this.nodes.push(node);
    this.DOMElement.appendChild(node.getDOMElement());
  }
  getDOMElement() {
    return this.DOMElement;
  }
}

const buttonFactory = new ButtonFactory();

const root = new VirtualNode('div', buttonFactory.create());
const v1 = new VirtualNode('div', buttonFactory.create());
const v2 = new VirtualNode('div', buttonFactory.create());
root.addNode(v1);
root.addNode(v2);

body[0].appendChild(root.getDOMElement());

function addNode(id = counter) {
  if (!root) {
    root = new VirtualNode('div', counter);
    counter++;
  } else {
    const node = findNode(root, id);
    node.addNode(new VirtualNode('div'));
  }
  body[0].innerHTML = makeInterface(root);
}

function findNode(node, id) {
  if (node.id === id) {
    return node;
  }
  for (let i = 0; i < node.nodes.length; i++) {
    const result = findNode(node.nodes[i], id);
    if (result) {
      return result;
    }
  }
}

function makeInterface(node) {
  let html = '';
  if (node.nodes.length > 0) {
    html = `<${node.type} id=${node.id}>`;
    for (let i = 0; i < node.nodes.length; i++) {
      html += `${makeInterface(node.nodes[i])}`;
    }
    html += `</${node.type}>`;
  } else {
    html = `<${node.type}><button onclick="addNode(${node.id})">Добавить</button></${node.type}>`;
  }
  return html;
}
