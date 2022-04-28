const cardDOM = `
  <div  style="display: flex;flex-direction: column">
  <div class="addBlockDiv">
    <p style="margin-bottom:5px">Выберите блок, который хотите создать:</p>
  </div>
  <div class="addBlockDiv">
    <button value = 'div'>Пустой блок</button>
    <button value = 'img'>Изображение</button>
    <button value = 'p'>Параграф</button>
  </div>
  <div class="addBlockDiv">
    <button value = 'article'>Статью</button>
    <button value = 'button'>Кнопку</button>
    <button value = 'video'>Видео</button>
    <button value = 'a'>Ссылку</button>
  </div>
  <div class="addBlockDiv">
    <button value = 'input'>Поле для ввода текста (одна строка)</button>
  </div>
  <div class="addBlockDiv">
    <button value = 'textarea'>Поле для ввода текста (несколько строк)</button>
  </div>
  </div>`;
const defaultStyle = {
  zIndex: '10',
  top: '40%',
  position: 'fixed',
  border: '1px solid rgb(49, 112, 143)',
  borderRadius: '5px',
  backgroundColor: 'rgb(143, 193, 226)'
};

export class AddBlock {
  constructor() {
    this.content = '';
    this.DOMElement = document.createElement('dialog');
    this.DOMElement.innerHTML = cardDOM;

    Object.assign(this.DOMElement.style, defaultStyle);

    const buttons = this.DOMElement.getElementsByTagName('button');
    for (const button of buttons) {
      button.style.minWidth = '50px';
      button.addEventListener('click', () => {
        this.setContent(button.value);
      });
    }
  }
  setContent(text) {
    this.content = text;
    this.DOMElement.removeAttribute('open');
    this.DOMElement.dispatchEvent(new Event('content-set'));
  }
  getContent() {
    return new Promise((resolve) => {
      const listener = () => {
        resolve(this.content);
        this.DOMElement.removeEventListener('content-set', listener);
      };
      this.DOMElement.addEventListener('content-set', listener);
    });
  }
}
