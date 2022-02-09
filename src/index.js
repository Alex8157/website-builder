const body = document.getElementsByTagName('body');

class ButtonFactory {
  create(name) {
    const button = document.createElement('button');
    button.innerHTML = name;
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
  deleteNode() {
    this.DOMElement.remove();
  }
  getDOMElement() {
    return this.DOMElement;
  }
}

class ButtonBar {
  constructor(handlers) {
    this.handlers = handlers;
  }
  create() {
    const node = document.createElement('div');
    const buttonFactory = new ButtonFactory();
    for (const key in this.handlers) {
      const button = buttonFactory.create(this.handlers[key].name);
      button.addEventListener('click', this.handlers[key].handler);
      node.appendChild(button);
    }
    return node;
  }
}

class VirtualNodeFactory {
  create(type) {
    const node = new VirtualNode(type);
    const buttonBar = new ButtonBar(this.getHandlers(node));
    node.getDOMElement().appendChild(buttonBar.create());
    return node;
  }
  getHandlers(node) {
    return {
      add: {
        name: 'Добавить',
        handler: () => {
          node.addNode(this.create('div'));
        }
      },
      delete: {
        name: 'Удалить',
        handler: () => {
          node.deleteNode();
        }
      }
    };
  }
}

document.addEventListener('DOMContentLoaded', start());

function start() {
  const nodeFactory = new VirtualNodeFactory();
  const root = nodeFactory.create('div');

  body[0].appendChild(root.getDOMElement());
}
