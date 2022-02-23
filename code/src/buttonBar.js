import { ButtonFactory } from './buttonFactory.js';

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
    return bar;
  }
}
