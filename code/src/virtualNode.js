const defaultStyle = {
  height: '100%',
  width: '100%',

  paddingLeft: '5px',
  paddingTop: '5px',
  paddingRight: '5px',
  paddingBottom: '5px',
  marginLeft: '0',
  marginTop: '0',
  marginRight: '0',
  marginBottom: '0',

  backgroundColor: 'rgba(245, 247, 250, 0.8)',

  display: 'flex',
  flexDirection: 'column',

  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'rgb(10, 0, 70)',
  borderRadius: '5px',

  whiteSpace: 'pre-line'
};

export class VirtualNode {
  constructor(type) {
    this.father = {};
    this.type = type;
    this.nodes = [];
    this.DOMElement = document.createElement(type);

    Object.assign(this.DOMElement.style, defaultStyle);
  }
  getLastChild() {
    return this.nodes[this.nodes.length - 1];
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

    this.DOMElement.style.paddingLeft = styles.paddingLeft;
    this.DOMElement.style.paddingTop = styles.paddingTop;
    this.DOMElement.style.paddingRight = styles.paddingRight;
    this.DOMElement.style.paddingBottom = styles.paddingBottom;
    this.DOMElement.style.marginLeft = styles.marginLeft;
    this.DOMElement.style.marginTop = styles.marginTop;
    this.DOMElement.style.marginRight = styles.marginRight;
    this.DOMElement.style.marginBottom = styles.marginBottom;

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
  select() {
    this.DOMElement.style.outline = '3px solid red';
    this.DOMElement.style.zIndex = '9';
  }
  canselSelect() {
    this.DOMElement.style.outline = '0px solid red';
    this.DOMElement.style.zIndex = '0';
  }
}
