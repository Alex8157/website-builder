import { rgbToHex, hexToRGB } from './rgbToHex.js';

const cardDOM = `
<div>
  <h4 style="margin:0">Настройки блока</h4>
  Высота блока (в % от родительского блока):
  <input id="heightBlock" style="width:30px"><br>
  Ширина блока (в % от родительского блока):
  <input id="widthBlock" style="width:30px"><br>
  <div>Размер блока по содержимому:
  <input type="checkbox" id="sizeByContentCheckbox" style="margin:0"></div>
  Ориентация внутри блока:
  <input class="orientationRadio" type="radio" name="orientation" value="row">Ряд
  <input class="orientationRadio" type="radio" name="orientation" value="column">Колонка</div><br>
</div>
<div>
  <h4 style="margin:0">Настройки отступов</h4>
  Отступ внутри блока слева (в пикселях):
  <input id="paddingBlockLeft" style="width:40px"><br>
  Отступ внутри блока сверху (в пикселях):
  <input id="paddingBlockTop" style="width:40px"><br>
  Отступ внутри блока справа (в пикселях):
  <input id="paddingBlockRight" style="width:40px"><br>
  Отступ внутри блока снизу (в пикселях):
  <input id="paddingBlockBottom" style="width:40px"><br><br>

  Отступ снаружи блока слева (в пикселях):
  <input id="marginBlockLeft" style="width:40px"><br>
  Отступ снаружи блока сверху (в пикселях):
  <input id="marginBlockTop" style="width:40px"><br>
  Отступ снаружи блока справа (в пикселях):
  <input id="marginBlockRight" style="width:40px"><br>
  Отступ снаружи блока снизу (в пикселях):
  <input id="marginBlockBottom" style="width:40px"><br><br>
</div>
<div>
  <h4 style="margin:0">Настройки фона</h4>
  Цвет фона:&nbsp<input id="colorPicker" type="color"><br>
  Прозрачность фона (в %):&nbsp<input id="opacity" style="width:30px"><br>
  Использовать в качестве фона изображение:
  <input type="checkbox" id="backgroundImageCheckbox" style="margin:0"><br>
  Ссылка на изображение:&nbsp<input id="backgroundImageURL" style="width:130px"><br><br>
</div>
<div>
  <h4 style="margin:0">Настройки рамки</h4>
  Толщина рамки (в пикселях):&nbsp<input id="borderWidth" style="width:30px"><br>
  Стиль рамки:&nbsp
  <select id="selectBorderStyle">
    <option id="selectBorderStyleNone" value="none">Нет</option>
    <option id="selectBorderStyleSolid" value="solid">Сплошной</option>
    <option id="selectBorderStyleDouble" value="double">Двойной</option>
    <option id="selectBorderStyleDashed" value="dashed">Пунктир</option>
  </select><br>
  Цвет рамки:&nbsp<input id="borderColor" type="color"><br>
  Радиус скругления рамки (в пикселях):&nbsp<input id="borderRadius" style="width:30px"><br><br>
</div>
<div>
  <h4 style="margin:0">Настройки текста</h4>
  Размер шрифта (в пикселях):
  <input id="fontSize" style="width:30px"><br>
  Цвет текста:
  <input type="color"  id="colorPickerText"><br>
  Жирный текст:
  <input type="checkbox" id="fontWeightCheckbox" style="margin:0"><br>
  Курсив:
  <input type="checkbox" id="fontStyleCheckbox" style="margin:0"><br>
  Текст:<br>
  <textarea id="textChangeBlock" style="min-width:100%; min-height:100px;"></textarea><br>
</div>
<div>
  <button>Применить</button>
</div>
`;

