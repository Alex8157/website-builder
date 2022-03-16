export class VirtualNode {
  constructor(type) {
    this.father = {};
    this.type = type;
    this.nodes = [];
    this.DOMElement = document.createElement(type);

    this.DOMElement.style.backgroundColor = 'rgb(240, 240, 240)';
  }
  addNode(node) {
    this.nodes.push(node);
    this.DOMElement.appendChild(node.getDOMElement());
    node.father = this;
  }
  deleteNode() {
    if (Object.keys(this.father).length) {
      this.father.nodes.splice(this.father.nodes.indexOf(this), 1);
    }
    this.DOMElement.remove();
  }
  getDOMElement() {
    return this.DOMElement;
  }
  setClass(name) {
    this.DOMElement.className = name;
  }
  getStyles() {
    return this.DOMElement.style;
  }
  setStyles(styles) {
    this.DOMElement.style.backgroundColor = styles.backgroundColor;
  }
  setData({ styles, text }) {
    this.setStyles(styles);
    this.setText(text);
  }
  getTextChild() {
    for (const child of this.DOMElement.childNodes) {
      if (child.nodeName === '#text' && child.textContent.trim().length) return child;
    }

    const textNode = document.createTextNode('');
    this.DOMElement.insertBefore(textNode, this.DOMElement.getElementsByClassName('buttonBar')[0]);
    return textNode;
  }
  setText(text) {
    const textNode = this.getTextChild();
    textNode.textContent = text;
  }
}
