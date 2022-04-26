const cardDOM = `
  <p style="margin-bottom:10px">Файл вашего сайта будет сохранён в папку загрузок,<br>
  указанную в настройках браузера.<br></p>
  <a href=# id='saveSite' 
  style="text-decoration: none; border:1px solid black; padding:3px; 
  border-radius:3px; background-color:rgb(239,239,239); color:black">
  Сохранить
  </a>
`;

const defaultStyle = {
  textAlign: 'center',
  zIndex: '100',
  top: '40%',
  position: 'fixed',
  border: '1px solid black',
  borderRadius: '5px'
};

export class SavePanel {
  constructor() {
    this.DOMElement = document.createElement('dialog');
    this.DOMElement.innerHTML = cardDOM;

    Object.assign(this.DOMElement.style, defaultStyle);
  }
}
