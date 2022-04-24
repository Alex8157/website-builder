const cardDOM = `<p id="textInAddImgVideo">777</p>
<input>
<button>Применить</button>`;

const defaultStyle = {
  zIndex: '10',
  top: '40%',
  position: 'fixed',
  border: '1px solid black',
  borderRadius: '5px'
};

export class AddImgVideo {
  constructor() {
    this.src = '';
    this.DOMElement = document.createElement('dialog');
    this.DOMElement.innerHTML = cardDOM;
    this.textForImg = 'Вставьте ссылку на изображение:';
    this.textForVideo = 'Вставьте ссылку на видео:';

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
  getSrc(type) {
    return new Promise((resolve) => {
      if (type === 'img') {
        document.getElementById('textInAddImgVideo').innerHTML = this.textForImg;
      } else if (type === 'video') {
        document.getElementById('textInAddImgVideo').innerHTML = this.textForVideo;
      }
      const listener = () => {
        resolve(this.src);
        this.DOMElement.removeEventListener('src-set', listener);
      };
      this.DOMElement.addEventListener('src-set', listener);
    });
  }
}