const defaultStyle = {
  zIndex: '10',
  top: '5%',
  position: 'fixed',
  border: '1px solid black',
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

        if (document.getElementById('sizeByContentCheckbox').checked) {
          data.styles.height = 'min-content';
          data.styles.width = 'min-content';
        } else {
          data.styles.height = `${document.getElementById('heightBlock').value}%`;
          data.styles.width = `${document.getElementById('widthBlock').value}%`;
        }

        data.styles.paddingLeft = `${document.getElementById('paddingBlockLeft').value}px`;
        data.styles.paddingTop = `${document.getElementById('paddingBlockTop').value}px`;
        data.styles.paddingRight = `${document.getElementById('paddingBlockRight').value}px`;
        data.styles.paddingBottom = `${document.getElementById('paddingBlockBottom').value}px`;
        data.styles.marginLeft = `${document.getElementById('marginBlockLeft').value}px`;
        data.styles.marginTop = `${document.getElementById('marginBlockTop').value}px`;
        data.styles.marginRight = `${document.getElementById('marginBlockRight').value}px`;
        data.styles.marginBottom = `${document.getElementById('marginBlockBottom').value}px`;

        data.styles.backgroundColor = `${hexToRGB(document.getElementById('colorPicker').value).slice(0, -1)}, ${
          1 - document.getElementById('opacity').value / 100
        })`;
        data.styles.borderStyle = document.getElementById('selectBorderStyle').value;
        data.styles.borderWidth = `${document.getElementById('borderWidth').value}px`;
        data.styles.borderColor = document.getElementById('borderColor').value;
        data.styles.borderRadius = `${document.getElementById('borderRadius').value}px`;
        data.styles.fontSize = `${document.getElementById('fontSize').value}px`;
        data.styles.color = document.getElementById('colorPickerText').value;
        if (document.getElementById('backgroundImageCheckbox').checked) {
          data.styles.backgroundImage = document.getElementById('backgroundImageURL').value;
        } else {
          data.styles.backgroundImage = '';
        }
        if (document.getElementById('fontWeightCheckbox').checked) {
          data.styles.fontWeight = 'bold';
        } else {
          data.styles.fontWeight = 'normal';
        }
        if (document.getElementById('fontStyleCheckbox').checked) {
          data.styles.fontStyle = 'italic';
        } else {
          data.styles.fontStyle = 'normal';
        }
        data.styles.flexDirection = this.returnNewFlexDirection();

        this.DOMElement.removeAttribute('open');
        resolve(data);
        this.DOMElement.removeEventListener('style-set', listener);
      };
      this.DOMElement.addEventListener('style-set', listener);
    });
  }
  applyStylesToBlock(style, text) {
    this.checkHeightWidth(style);

    document.getElementById('paddingBlockLeft').value = style.paddingLeft.slice(0, -2);
    document.getElementById('paddingBlockTop').value = style.paddingTop.slice(0, -2);
    document.getElementById('paddingBlockRight').value = style.paddingRight.slice(0, -2);
    document.getElementById('paddingBlockBottom').value = style.paddingBottom.slice(0, -2);

    document.getElementById('marginBlockLeft').value = style.marginLeft.slice(0, -2);
    document.getElementById('marginBlockTop').value = style.marginTop.slice(0, -2);
    document.getElementById('marginBlockRight').value = style.marginRight.slice(0, -2);
    document.getElementById('marginBlockBottom').value = style.marginBottom.slice(0, -2);

    document.getElementById('colorPicker').value = rgbToHex(style.backgroundColor);
    document.getElementById('borderColor').value = rgbToHex(style.borderColor);
    document.getElementById('borderRadius').value = style.borderRadius.slice(0, -2);
    document.getElementById('borderWidth').value = style.borderWidth.slice(0, -2);
    document.getElementById('fontSize').value = style.fontSize.slice(0, -2);
    document.getElementById('colorPickerText').value = rgbToHex(style.color);
    document.getElementById('textChangeBlock').value = text;

    if (style.backgroundImage.slice(5, -2)) {
      document.getElementById('backgroundImageCheckbox').checked = 'checked';
      document.getElementById('backgroundImageURL').value = style.backgroundImage.slice(5, -2);
    } else {
      document.getElementById('backgroundImageCheckbox').checked = '';
    }

    if (style.fontWeight === 'bold') {
      document.getElementById('fontWeightCheckbox').checked = 'checked';
    } else {
      document.getElementById('fontWeightCheckbox').checked = '';
    }
    if (style.fontStyle === 'italic') {
      document.getElementById('fontStyleCheckbox').checked = 'checked';
    } else {
      document.getElementById('fontStyleCheckbox').checked = '';
    }

    this.applyBackgroundColor(style.backgroundColor);
    this.applyBorderStyle(style.borderStyle);
    this.applyflexDirection(style.flexDirection);
  }
  checkHeightWidth(style) {
    if (style.height === 'min-content' && style.width === 'min-content') {
      document.getElementById('sizeByContentCheckbox').checked = 'checked';
      document.getElementById('heightBlock').value = '';
      document.getElementById('widthBlock').value = '';
    } else {
      document.getElementById('sizeByContentCheckbox').checked = '';
      document.getElementById('heightBlock').value = style.height.slice(0, -1);
      document.getElementById('widthBlock').value = style.width.slice(0, -1);
    }
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
