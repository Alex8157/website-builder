const cardDOM = `<p>Выберите блок, который хотите создать:</p>
  <button value = 'div'>Пустой блок</button>
  <button value = 'article'>Статья</button>
  <button value = 'p'>Параграф</button><br>
  <button value = 'button'>Кнопка</button>
  <button value = 'img'>Изображение</button>
  <button value = 'video'>Видео</button>
  <button value = 'a'>Ссылка</button><br>
  <button value = 'input'>Поле для ввода текста (одна строка)</button><br>
  <button value = 'textarea'>Поле для ввода текста (несколько строк)</button>`;
const defaultStyle = {
  zIndex: '10',
  top: '40%',
  position: 'fixed',
  border: '1px solid black',
  borderRadius: '5px'
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
