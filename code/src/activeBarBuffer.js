export class ActiveBarBuffer {
  constructor() {
    this.activeBar = null;
  }

  setActiveBar(bar) {
    if (this.activeBar) {
      this.activeBar.style.display = 'none';
    }
    if (bar) {
      document.getElementsByTagName('body')[0].style.padding = '50px 3px 3px 3px';
      this.activeBar = bar;
      this.activeBar.style.display = 'flex';
    }
  }
  hideActiveBar() {
    this.activeBar.style.display = 'none';
    document.getElementsByTagName('body')[0].style.padding = '0';
  }
}
