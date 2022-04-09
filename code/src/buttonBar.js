import { ButtonFactory } from './buttonFactory.js';

const defaultStyle = {
  zIndex: '10',
  position: 'fixed',
  top: '16px',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  border: '1px solid black',
  borderRadius: '5px',
  flexDirection: 'row'
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
      bar.appendChild(button);
    }
    bar.className = 'buttonBar';
    Object.assign(bar.style, defaultStyle);
    return bar;
  }
}
