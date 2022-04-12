const cardDOM = `<p>Вставьте ссылку на изображение:</p>
<input>
<button>Применить</button>`;

const defaultStyle = {
  zIndex: '10',
  top: '40%',
  position: 'fixed',
  border: '1px solid black',
  borderRadius: '5px'
};

export class AddImg {
  constructor() {
    this.src = '';
    this.DOMElement = document.createElement('dialog');
    this.DOMElement.innerHTML = cardDOM;

    Object.assign(this.DOMElement.style, defaultStyle);

    this.DOMElement.getElementsByTagName('button')[0].addEventListener('click', () => {
      this.setSrc(this.DOMElement.getElementsByTagName('input')[0].value);
    });
  }
  setSrc(src) {
    this.src = src;
    this.DOMElement.removeAttribute('open');
    this.DOMElement.dispatchEvent(new Event('src-set'));
  }
  getSrc() {
    return new Promise((resolve) => {
      const listener = () => {
        resolve(this.src);
        this.DOMElement.removeEventListener('src-set', listener);
      };
      this.DOMElement.addEventListener('src-set', listener);
    });
  }
}
