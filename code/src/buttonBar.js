import { ButtonFactory } from './buttonFactory.js';

const defaultStyle = {
  zIndex: '5',
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '47px',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgb(143, 193, 226)'
};

const buttonDefaultStyle = {
  margin: '0 1% 0 1%'
};

export class ButtonBar {
  constructor(handlers) {
    this.handlers = handlers;
  }
  create() {
    const bar = document.createElement('div');
    const buttonFactory = new ButtonFactory();
    for (const key in this.handlers) {
      const button = buttonFactory.create(this.handlers[key].name);
      button.addEventListener('click', this.handlers[key].handler);
      Object.assign(button.style, buttonDefaultStyle);
      bar.appendChild(button);
    }
    bar.className = 'buttonBar';
    Object.assign(bar.style, defaultStyle);
    return bar;
  }
}
