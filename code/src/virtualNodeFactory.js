import { VirtualNode } from './virtualNode.js';
import { Buffer } from './buffer.js';
import { ButtonBar } from './buttonBar.js';
import { ActiveBarBuffer } from './activeBarBuffer.js';
import { AddBlock } from './addBlock.js';
import { ChangeBlock } from './changeBlock.js';
import { AddImg } from './addImg.js';
import { AddA } from './addA.js';

const activeBarBuffer = new ActiveBarBuffer();
const buffer = new Buffer();
const addBlock = new AddBlock();
const changeBlock = new ChangeBlock();
const addImg = new AddImg();
const addA = new AddA();

document.body.appendChild(addBlock.DOMElement);
document.body.appendChild(changeBlock.DOMElement);
document.body.appendChild(addImg.DOMElement);
document.body.appendChild(addA.DOMElement);

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
          const nodeName = await addBlock.getContent();
          if ((nodeName !== 'input') & (nodeName !== 'textarea') & (nodeName !== 'img') & (nodeName !== 'a')) {
            node.addNode(this.create(nodeName));
          } else if (nodeName === 'img') {
            this.addImg(node);
          } else if (nodeName === 'a') {
            this.addA(node);
          } else if (nodeName === 'textarea') {
            this.addTextarea(node);
          } else if (nodeName === 'input') {
            this.addInput(node);
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

  async addImg(node) {
    node.addNode(this.create('div'));
    addImg.DOMElement.setAttribute('open', 'open');
    node.getLastChild().addNode(this.create('img'));
    node.getLastChild().getLastChild().DOMElement.style = '';
    node
      .getLastChild()
      .getLastChild()
      .DOMElement.setAttribute('src', await addImg.getSrc());
  }
  async addA(node) {
    node.addNode(this.create('div'));
    addA.DOMElement.setAttribute('open', 'open');
    node.getLastChild().addNode(this.create('a'));
    node.getLastChild().getLastChild().DOMElement.style = '';
    const data = await addA.getData();
    node.getLastChild().getLastChild().DOMElement.innerHTML = data.text;
    node.getLastChild().getLastChild().DOMElement.href = data.href;

    node
      .getLastChild()
      .getLastChild()
      .DOMElement.addEventListener(
        'click',
        function (e) {
          e.preventDefault();
          alert('Сейчас переход по ссылке недоступен');
        },
        false
      );

    // addA.DOMElement.setAttribute('open', 'open');
    // const data = await addA.getData();
    // node.addNode(this.create('a'));
    // node.getLastChild().DOMElement.innerHTML = data.text;
    // node.getLastChild().DOMElement.href = data.href;
    // node.getLastChild().DOMElement.removeAttribute('width');
    // node.getLastChild().DOMElement.removeAttribute('height');
  }
  addTextarea(node) {
    node.addNode(this.create('div'));
    node.getLastChild().addNode(this.create('textarea'));
    node.getLastChild().getLastChild().DOMElement.style = '';
    node.getLastChild().getLastChild().DOMElement.style.width = '100%';
    node.getLastChild().getLastChild().DOMElement.style.height = '100%';
    node.getLastChild().getLastChild().DOMElement.style.backgroundColor = 'rgba(0,0,0,0)';
  }
  addInput(node) {
    node.addNode(this.create('div'));
    node.getLastChild().addNode(this.create('input'));
    node.getLastChild().getLastChild().DOMElement.style = '';
    node.getLastChild().getLastChild().DOMElement.style.width = '100%';
    node.getLastChild().getLastChild().DOMElement.style.height = '100%';
    node.getLastChild().getLastChild().DOMElement.style.border = '1px solid black';
    node.getLastChild().getLastChild().DOMElement.style.backgroundColor = 'rgba(0,0,0,0)';
  }
}
