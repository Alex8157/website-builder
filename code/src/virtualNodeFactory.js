import { VirtualNode } from './virtualNode.js';
import { Buffer } from './buffer.js';
import { ButtonBar } from './buttonBar.js';
import { ActiveBarBuffer } from './activeBarBuffer.js';
import { AddBlock } from './addBlock.js';
import { ChangeBlock } from './changeBlock.js';

const activeBarBuffer = new ActiveBarBuffer();
const buffer = new Buffer();
const addBlock = new AddBlock();
const changeBlock = new ChangeBlock();

document.body.appendChild(addBlock.DOMElement);
document.body.appendChild(changeBlock.DOMElement);

export class VirtualNodeFactory {
  create(type) {
    const node = new VirtualNode(type);
    const buttonBar = new ButtonBar(this.getHandlers(node));
    node.setClass('node');
    const bar = buttonBar.create();
    node.getDOMElement().appendChild(bar);
    node.getDOMElement().addEventListener('click', (event) => {
      if (node.getDOMElement() === event.target) {
        activeBarBuffer.setActiveBar(bar);
      }
    });
    return node;
  }
  cloneNode(node) {
    const newNode = this.create(node.type);
    if (node.nodes.length > 0) {
      for (let i = 0; i < node.nodes.length; i++) {
        newNode.addNode(this.cloneNode(node.nodes[i]));
      }
    } else {
      newNode.DOMElement = node.getDOMElement().cloneNode(true);

      const buttonBar = new ButtonBar(this.getHandlers(newNode));
      newNode.getDOMElement().getElementsByClassName('buttonBar')[0].remove();
      const bar = buttonBar.create();
      newNode.getDOMElement().appendChild(bar);
      newNode.getDOMElement().addEventListener('click', (event) => {
        if (newNode.getDOMElement() === event.target) {
          activeBarBuffer.setActiveBar(bar);
        }
      });

      return newNode;
    }
    return newNode;
  }
  getHandlers(node) {
    return {
      add: {
        name: 'Добавить',
        handler: async () => {
          addBlock.DOMElement.setAttribute('open', 'open');

          node.addNode(this.create(await addBlock.getContent()));
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
          buffer.save(this.cloneNode(node));
        }
      },
      cut: {
        name: 'Вырезать',
        handler: () => {
          buffer.save(this.cloneNode(node));
          node.deleteNode();
        }
      },
      insert: {
        name: 'Вставить',
        handler: () => {
          node.addNode(this.cloneNode(buffer.get()));
        }
      },
      change: {
        name: 'Редактировать',
        handler: async () => {
          changeBlock.DOMElement.setAttribute('open', 'open');

          node.setStyles(await changeBlock.returnStyles(node.getStyles()));
        }
      }
    };
  }
}
