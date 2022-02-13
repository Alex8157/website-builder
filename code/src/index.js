const body = document.getElementsByTagName('body');

import { VirtualNodeFactory } from './virtualNodeFactory.js';

document.addEventListener('DOMContentLoaded', start());

function start() {
  const nodeFactory = new VirtualNodeFactory();
  const root = nodeFactory.create('div');

  body[0].appendChild(root.getDOMElement());
}
