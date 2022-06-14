export class Buffer {
  constructor() {
    this.obj = {};
  }
  save(obj) {
    this.obj = obj;
  }
  get() {
    return this.obj;
  }
}
