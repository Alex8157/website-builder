const cardDOM =
  '<p>Выберите блок, который желаете создать</p><button>div</button><button>p</button><button>button</button><button>textarea</button><button>article</button>';
const defaultStyle = {
  zIndex: '10',
  top: '40%',
  border: '2px solid rgb(10, 0, 70)',
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
        this.setContent(button.innerHTML);
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
