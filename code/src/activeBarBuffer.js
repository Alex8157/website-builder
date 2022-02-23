export class ActiveBarBuffer {
  constructor() {
    this.activeBar = null;
  }

  setActiveBar(bar) {
    if (this.activeBar) {
      this.activeBar.style.display = 'none';
    }
    if (bar) {
      this.activeBar = bar;
      this.activeBar.style.display = 'flex';
    }
  }
}
