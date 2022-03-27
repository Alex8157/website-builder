const defaultStyle = {
  height: '100%',
  width: '100%',

  padding: '5px',
  margin: '0',

  backgroundColor: 'rgba(240, 240, 240, 1)',

  display: 'flex',
  flexDirection: 'column',

  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'rgb(10, 0, 70)',
  borderRadius: '5px',

  whiteSpace: 'pre'
};

export class VirtualNode {
  constructor(type) {
    this.father = {};
    this.type = type;
    this.nodes = [];
    this.DOMElement = document.createElement(type);

    Object.assign(this.DOMElement.style, defaultStyle);
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
    this.DOMElement.style.height = styles.height;
    this.DOMElement.style.width = styles.width;
    this.DOMElement.style.padding = styles.padding;
    this.DOMElement.style.margin = styles.margin;
    this.DOMElement.style.flexDirection = styles.flexDirection;
    this.DOMElement.style.backgroundColor = styles.backgroundColor;
    this.DOMElement.style.borderStyle = styles.borderStyle;
    this.DOMElement.style.borderWidth = styles.borderWidth;
    this.DOMElement.style.borderColor = styles.borderColor;
    this.DOMElement.style.borderRadius = styles.borderRadius;
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
