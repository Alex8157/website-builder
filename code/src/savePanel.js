const cardDOM = `
  <p style="margin-bottom:20px">Файл вашего сайта будет сохранён в папку загрузок,<br>
  указанную в настройках браузера.<br></p>
  <a href=# id='saveSite' 
  style="text-decoration: none;background-color: rgb(248, 249, 251);
  border:1px solid rgb(49, 112, 143); padding: 10px; margin: 3px;; 
  border-radius:3px; background-color:rgb(239,239,239); color:black">
  Сохранить
  </a>
`;

const defaultStyle = {
  textAlign: 'center',
  zIndex: '100',
  top: '40%',
  position: 'fixed',
  border: '1px solid rgb(49, 112, 143)',
  borderRadius: '5px',
  backgroundColor: 'rgb(143, 193, 226)'
};

export class SavePanel {
  constructor() {
    this.DOMElement = document.createElement('dialog');
    this.DOMElement.innerHTML = cardDOM;

    Object.assign(this.DOMElement.style, defaultStyle);
  }
}
