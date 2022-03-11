import { rgbToHex } from './rgbToHex.js';

export class VirtualNode {
  constructor(type) {
    this.type = type;
    this.nodes = [];
    this.DOMElement = document.createElement(type);

    this.DOMElement.style.backgroundColor = '#ffffff';
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
  setClass(name) {
    this.DOMElement.className = name;
  }
  getStyles() {
    return rgbToHex(this.DOMElement.style.backgroundColor);
  }
  setStyles(styles) {
    this.DOMElement.style.backgroundColor = styles;
  }
}
