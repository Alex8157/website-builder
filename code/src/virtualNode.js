export class VirtualNode {
  constructor(type) {
    this.type = type;
    this.nodes = [];
    this.DOMElement = document.createElement(type);

    this.DOMElement.style.backgroundColor = 'rgb(240, 240, 240)';
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
    return this.DOMElement.style;
  }
  setStyles(styles) {
    this.DOMElement.style.backgroundColor = styles.backgroundColor;
  }
  getText() {
    const beginText = this.DOMElement.outerHTML.slice(this.DOMElement.outerHTML.indexOf('>'));
    return beginText.slice(1, beginText.indexOf('<'));
  }
  setText(text) {
    const checkHTML = this.DOMElement.outerHTML.slice(this.DOMElement.outerHTML.indexOf('>'));
    console.log(checkHTML[2]);
    if (checkHTML[2] === 'p') {
      const texts = this.DOMElement.getElementsByTagName('p');
      texts[0].innerHTML = text;
    } else {
      const newHTML = document.createElement('p');
      newHTML.innerHTML = text;
      this.DOMElement.insertBefore(newHTML, this.DOMElement.getElementsByClassName('buttonBar')[0]);
    }
  }
  setData(data) {
    this.setStyles(data.styles);
    this.setText(data.text);
  }
}
