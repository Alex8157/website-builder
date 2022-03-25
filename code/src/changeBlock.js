import { rgbToHex } from './rgbToHex.js';

const cardDOM = `
<div>Цвет:&nbsp<input id="colorPicker" type="color"><br>
Прозрачность (в %):&nbsp<input id="opacity" style="width:30px"></div><br>
  <div>Толщина рамки (в пикселях):&nbsp<input id="borderWidth" style="width:30px"><br>
  Стиль рамки:&nbsp
  <select id="selectBorderStyle">
    <option id="selectBorderStyleNone" value="none">Нет</option>
    <option id="selectBorderStyleSolid" value="solid">Сплошной</option>
    <option id="selectBorderStyleDouble" value="double">Двойной</option>
    <option id="selectBorderStyleDashed" value="dashed">Пунктир</option>
  </select><br>
  Цвет рамки:&nbsp<input id="borderColor" type="color"><br>
  Радиус скругления рамки (в пикселях):&nbsp<input id="borderRadius" style="width:30px"></div><br>
  <div>Ориентация внутри блока:<br>
  <input class="orientationRadio" type="radio" name="orientation" value="row">Ряд
  <input class="orientationRadio" type="radio" name="orientation" value="column">Колонка</div><br>
  <div>Тескт:&nbsp<textarea id="textChangeBlock" style="min-width:200px; min-height:100px;"></textarea></div><br>
  <div><button>Применить</button></div>
  `;
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
    document.getElementById('colorPicker').value = rgbToHex(style.backgroundColor);
    document.getElementById('opacity').value = Math.round((1 - style.opacity) * 100);
    document.getElementById('borderWidth').value = style.borderWidth.slice(0, -2);
    switch (style.borderStyle) {
      case 'none':
        document.getElementById('selectBorderStyleNone').setAttribute('selected', 'selected');
        break;
      case 'solid':
        document.getElementById('selectBorderStyleSolid').setAttribute('selected', 'selected');
        break;
      case 'double':
        document.getElementById('selectBorderStyleDouble').setAttribute('selected', 'selected');
        break;
      case 'dashed':
        document.getElementById('selectBorderStyleDashed').setAttribute('selected', 'selected');
        break;
      default:
        break;
    }
    document.getElementById('borderColor').value = rgbToHex(style.borderColor);
    document.getElementById('borderRadius').value = style.borderRadius.slice(0, -2);
    document.getElementById('textChangeBlock').value = text;
    if (style.flexDirection === 'row') {
      this.DOMElement.getElementsByClassName('orientationRadio')[0].checked = true;
    } else {
      this.DOMElement.getElementsByClassName('orientationRadio')[1].checked = true;
    }
    return new Promise((resolve) => {
      const listener = () => {
        const data = {
          styles: {},
          text: document.getElementById('textChangeBlock').value
        };
        Object.assign(data.styles, style);
        data.styles.backgroundColor = document.getElementById('colorPicker').value;
        data.styles.opacity = 1 - document.getElementById('opacity').value / 100;
        data.styles.borderStyle = document.getElementById('selectBorderStyle').value;
        data.styles.borderWidth = `${document.getElementById('borderWidth').value}px`;
        data.styles.borderColor = document.getElementById('borderColor').value;
        data.styles.borderRadius = `${document.getElementById('borderRadius').value}px`;
        if (this.DOMElement.getElementsByClassName('orientationRadio')[0].checked === true) {
          data.styles.flexDirection = 'row';
        } else {
          data.styles.flexDirection = 'column';
        }
        this.DOMElement.removeAttribute('open');
        resolve(data);
        this.DOMElement.removeEventListener('style-set', listener);
      };
      this.DOMElement.addEventListener('style-set', listener);
    });
  }
}
