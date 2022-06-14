const cardDOM = `
<div style="display: flex;flex-direction: row;  align-items: flex-end;">
  <div>
    <p>Вставьте текст ссылки:</p>
    <input>
    <p style="margin-top:10px">Вставьте ссылку:</p>
    <input>
  </div>
  <div style="margin-left:10px">
    <button>Применить</button>
  </div>
</div>`;

const defaultStyle = {
  zIndex: '100',
  top: '40%',
  position: 'fixed',
  border: '1px solid rgb(49, 112, 143)',
  borderRadius: '5px',
  backgroundColor: 'rgb(143, 193, 226)'
};

export class AddA {
  constructor() {
    this.text = '';
    this.href = '';
    this.DOMElement = document.createElement('dialog');
    this.DOMElement.innerHTML = cardDOM;

    Object.assign(this.DOMElement.style, defaultStyle);

    this.DOMElement.getElementsByTagName('button')[0].addEventListener('click', () => {
      this.setData(
        this.DOMElement.getElementsByTagName('input')[0].value,
        this.DOMElement.getElementsByTagName('input')[1].value
      );
    });
  }
  setData(text, href) {
    this.text = text;
    this.href = href;
    console.log(this.text, this.href);
    this.DOMElement.removeAttribute('open');
    this.DOMElement.dispatchEvent(new Event('data-set'));
  }
  getData() {
    return new Promise((resolve) => {
      const listener = () => {
        resolve({ text: this.text, href: this.href });
        this.DOMElement.removeEventListener('data-set', listener);
      };
      this.DOMElement.addEventListener('data-set', listener);
    });
  }
}
