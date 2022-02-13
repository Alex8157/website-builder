import { VirtualNode } from './virtualNode.js';
import { Buffer } from './buffer.js';
import { ButtonBar } from './buttonBar.js';

const buffer = new Buffer();

export class VirtualNodeFactory {
  create(type) {
    const node = new VirtualNode(type);
    const buttonBar = new ButtonBar(this.getHandlers(node));
    node.getDOMElement().appendChild(buttonBar.create());
    return node;
  }
  cloneNode(node) {
    const newNode = new VirtualNode(node.type);
    newNode.nodes = node.nodes;
    newNode.DOMElement = node.getDOMElement().cloneNode(true);
    return newNode;
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
      },
      copy: {
        name: 'Копировать',
        handler: () => {
          buffer.save(node);
        }
      },
      cut: {
        name: 'Вырезать',
        handler: () => {
          buffer.save(node);
          node.deleteNode();
        }
      },
      insert: {
        name: 'Вставить',
        handler: () => {
          node.addNode(this.cloneNode(buffer.get()));
        }
      }
    };
  }
}
