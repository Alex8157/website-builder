import { rgbToHex, hexToRGB } from './rgbToHex.js';

const cardDOM = `
<div>Высота блока (в %):
<input id="heightBlock" style="width:30px"><br>
<div>Ширина блока (в %):
<input id="widthBlock" style="width:30px"><br><br>
<div>Отступ внутри блока (в пикселях):
<input id="paddingBlock" style="width:30px"><br>
<div>Отступ снаружи блока (в пикселях):
<input id="marginBlock" style="width:30px"><br><br>
<div>Ориентация внутри блока:<br>
  <input class="orientationRadio" type="radio" name="orientation" value="row">Ряд
  <input class="orientationRadio" type="radio" name="orientation" value="column">Колонка</div><br>
<div>Цвет фона:&nbsp<input id="colorPicker" type="color"><br>
Прозрачность фона (в %):&nbsp<input id="opacity" style="width:30px"></div><br>
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
<div>Тескт:<br><textarea id="textChangeBlock" style="min-width:200px; min-height:100px;"></textarea></div><br>
<div><button>Применить</button></div>
`;

const defaultStyle = {
  zIndex: '10',
  top: '10%',
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
    this.applyStylesToBlock(style, text);
    return new Promise((resolve) => {
      const listener = () => {
        const data = {
          styles: {},
          text: document.getElementById('textChangeBlock').value
        };
        Object.assign(data.styles, style);

        data.styles.height = `${document.getElementById('heightBlock').value}%`;
        data.styles.width = `${document.getElementById('widthBlock').value}%`;
        data.styles.padding = `${document.getElementById('paddingBlock').value}px`;
        data.styles.margin = `${document.getElementById('marginBlock').value}px`;
        data.styles.backgroundColor = `${hexToRGB(document.getElementById('colorPicker').value).slice(0, -1)}, ${
          1 - document.getElementById('opacity').value / 100
        })`;
        data.styles.borderStyle = document.getElementById('selectBorderStyle').value;
        data.styles.borderWidth = `${document.getElementById('borderWidth').value}px`;
        data.styles.borderColor = document.getElementById('borderColor').value;
        data.styles.borderRadius = `${document.getElementById('borderRadius').value}px`;
        data.styles.flexDirection = this.returnNewFlexDirection();

        this.DOMElement.removeAttribute('open');
        resolve(data);
        this.DOMElement.removeEventListener('style-set', listener);
      };
      this.DOMElement.addEventListener('style-set', listener);
    });
  }
  applyStylesToBlock(style, text) {
    document.getElementById('heightBlock').value = style.height.slice(0, -1);
    document.getElementById('widthBlock').value = style.width.slice(0, -1);
    document.getElementById('paddingBlock').value = style.padding.slice(0, -2);
    document.getElementById('marginBlock').value = style.margin.slice(0, -2);
    document.getElementById('colorPicker').value = rgbToHex(style.backgroundColor);
    document.getElementById('borderColor').value = rgbToHex(style.borderColor);
    document.getElementById('borderRadius').value = style.borderRadius.slice(0, -2);
    document.getElementById('borderWidth').value = style.borderWidth.slice(0, -2);
    document.getElementById('textChangeBlock').value = text;

    this.applyBackgroundColor(style.backgroundColor);
    this.applyBorderStyle(style.borderStyle);
    this.applyflexDirection(style.flexDirection);
  }
  applyBackgroundColor(backgroundColor) {
    if (backgroundColor.indexOf('rgba') !== -1) {
      let opacity = backgroundColor.slice(backgroundColor.indexOf(',') + 1);
      opacity = opacity.slice(opacity.indexOf(',') + 1);
      opacity = opacity.slice(opacity.indexOf(',') + 1);
      document.getElementById('opacity').value = Math.round((1 - opacity.slice(1, -1)) * 100);
    } else {
      document.getElementById('opacity').value = 0;
    }
  }
  applyBorderStyle(borderStyle) {
    document.getElementById('selectBorderStyleNone').removeAttribute('selected');
    document.getElementById('selectBorderStyleSolid').removeAttribute('selected');
    document.getElementById('selectBorderStyleDouble').removeAttribute('selected');
    document.getElementById('selectBorderStyleDashed').removeAttribute('selected');

    if (borderStyle === 'none') {
      document.getElementById('selectBorderStyleNone').setAttribute('selected', 'selected');
    } else if (borderStyle === 'solid') {
      document.getElementById('selectBorderStyleSolid').setAttribute('selected', 'selected');
    } else if (borderStyle === 'double') {
      document.getElementById('selectBorderStyleDouble').setAttribute('selected', 'selected');
    } else if (borderStyle === 'dashed') {
      document.getElementById('selectBorderStyleDashed').setAttribute('selected', 'selected');
    }
  }
  applyflexDirection(flexDirection) {
    if (flexDirection === 'row') {
      this.DOMElement.getElementsByClassName('orientationRadio')[0].checked = true;
    } else {
      this.DOMElement.getElementsByClassName('orientationRadio')[1].checked = true;
    }
  }
  returnNewFlexDirection() {
    if (this.DOMElement.getElementsByClassName('orientationRadio')[0].checked === true) {
      return 'row';
    } else {
      return 'column';
    }
  }
}
