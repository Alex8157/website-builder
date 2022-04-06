import { VirtualNode } from './virtualNode.js';
import { Buffer } from './buffer.js';
import { ButtonBar } from './buttonBar.js';
import { ActiveBarBuffer } from './activeBarBuffer.js';
import { AddBlock } from './addBlock.js';
import { ChangeBlock } from './changeBlock.js';
import { AddImg } from './addImg.js';

const activeBarBuffer = new ActiveBarBuffer();
const buffer = new Buffer();
const addBlock = new AddBlock();
const changeBlock = new ChangeBlock();
const addImg = new AddImg();

document.body.appendChild(addBlock.DOMElement);
document.body.appendChild(changeBlock.DOMElement);
document.body.appendChild(addImg.DOMElement);

let selectBlock = '';
function selectNewBlock(node) {
  if (selectBlock) {
    selectBlock.canselSelect();
  }
  selectBlock = node;
  selectBlock.select();
}

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
        selectNewBlock(node);
      }
    });
    return node;
  }
  cloneNode(node) {
    const newNode = this.create(node.type);
    if (node.nodes.length > 0) {
      for (let i = 0; i < node.nodes.length; i++) {
        newNode.setText(node.getTextChild().textContent);
        newNode.setStyles(node.getStyles());
        newNode.addNode(this.cloneNode(node.nodes[i]));
      }
    } else {
      newNode.DOMElement = node.getDOMElement().cloneNode(true);
      newNode.getDOMElement().getElementsByClassName('buttonBar')[0].remove();
      const buttonBar = new ButtonBar(this.getHandlers(newNode));
      const bar = buttonBar.create();
      newNode.getDOMElement().appendChild(bar);
      newNode.getDOMElement().addEventListener('click', (event) => {
        if (newNode.getDOMElement() === event.target) {
          activeBarBuffer.setActiveBar(bar);
          selectNewBlock(newNode);
        }
      });
    }
    newNode.canselSelect();
    return newNode;
  }
  getHandlers(node) {
    return {
      add: {
        name: 'Добавить',
        handler: async () => {
          addBlock.DOMElement.setAttribute('open', 'open');
          const newNode = await addBlock.getContent();
          if ((newNode !== 'button') & (newNode !== 'img') & (newNode !== 'a')) {
            node.addNode(this.create(newNode));
          } else if (newNode === 'img') {
            node.addNode(this.create('div'));
            addImg.DOMElement.setAttribute('open', 'open');
            node.getLastChild().addNode(this.create(newNode));
            node.getLastChild().getLastChild().DOMElement.style = '';
            node
              .getLastChild()
              .getLastChild()
              .DOMElement.setAttribute('src', await addImg.getSrc());
          }
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
          node.setData(await changeBlock.returnData(node.getStyles(), node.getTextChild().textContent));
        }
      },
      hide: {
        name: 'Скрыть',
        handler: async () => {
          node.canselSelect();
          activeBarBuffer.hideActiveBar();
        }
      }
    };
  }
}
