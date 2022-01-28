const body = document.getElementsByTagName('body');

class ButtonFactory {
  create() {
    const button = document.createElement('button');
    button.innerHTML = 'Добавить';
    return button;
  }
}

class VirtualNode {
  constructor(type) {
    this.type = type;
    this.nodes = [];
    this.DOMElement = document.createElement(type);
  }
  addNode(node) {
    this.nodes.push(node);
    this.DOMElement.appendChild(node.getDOMElement());
  }
  getDOMElement() {
    return this.DOMElement;
  }
}

class VirtualNodeFactory {
  create(type) {
    const node = new VirtualNode(type);
    const buttonFactory = new ButtonFactory();
    const button = buttonFactory.create();
    button.addEventListener('click', () => {
      node.addNode(this.create('div'));
    });
    node.getDOMElement().appendChild(button);
    return node;
  }
}

document.addEventListener('DOMContentLoaded', start());

function start() {
  const nodeFactory = new VirtualNodeFactory();
  const root = nodeFactory.create('div');

  body[0].appendChild(root.getDOMElement());
}
