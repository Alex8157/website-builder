import { rgbToHex } from './rgbToHex.js';

const cardDOM =
  'Цвет<input id="colorPicker" type="color"><br>Тескт<textarea id="textChangeBlock"></textarea><br><button>Применить</button>';
const defaultStyle = {
  zIndex: '10',
  top: '40%',
  border: '2px solid rgb(10, 0, 70)',
  borderRadius: '5px'
};

export class ChangeBlock {
  constructor() {
    this.content = '';
    this.DOMElement = document.createElement('dialog');
    this.DOMElement.innerHTML = cardDOM;

    Object.assign(this.DOMElement.style, defaultStyle);

    const buttons = this.DOMElement.getElementsByTagName('button');
    buttons[0].style.minWidth = '50px';
    buttons[0].addEventListener('click', () => {
      this.DOMElement.dispatchEvent(new Event('style-set'));
    });
  }
  returnData(style, text) {
    const color = rgbToHex(style.backgroundColor);
    document.getElementById('colorPicker').value = color;
    document.getElementById('textChangeBlock').value = text;
    return new Promise((resolve) => {
      const listener = () => {
        const data = {
          styles: {},
          text: document.getElementById('textChangeBlock').value
        };
        Object.assign(data.styles, style);
        data.styles.backgroundColor = document.getElementById('colorPicker').value;
        this.DOMElement.removeAttribute('open');
        resolve(data);
        this.DOMElement.removeEventListener('style-set', listener);
      };
      this.DOMElement.addEventListener('style-set', listener);
    });
  }
}
