export class ButtonFactory {
  create(name) {
    const button = document.createElement('button');
    button.innerHTML = name;
    return button;
  }
}
