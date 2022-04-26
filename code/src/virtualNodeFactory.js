import { VirtualNode } from './virtualNode.js';
import { Buffer } from './buffer.js';
import { ButtonBar } from './buttonBar.js';
import { ActiveBarBuffer } from './activeBarBuffer.js';
import { AddBlock } from './addBlock.js';
import { ChangeBlock } from './changeBlock.js';
import { AddImgVideo } from './addImgVideo.js';
import { AddA } from './addA.js';
import { SavePanel } from './savePanel.js';

const activeBarBuffer = new ActiveBarBuffer();
const buffer = new Buffer();
const addBlock = new AddBlock();
const changeBlock = new ChangeBlock();
const addImgVideo = new AddImgVideo();
const addA = new AddA();
const savePanel = new SavePanel();

document.body.appendChild(addBlock.DOMElement);
document.body.appendChild(changeBlock.DOMElement);
document.body.appendChild(addImgVideo.DOMElement);
document.body.appendChild(addA.DOMElement);
document.body.appendChild(savePanel.DOMElement);

const defaultStyles = `* {  box-sizing: border-box;}html {  height: 100vh;  width: 100vw;}
body {  padding: 3px;  margin: 0;  height: 100%;  width: 100%;}
button {  padding: 3px;  margin: 3px;  cursor: pointer;}p {margin: 0;}`;

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
    this.makeSaveListener();
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
          if (
            (nodeName !== 'input') &
            (nodeName !== 'textarea') &
            (nodeName !== 'img') &
            (nodeName !== 'video') &
            (nodeName !== 'a')
          ) {
            node.addNode(this.create(nodeName));
          } else if (nodeName === 'img') {
            this.addImg(node);
          } else if (nodeName === 'video') {
            this.addVideo(node);
          } else if (nodeName === 'a') {
            this.addA(node);
          } else if (nodeName === 'textarea' || nodeName === 'input') {
            this.addTextareaInput(node, nodeName);
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
      },
      save: {
        name: 'Сохранить',
        handler: () => {
          savePanel.DOMElement.setAttribute('open', 'open');
        }
      }
    };
  }
  makeSaveListener() {
    document.getElementById('saveSite').onclick = function () {
      let site = document.getElementsByClassName('node')[0].outerHTML;
      const buttonsBars = document.getElementsByClassName('buttonBar');

      for (const buttonsBar of buttonsBars) {
        site = site.split(buttonsBar.outerHTML).join('');
      }
      site = site.split('outline: red solid 3px;').join('');
      site += `<style type="text/css"> ${defaultStyles} </style>`;

      const csvData = 'data:application/html;charset=utf-8,' + encodeURIComponent(site);
      this.href = csvData;
      this.target = '_blank';
      this.download = 'index.html';
      savePanel.DOMElement.removeAttribute('open');
    };
  }
  async addVideo(node) {
    node.addNode(this.create('div'));
    addImgVideo.DOMElement.setAttribute('open', 'open');
    const iframe = document.createElement('iframe');
    const url = await addImgVideo.getSrc('video');
    iframe.setAttribute('src', url.replace('youtu.be', 'www.youtube.com/embed'));
    node.getLastChild().DOMElement.appendChild(iframe);
  }
  async addImg(node) {
    node.addNode(this.create('div'));
    addImgVideo.DOMElement.setAttribute('open', 'open');
    const img = document.createElement('img');
    img.setAttribute('src', await addImgVideo.getSrc('img'));
    node.getLastChild().DOMElement.appendChild(img);
  }
  async addA(node) {
    node.addNode(this.create('div'));
    addA.DOMElement.setAttribute('open', 'open');
    const a = document.createElement('a');
    const data = await addA.getData();
    a.innerHTML = data.text;
    a.href = data.href;
    a.addEventListener(
      'click',
      function (e) {
        e.preventDefault();
        alert('Сейчас переход по ссылке недоступен');
      },
      false
    );
    node.getLastChild().DOMElement.appendChild(a);
  }
  addTextareaInput(node, type) {
    node.addNode(this.create('div'));
    const element = document.createElement(type);
    element.style.backgroundColor = 'rgba(0,0,0,0)';
    node.getLastChild().DOMElement.appendChild(element);
  }
}
