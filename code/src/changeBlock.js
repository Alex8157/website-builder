const cardDOM = '<p>Цвет<input id="colorPicker" type="color"></p><button>Применить</button>';

export class ChangeBlock {
  constructor() {
    this.content = '';
    this.DOMElement = document.createElement('dialog');
    this.DOMElement.innerHTML = cardDOM;

    this.DOMElement.style.zIndex = '10';
    this.DOMElement.style.top = '40%';
    this.DOMElement.style.border = '2px solid rgb(10, 0, 70)';
    this.DOMElement.style.borderRadius = '5px';

    const buttons = this.DOMElement.getElementsByTagName('button');
    buttons[0].style.minWidth = '50px';
    buttons[0].addEventListener('click', () => {
      this.DOMElement.dispatchEvent(new Event('style-set'));
    });
  }
  returnStyles(style) {
    document.getElementById('colorPicker').value = style;
    return new Promise((resolve) => {
      const listener = () => {
        const colorPickerColor = document.getElementById('colorPicker').value;
        this.DOMElement.removeAttribute('open');
        resolve(colorPickerColor);
        this.DOMElement.removeEventListener('style-set', listener);
      };
      this.DOMElement.addEventListener('style-set', listener);
    });
  }
}
