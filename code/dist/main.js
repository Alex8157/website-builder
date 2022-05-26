(()=>{"use strict";var __webpack_modules__={257:()=>{eval("\n;// CONCATENATED MODULE: ./src/virtualNode.js\nconst defaultStyle = {\r\n  height: '100%',\r\n  width: '100%',\r\n\r\n  paddingLeft: '5px',\r\n  paddingTop: '5px',\r\n  paddingRight: '5px',\r\n  paddingBottom: '5px',\r\n  marginLeft: '0',\r\n  marginTop: '0',\r\n  marginRight: '0',\r\n  marginBottom: '0',\r\n\r\n  backgroundColor: 'rgba(255, 255, 255, 1)',\r\n  backgroundImage: 'url()',\r\n  backgroundSize: '100%',\r\n\r\n  display: 'flex',\r\n  flexDirection: 'column',\r\n\r\n  borderWidth: '1px',\r\n  borderStyle: 'solid',\r\n  borderColor: 'rgb(49, 112, 143)',\r\n  borderRadius: '0',\r\n\r\n  fontSize: '16px',\r\n  fontWeight: 'normal',\r\n  fontStyle: 'normal',\r\n  color: 'rgb(0, 0, 0)',\r\n\r\n  whiteSpace: 'pre-line'\r\n};\r\n\r\nclass VirtualNode {\r\n  constructor(type) {\r\n    this.father = {};\r\n    this.type = type;\r\n    this.nodes = [];\r\n    this.DOMElement = document.createElement(type);\r\n\r\n    Object.assign(this.DOMElement.style, defaultStyle);\r\n  }\r\n  getLastChild() {\r\n    return this.nodes[this.nodes.length - 1];\r\n  }\r\n  addNode(node) {\r\n    this.nodes.push(node);\r\n    this.DOMElement.appendChild(node.getDOMElement());\r\n    node.father = this;\r\n  }\r\n  deleteNode() {\r\n    if (Object.keys(this.father).length) {\r\n      this.father.nodes.splice(this.father.nodes.indexOf(this), 1);\r\n    }\r\n    this.DOMElement.remove();\r\n  }\r\n  getDOMElement() {\r\n    return this.DOMElement;\r\n  }\r\n  setClass(name) {\r\n    this.DOMElement.className = name;\r\n  }\r\n  getStyles() {\r\n    return this.DOMElement.style;\r\n  }\r\n  setStyles(styles) {\r\n    this.DOMElement.style.height = styles.height;\r\n    this.DOMElement.style.width = styles.width;\r\n\r\n    this.DOMElement.style.paddingLeft = styles.paddingLeft;\r\n    this.DOMElement.style.paddingTop = styles.paddingTop;\r\n    this.DOMElement.style.paddingRight = styles.paddingRight;\r\n    this.DOMElement.style.paddingBottom = styles.paddingBottom;\r\n    this.DOMElement.style.marginLeft = styles.marginLeft;\r\n    this.DOMElement.style.marginTop = styles.marginTop;\r\n    this.DOMElement.style.marginRight = styles.marginRight;\r\n    this.DOMElement.style.marginBottom = styles.marginBottom;\r\n\r\n    this.DOMElement.style.flexDirection = styles.flexDirection;\r\n    this.DOMElement.style.backgroundColor = styles.backgroundColor;\r\n    this.DOMElement.style.borderStyle = styles.borderStyle;\r\n    this.DOMElement.style.borderWidth = styles.borderWidth;\r\n    this.DOMElement.style.borderColor = styles.borderColor;\r\n    this.DOMElement.style.borderRadius = styles.borderRadius;\r\n\r\n    this.DOMElement.style.fontSize = styles.fontSize;\r\n    this.DOMElement.style.fontWeight = styles.fontWeight;\r\n    this.DOMElement.style.fontStyle = styles.fontStyle;\r\n    this.DOMElement.style.color = styles.color;\r\n    this.DOMElement.style.backgroundImage = `url(${styles.backgroundImage})`;\r\n  }\r\n  setData({ styles, text }) {\r\n    this.setStyles(styles);\r\n    this.setText(text);\r\n  }\r\n  getTextChild() {\r\n    for (const child of this.DOMElement.childNodes) {\r\n      if (child.nodeName === '#text' && child.textContent.trim().length) return child;\r\n    }\r\n\r\n    const textNode = document.createTextNode('');\r\n    this.DOMElement.insertBefore(textNode, this.DOMElement.getElementsByClassName('buttonBar')[0]);\r\n    return textNode;\r\n  }\r\n  setText(text) {\r\n    const textNode = this.getTextChild();\r\n    textNode.textContent = text;\r\n  }\r\n  select() {\r\n    this.DOMElement.style.outline = '3px solid rgb(226,125,95)';\r\n    this.DOMElement.style.zIndex = '9';\r\n  }\r\n  canselSelect() {\r\n    this.DOMElement.style.outline = '0px solid rgb(226,125,95)';\r\n    this.DOMElement.style.zIndex = '0';\r\n  }\r\n}\r\n\n;// CONCATENATED MODULE: ./src/buffer.js\nclass Buffer {\r\n  constructor() {\r\n    this.obj = {};\r\n  }\r\n  save(obj) {\r\n    this.obj = obj;\r\n  }\r\n  get() {\r\n    return this.obj;\r\n  }\r\n}\r\n\n;// CONCATENATED MODULE: ./src/buttonFactory.js\nclass ButtonFactory {\r\n  create(name) {\r\n    const button = document.createElement('button');\r\n    button.innerHTML = name;\r\n    return button;\r\n  }\r\n}\r\n\n;// CONCATENATED MODULE: ./src/buttonBar.js\n\r\n\r\nconst buttonBar_defaultStyle = {\r\n  zIndex: '5',\r\n  position: 'fixed',\r\n  top: '0',\r\n  left: '0',\r\n  width: '100%',\r\n  height: '47px',\r\n  flexDirection: 'row',\r\n  justifyContent: 'center',\r\n  alignItems: 'center',\r\n  backgroundColor: 'rgb(143, 193, 226)'\r\n};\r\n\r\nconst buttonDefaultStyle = {\r\n  margin: '0 1% 0 1%'\r\n};\r\n\r\nclass ButtonBar {\r\n  constructor(handlers) {\r\n    this.handlers = handlers;\r\n  }\r\n  create() {\r\n    const bar = document.createElement('div');\r\n    const buttonFactory = new ButtonFactory();\r\n    for (const key in this.handlers) {\r\n      const button = buttonFactory.create(this.handlers[key].name);\r\n      button.addEventListener('click', this.handlers[key].handler);\r\n      Object.assign(button.style, buttonDefaultStyle);\r\n      bar.appendChild(button);\r\n    }\r\n    bar.className = 'buttonBar';\r\n    Object.assign(bar.style, buttonBar_defaultStyle);\r\n    return bar;\r\n  }\r\n}\r\n\n;// CONCATENATED MODULE: ./src/activeBarBuffer.js\nclass ActiveBarBuffer {\r\n  constructor() {\r\n    this.activeBar = null;\r\n  }\r\n\r\n  setActiveBar(bar) {\r\n    if (this.activeBar) {\r\n      this.activeBar.style.display = 'none';\r\n    }\r\n    if (bar) {\r\n      document.getElementsByTagName('body')[0].style.padding = '50px 3px 3px 3px';\r\n      this.activeBar = bar;\r\n      this.activeBar.style.display = 'flex';\r\n    }\r\n  }\r\n  hideActiveBar() {\r\n    this.activeBar.style.display = 'none';\r\n    document.getElementsByTagName('body')[0].style.padding = '0';\r\n  }\r\n}\r\n\n;// CONCATENATED MODULE: ./src/addBlock.js\nconst cardDOM = `\r\n  <div  style=\"display: flex;flex-direction: column\">\r\n  <div class=\"addBlockDiv\">\r\n    <p style=\"margin-bottom:5px\">Выберите блок, который хотите создать:</p>\r\n  </div>\r\n  <div class=\"addBlockDiv\">\r\n    <button value = 'div'>Пустой блок</button>\r\n    <button value = 'img'>Изображение</button>\r\n    <button value = 'p'>Параграф</button>\r\n  </div>\r\n  <div class=\"addBlockDiv\">\r\n    <button value = 'article'>Статья</button>\r\n    <button value = 'button'>Кнопка</button>\r\n    <button value = 'video'>Видео</button>\r\n    <button value = 'a'>Ссылка</button>\r\n  </div>\r\n  <div class=\"addBlockDiv\">\r\n    <button value = 'input'>Поле для ввода текста (одна строка)</button>\r\n  </div>\r\n  <div class=\"addBlockDiv\">\r\n    <button value = 'textarea'>Поле для ввода текста (несколько строк)</button>\r\n  </div>\r\n  </div>`;\r\nconst addBlock_defaultStyle = {\r\n  zIndex: '10',\r\n  top: '40%',\r\n  position: 'fixed',\r\n  border: '1px solid rgb(49, 112, 143)',\r\n  borderRadius: '5px',\r\n  backgroundColor: 'rgb(143, 193, 226)'\r\n};\r\n\r\nclass AddBlock {\r\n  constructor() {\r\n    this.content = '';\r\n    this.DOMElement = document.createElement('dialog');\r\n    this.DOMElement.innerHTML = cardDOM;\r\n\r\n    Object.assign(this.DOMElement.style, addBlock_defaultStyle);\r\n\r\n    const buttons = this.DOMElement.getElementsByTagName('button');\r\n    for (const button of buttons) {\r\n      button.style.minWidth = '50px';\r\n      button.addEventListener('click', () => {\r\n        this.setContent(button.value);\r\n      });\r\n    }\r\n  }\r\n  setContent(text) {\r\n    this.content = text;\r\n    this.DOMElement.removeAttribute('open');\r\n    this.DOMElement.dispatchEvent(new Event('content-set'));\r\n  }\r\n  getContent() {\r\n    return new Promise((resolve) => {\r\n      const listener = () => {\r\n        resolve(this.content);\r\n        this.DOMElement.removeEventListener('content-set', listener);\r\n      };\r\n      this.DOMElement.addEventListener('content-set', listener);\r\n    });\r\n  }\r\n}\r\n\n;// CONCATENATED MODULE: ./src/rgbToHex.js\nfunction rgbToHex(rgbString) {\r\n  const values = [...rgbString]\r\n    .map((i) => {\r\n      if (isFinite(i) === true || i === '.') {\r\n        return i;\r\n      } else {\r\n        return ' ';\r\n      }\r\n    })\r\n    .join('')\r\n    .split(' ')\r\n    .filter((i) => i !== '')\r\n    .map((i) => Number(i));\r\n  const r = values[0],\r\n    g = values[1],\r\n    b = values[2];\r\n  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);\r\n}\r\n\r\nfunction hexToRGB(hex) {\r\n  let r = 0,\r\n    g = 0,\r\n    b = 0;\r\n\r\n  if (hex.length === 4) {\r\n    r = '0x' + hex[1] + hex[1];\r\n    g = '0x' + hex[2] + hex[2];\r\n    b = '0x' + hex[3] + hex[3];\r\n  } else if (hex.length === 7) {\r\n    r = '0x' + hex[1] + hex[2];\r\n    g = '0x' + hex[3] + hex[4];\r\n    b = '0x' + hex[5] + hex[6];\r\n  }\r\n\r\n  return 'rgb(' + +r + ',' + +g + ',' + +b + ')';\r\n}\r\n\n;// CONCATENATED MODULE: ./src/changeBlock.js\n\r\n\r\nconst changeBlock_cardDOM = `\r\n<div style=\"display: flex;flex-direction: row\">\r\n<div>\r\n  <div class = \"changeBlockDiv\">\r\n    <h4 style=\"margin:0\">Настройки блока</h4>\r\n    Высота блока (в % от родительского блока):\r\n    <input id=\"heightBlock\" style=\"width:30px\"><br>\r\n    Ширина блока (в % от родительского блока):\r\n    <input id=\"widthBlock\" style=\"width:30px\"><br>\r\n    Размер блока по содержимому:\r\n    <input type=\"checkbox\" id=\"sizeByContentCheckbox\" style=\"margin:0\"><br>\r\n    Ориентация внутри блока:\r\n    <input class=\"orientationRadio\" type=\"radio\" name=\"orientation\" value=\"row\">Ряд\r\n    <input class=\"orientationRadio\" type=\"radio\" name=\"orientation\" value=\"column\">Колонка\r\n  </div>\r\n  <div class = \"changeBlockDiv\">\r\n    <h4 style=\"margin:0\">Настройки фона</h4>\r\n    Цвет фона:&nbsp<input id=\"colorPicker\" type=\"color\"><br>\r\n    Прозрачность фона (в %):&nbsp<input id=\"opacity\" style=\"width:30px\"><br>\r\n    Использовать в качестве фона изображение:\r\n    <input type=\"checkbox\" id=\"backgroundImageCheckbox\" style=\"margin:0\"><br>\r\n    Ссылка на изображение:&nbsp<input id=\"backgroundImageURL\" style=\"width:130px\"><br>\r\n  </div>\r\n  <div class = \"changeBlockDiv\">\r\n    <h4 style=\"margin:0\">Настройки отступов</h4>\r\n    Отступ внутри блока слева (в пикселях):\r\n    <input id=\"paddingBlockLeft\" style=\"width:40px\"><br>\r\n    Отступ внутри блока сверху (в пикселях):\r\n    <input id=\"paddingBlockTop\" style=\"width:40px\"><br>\r\n    Отступ внутри блока справа (в пикселях):\r\n    <input id=\"paddingBlockRight\" style=\"width:40px\"><br>\r\n    Отступ внутри блока снизу (в пикселях):\r\n    <input id=\"paddingBlockBottom\" style=\"width:40px\"><br><br>\r\n\r\n    Отступ снаружи блока слева (в пикселях):\r\n    <input id=\"marginBlockLeft\" style=\"width:40px\"><br>\r\n    Отступ снаружи блока сверху (в пикселях):\r\n    <input id=\"marginBlockTop\" style=\"width:40px\"><br>\r\n    Отступ снаружи блока справа (в пикселях):\r\n    <input id=\"marginBlockRight\" style=\"width:40px\"><br>\r\n    Отступ снаружи блока снизу (в пикселях):\r\n    <input id=\"marginBlockBottom\" style=\"width:40px\"><br>\r\n  </div>\r\n  </div>\r\n  <div>\r\n  <div class = \"changeBlockDiv\">\r\n    <h4 style=\"margin:0\">Настройки рамки</h4>\r\n    Толщина рамки (в пикселях):&nbsp<input id=\"borderWidth\" style=\"width:30px\"><br>\r\n    Стиль рамки:&nbsp\r\n    <select id=\"selectBorderStyle\">\r\n      <option id=\"selectBorderStyleNone\" value=\"none\">Нет</option>\r\n      <option id=\"selectBorderStyleSolid\" value=\"solid\">Сплошной</option>\r\n      <option id=\"selectBorderStyleDouble\" value=\"double\">Двойной</option>\r\n      <option id=\"selectBorderStyleDashed\" value=\"dashed\">Пунктир</option>\r\n    </select><br>\r\n    Цвет рамки:&nbsp<input id=\"borderColor\" type=\"color\"><br>\r\n    Радиус скругления рамки (в пикселях):&nbsp<input id=\"borderRadius\" style=\"width:30px\"><br>\r\n  </div>\r\n  <div class = \"changeBlockDiv\">\r\n    <h4 style=\"margin:0\">Настройки текста</h4>\r\n    Размер шрифта (в пикселях):\r\n    <input id=\"fontSize\" style=\"width:30px\"><br>\r\n    Цвет текста:\r\n    <input type=\"color\"  id=\"colorPickerText\"><br>\r\n    Жирный текст:\r\n    <input type=\"checkbox\" id=\"fontWeightCheckbox\" style=\"margin:0\"><br>\r\n    Курсив:\r\n    <input type=\"checkbox\" id=\"fontStyleCheckbox\" style=\"margin:0\"><br>\r\n    Текст:<br>\r\n    <textarea id=\"textChangeBlock\" style=\"width:100%; min-height:150px;\"></textarea><br>\r\n  </div>\r\n  <div style=\" text-align: right;\">\r\n    <button>Применить</button>\r\n  </div>\r\n  </div>\r\n</div>\r\n`;\r\n\r\nconst changeBlock_defaultStyle = {\r\n  zIndex: '10',\r\n  top: '20%',\r\n  border: '1px solid rgb(49, 112, 143)',\r\n  borderRadius: '5px',\r\n  backgroundColor: 'rgb(143, 193, 226)'\r\n};\r\n\r\nclass ChangeBlock {\r\n  constructor() {\r\n    this.content = '';\r\n    this.DOMElement = document.createElement('dialog');\r\n    this.DOMElement.innerHTML = changeBlock_cardDOM;\r\n\r\n    Object.assign(this.DOMElement.style, changeBlock_defaultStyle);\r\n\r\n    const buttons = this.DOMElement.getElementsByTagName('button');\r\n    buttons[0].style.minWidth = '50px';\r\n    buttons[0].addEventListener('click', () => {\r\n      this.DOMElement.dispatchEvent(new Event('style-set'));\r\n    });\r\n  }\r\n  returnData(style, text) {\r\n    this.applyStylesToBlock(style, text);\r\n    return new Promise((resolve) => {\r\n      const listener = () => {\r\n        const data = {\r\n          styles: {},\r\n          text: document.getElementById('textChangeBlock').value\r\n        };\r\n        Object.assign(data.styles, style);\r\n\r\n        if (document.getElementById('sizeByContentCheckbox').checked) {\r\n          data.styles.height = 'min-content';\r\n          data.styles.width = 'min-content';\r\n        } else {\r\n          data.styles.height = `${document.getElementById('heightBlock').value}%`;\r\n          data.styles.width = `${document.getElementById('widthBlock').value}%`;\r\n        }\r\n\r\n        data.styles.paddingLeft = `${document.getElementById('paddingBlockLeft').value}px`;\r\n        data.styles.paddingTop = `${document.getElementById('paddingBlockTop').value}px`;\r\n        data.styles.paddingRight = `${document.getElementById('paddingBlockRight').value}px`;\r\n        data.styles.paddingBottom = `${document.getElementById('paddingBlockBottom').value}px`;\r\n        data.styles.marginLeft = `${document.getElementById('marginBlockLeft').value}px`;\r\n        data.styles.marginTop = `${document.getElementById('marginBlockTop').value}px`;\r\n        data.styles.marginRight = `${document.getElementById('marginBlockRight').value}px`;\r\n        data.styles.marginBottom = `${document.getElementById('marginBlockBottom').value}px`;\r\n\r\n        data.styles.backgroundColor = `${hexToRGB(document.getElementById('colorPicker').value).slice(0, -1)}, ${\r\n          1 - document.getElementById('opacity').value / 100\r\n        })`;\r\n        data.styles.borderStyle = document.getElementById('selectBorderStyle').value;\r\n        data.styles.borderWidth = `${document.getElementById('borderWidth').value}px`;\r\n        data.styles.borderColor = document.getElementById('borderColor').value;\r\n        data.styles.borderRadius = `${document.getElementById('borderRadius').value}px`;\r\n        data.styles.fontSize = `${document.getElementById('fontSize').value}px`;\r\n        data.styles.color = document.getElementById('colorPickerText').value;\r\n        if (document.getElementById('backgroundImageCheckbox').checked) {\r\n          data.styles.backgroundImage = document.getElementById('backgroundImageURL').value;\r\n        } else {\r\n          data.styles.backgroundImage = '';\r\n        }\r\n        if (document.getElementById('fontWeightCheckbox').checked) {\r\n          data.styles.fontWeight = 'bold';\r\n        } else {\r\n          data.styles.fontWeight = 'normal';\r\n        }\r\n        if (document.getElementById('fontStyleCheckbox').checked) {\r\n          data.styles.fontStyle = 'italic';\r\n        } else {\r\n          data.styles.fontStyle = 'normal';\r\n        }\r\n        data.styles.flexDirection = this.returnNewFlexDirection();\r\n\r\n        this.DOMElement.removeAttribute('open');\r\n        resolve(data);\r\n        this.DOMElement.removeEventListener('style-set', listener);\r\n      };\r\n      this.DOMElement.addEventListener('style-set', listener);\r\n    });\r\n  }\r\n  applyStylesToBlock(style, text) {\r\n    this.checkHeightWidth(style);\r\n\r\n    document.getElementById('paddingBlockLeft').value = style.paddingLeft.slice(0, -2);\r\n    document.getElementById('paddingBlockTop').value = style.paddingTop.slice(0, -2);\r\n    document.getElementById('paddingBlockRight').value = style.paddingRight.slice(0, -2);\r\n    document.getElementById('paddingBlockBottom').value = style.paddingBottom.slice(0, -2);\r\n\r\n    document.getElementById('marginBlockLeft').value = style.marginLeft.slice(0, -2);\r\n    document.getElementById('marginBlockTop').value = style.marginTop.slice(0, -2);\r\n    document.getElementById('marginBlockRight').value = style.marginRight.slice(0, -2);\r\n    document.getElementById('marginBlockBottom').value = style.marginBottom.slice(0, -2);\r\n\r\n    document.getElementById('colorPicker').value = rgbToHex(style.backgroundColor);\r\n    document.getElementById('borderColor').value = rgbToHex(style.borderColor);\r\n    document.getElementById('borderRadius').value = style.borderRadius.slice(0, -2);\r\n    document.getElementById('borderWidth').value = style.borderWidth.slice(0, -2);\r\n    document.getElementById('fontSize').value = style.fontSize.slice(0, -2);\r\n    document.getElementById('colorPickerText').value = rgbToHex(style.color);\r\n    document.getElementById('textChangeBlock').value = text;\r\n\r\n    if (style.backgroundImage.slice(5, -2)) {\r\n      document.getElementById('backgroundImageCheckbox').checked = 'checked';\r\n      document.getElementById('backgroundImageURL').value = style.backgroundImage.slice(5, -2);\r\n    } else {\r\n      document.getElementById('backgroundImageCheckbox').checked = '';\r\n    }\r\n\r\n    if (style.fontWeight === 'bold') {\r\n      document.getElementById('fontWeightCheckbox').checked = 'checked';\r\n    } else {\r\n      document.getElementById('fontWeightCheckbox').checked = '';\r\n    }\r\n    if (style.fontStyle === 'italic') {\r\n      document.getElementById('fontStyleCheckbox').checked = 'checked';\r\n    } else {\r\n      document.getElementById('fontStyleCheckbox').checked = '';\r\n    }\r\n\r\n    this.applyBackgroundColor(style.backgroundColor);\r\n    this.applyBorderStyle(style.borderStyle);\r\n    this.applyflexDirection(style.flexDirection);\r\n  }\r\n  checkHeightWidth(style) {\r\n    if (style.height === 'min-content' && style.width === 'min-content') {\r\n      document.getElementById('sizeByContentCheckbox').checked = 'checked';\r\n      document.getElementById('heightBlock').value = '';\r\n      document.getElementById('widthBlock').value = '';\r\n    } else {\r\n      document.getElementById('sizeByContentCheckbox').checked = '';\r\n      document.getElementById('heightBlock').value = style.height.slice(0, -1);\r\n      document.getElementById('widthBlock').value = style.width.slice(0, -1);\r\n    }\r\n  }\r\n  applyBackgroundColor(backgroundColor) {\r\n    if (backgroundColor.indexOf('rgba') !== -1) {\r\n      let opacity = backgroundColor.slice(backgroundColor.indexOf(',') + 1);\r\n      opacity = opacity.slice(opacity.indexOf(',') + 1);\r\n      opacity = opacity.slice(opacity.indexOf(',') + 1);\r\n      document.getElementById('opacity').value = Math.round((1 - opacity.slice(1, -1)) * 100);\r\n    } else {\r\n      document.getElementById('opacity').value = 0;\r\n    }\r\n  }\r\n  applyBorderStyle(borderStyle) {\r\n    document.getElementById('selectBorderStyleNone').removeAttribute('selected');\r\n    document.getElementById('selectBorderStyleSolid').removeAttribute('selected');\r\n    document.getElementById('selectBorderStyleDouble').removeAttribute('selected');\r\n    document.getElementById('selectBorderStyleDashed').removeAttribute('selected');\r\n\r\n    if (borderStyle === 'none') {\r\n      document.getElementById('selectBorderStyleNone').setAttribute('selected', 'selected');\r\n    } else if (borderStyle === 'solid') {\r\n      document.getElementById('selectBorderStyleSolid').setAttribute('selected', 'selected');\r\n    } else if (borderStyle === 'double') {\r\n      document.getElementById('selectBorderStyleDouble').setAttribute('selected', 'selected');\r\n    } else if (borderStyle === 'dashed') {\r\n      document.getElementById('selectBorderStyleDashed').setAttribute('selected', 'selected');\r\n    }\r\n  }\r\n  applyflexDirection(flexDirection) {\r\n    if (flexDirection === 'row') {\r\n      this.DOMElement.getElementsByClassName('orientationRadio')[0].checked = true;\r\n    } else {\r\n      this.DOMElement.getElementsByClassName('orientationRadio')[1].checked = true;\r\n    }\r\n  }\r\n  returnNewFlexDirection() {\r\n    if (this.DOMElement.getElementsByClassName('orientationRadio')[0].checked === true) {\r\n      return 'row';\r\n    } else {\r\n      return 'column';\r\n    }\r\n  }\r\n}\r\n\n;// CONCATENATED MODULE: ./src/addImgVideo.js\nconst addImgVideo_cardDOM = `<p id=\"textInAddImgVideo\">777</p>\r\n<input>\r\n<button>Применить</button>`;\r\n\r\nconst addImgVideo_defaultStyle = {\r\n  zIndex: '10',\r\n  top: '40%',\r\n  position: 'fixed',\r\n  border: '1px solid rgb(49, 112, 143)',\r\n  borderRadius: '5px',\r\n  backgroundColor: 'rgb(143, 193, 226)'\r\n};\r\n\r\nclass AddImgVideo {\r\n  constructor() {\r\n    this.src = '';\r\n    this.DOMElement = document.createElement('dialog');\r\n    this.DOMElement.innerHTML = addImgVideo_cardDOM;\r\n    this.textForImg = 'Вставьте ссылку на изображение:';\r\n    this.textForVideo = 'Вставьте ссылку на видео:';\r\n\r\n    Object.assign(this.DOMElement.style, addImgVideo_defaultStyle);\r\n\r\n    this.DOMElement.getElementsByTagName('button')[0].addEventListener('click', () => {\r\n      this.setSrc(this.DOMElement.getElementsByTagName('input')[0].value);\r\n    });\r\n  }\r\n  setSrc(src) {\r\n    this.src = src;\r\n    this.DOMElement.removeAttribute('open');\r\n    this.DOMElement.dispatchEvent(new Event('src-set'));\r\n  }\r\n  getSrc(type) {\r\n    return new Promise((resolve) => {\r\n      if (type === 'img') {\r\n        document.getElementById('textInAddImgVideo').innerHTML = this.textForImg;\r\n      } else if (type === 'video') {\r\n        document.getElementById('textInAddImgVideo').innerHTML = this.textForVideo;\r\n      }\r\n      const listener = () => {\r\n        resolve(this.src);\r\n        this.DOMElement.removeEventListener('src-set', listener);\r\n      };\r\n      this.DOMElement.addEventListener('src-set', listener);\r\n    });\r\n  }\r\n}\r\n\n;// CONCATENATED MODULE: ./src/addA.js\nconst addA_cardDOM = `\r\n<div style=\"display: flex;flex-direction: row;  align-items: flex-end;\">\r\n  <div>\r\n    <p>Вставьте текст ссылки:</p>\r\n    <input>\r\n    <p style=\"margin-top:10px\">Вставьте ссылку:</p>\r\n    <input>\r\n  </div>\r\n  <div style=\"margin-left:10px\">\r\n    <button>Применить</button>\r\n  </div>\r\n</div>`;\r\n\r\nconst addA_defaultStyle = {\r\n  zIndex: '100',\r\n  top: '40%',\r\n  position: 'fixed',\r\n  border: '1px solid rgb(49, 112, 143)',\r\n  borderRadius: '5px',\r\n  backgroundColor: 'rgb(143, 193, 226)'\r\n};\r\n\r\nclass AddA {\r\n  constructor() {\r\n    this.text = '';\r\n    this.href = '';\r\n    this.DOMElement = document.createElement('dialog');\r\n    this.DOMElement.innerHTML = addA_cardDOM;\r\n\r\n    Object.assign(this.DOMElement.style, addA_defaultStyle);\r\n\r\n    this.DOMElement.getElementsByTagName('button')[0].addEventListener('click', () => {\r\n      this.setData(\r\n        this.DOMElement.getElementsByTagName('input')[0].value,\r\n        this.DOMElement.getElementsByTagName('input')[1].value\r\n      );\r\n    });\r\n  }\r\n  setData(text, href) {\r\n    this.text = text;\r\n    this.href = href;\r\n    console.log(this.text, this.href);\r\n    this.DOMElement.removeAttribute('open');\r\n    this.DOMElement.dispatchEvent(new Event('data-set'));\r\n  }\r\n  getData() {\r\n    return new Promise((resolve) => {\r\n      const listener = () => {\r\n        resolve({ text: this.text, href: this.href });\r\n        this.DOMElement.removeEventListener('data-set', listener);\r\n      };\r\n      this.DOMElement.addEventListener('data-set', listener);\r\n    });\r\n  }\r\n}\r\n\n;// CONCATENATED MODULE: ./src/savePanel.js\nconst savePanel_cardDOM = `\r\n  <p style=\"margin-bottom:20px\">Файл вашего сайта будет сохранён в папку загрузок,<br>\r\n  указанную в настройках браузера.<br></p>\r\n  <a href=# id='saveSite' \r\n  style=\"text-decoration: none;background-color: rgb(248, 249, 251);\r\n  border:1px solid rgb(49, 112, 143); padding: 10px; margin: 3px;; \r\n  border-radius:3px; background-color:rgb(239,239,239); color:black\">\r\n  Сохранить\r\n  </a>\r\n`;\r\n\r\nconst savePanel_defaultStyle = {\r\n  textAlign: 'center',\r\n  zIndex: '100',\r\n  top: '40%',\r\n  position: 'fixed',\r\n  border: '1px solid rgb(49, 112, 143)',\r\n  borderRadius: '5px',\r\n  backgroundColor: 'rgb(143, 193, 226)'\r\n};\r\n\r\nclass SavePanel {\r\n  constructor() {\r\n    this.DOMElement = document.createElement('dialog');\r\n    this.DOMElement.innerHTML = savePanel_cardDOM;\r\n\r\n    Object.assign(this.DOMElement.style, savePanel_defaultStyle);\r\n  }\r\n}\r\n\n;// CONCATENATED MODULE: ./src/virtualNodeFactory.js\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst activeBarBuffer = new ActiveBarBuffer();\r\nconst buffer = new Buffer();\r\nconst addBlock = new AddBlock();\r\nconst changeBlock = new ChangeBlock();\r\nconst addImgVideo = new AddImgVideo();\r\nconst addA = new AddA();\r\nconst savePanel = new SavePanel();\r\n\r\ndocument.body.appendChild(addBlock.DOMElement);\r\ndocument.body.appendChild(changeBlock.DOMElement);\r\ndocument.body.appendChild(addImgVideo.DOMElement);\r\ndocument.body.appendChild(addA.DOMElement);\r\ndocument.body.appendChild(savePanel.DOMElement);\r\n\r\nconst defaultStyles = `\r\n    * {  box-sizing: border-box;}\r\n    html {  height: 100vh;  width: 100vw;}\r\n    body {  padding: 0;  margin: 0;  height: 100%;  width: 100%;}\r\n    button {  padding: 3px;  margin: 3px;  cursor: pointer;}\r\n    p {margin: 0;}`;\r\n\r\nconst siteFirstPart = `<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n    <title>Document</title>`;\r\n\r\nconst siteSecondPart = `\r\n</head>\r\n<body>\r\n`;\r\n\r\nconst siteThirdPart = `\r\n</body>\r\n</html>`;\r\n\r\nlet selectBlock = '';\r\nfunction selectNewBlock(node) {\r\n  if (selectBlock) {\r\n    selectBlock.canselSelect();\r\n  }\r\n  selectBlock = node;\r\n  selectBlock.select();\r\n}\r\n\r\nclass VirtualNodeFactory {\r\n  create(type) {\r\n    const node = new VirtualNode(type);\r\n    const buttonBar = new ButtonBar(this.getHandlers(node));\r\n    node.setClass('node');\r\n    const bar = buttonBar.create();\r\n    node.getDOMElement().appendChild(bar);\r\n    node.getDOMElement().addEventListener('click', (event) => {\r\n      if (node.getDOMElement() === event.target) {\r\n        activeBarBuffer.setActiveBar(bar);\r\n        selectNewBlock(node);\r\n      }\r\n    });\r\n    this.makeSaveListener();\r\n    return node;\r\n  }\r\n  cloneNode(node) {\r\n    const newNode = this.create(node.type);\r\n    if (node.nodes.length > 0) {\r\n      for (let i = 0; i < node.nodes.length; i++) {\r\n        newNode.setText(node.getTextChild().textContent);\r\n        newNode.setStyles(node.getStyles());\r\n        newNode.addNode(this.cloneNode(node.nodes[i]));\r\n      }\r\n    } else {\r\n      newNode.DOMElement = node.getDOMElement().cloneNode(true);\r\n      newNode.getDOMElement().getElementsByClassName('buttonBar')[0].remove();\r\n      const buttonBar = new ButtonBar(this.getHandlers(newNode));\r\n      const bar = buttonBar.create();\r\n      newNode.getDOMElement().appendChild(bar);\r\n      newNode.getDOMElement().addEventListener('click', (event) => {\r\n        if (newNode.getDOMElement() === event.target) {\r\n          activeBarBuffer.setActiveBar(bar);\r\n          selectNewBlock(newNode);\r\n        }\r\n      });\r\n    }\r\n    newNode.canselSelect();\r\n    return newNode;\r\n  }\r\n  getHandlers(node) {\r\n    return {\r\n      add: {\r\n        name: 'Добавить',\r\n        handler: async () => {\r\n          addBlock.DOMElement.setAttribute('open', 'open');\r\n          const nodeName = await addBlock.getContent();\r\n          if (\r\n            (nodeName !== 'input') &\r\n            (nodeName !== 'textarea') &\r\n            (nodeName !== 'img') &\r\n            (nodeName !== 'video') &\r\n            (nodeName !== 'a')\r\n          ) {\r\n            node.addNode(this.create(nodeName));\r\n          } else if (nodeName === 'img') {\r\n            this.addImg(node);\r\n          } else if (nodeName === 'video') {\r\n            this.addVideo(node);\r\n          } else if (nodeName === 'a') {\r\n            this.addA(node);\r\n          } else if (nodeName === 'textarea' || nodeName === 'input') {\r\n            this.addTextareaInput(node, nodeName);\r\n          }\r\n        }\r\n      },\r\n      delete: {\r\n        name: 'Удалить',\r\n        handler: () => {\r\n          node.deleteNode();\r\n          activeBarBuffer.hideActiveBar();\r\n        }\r\n      },\r\n      copy: {\r\n        name: 'Копировать',\r\n        handler: () => {\r\n          buffer.save(this.cloneNode(node));\r\n        }\r\n      },\r\n      cut: {\r\n        name: 'Вырезать',\r\n        handler: () => {\r\n          buffer.save(this.cloneNode(node));\r\n          node.deleteNode();\r\n        }\r\n      },\r\n      insert: {\r\n        name: 'Вставить',\r\n        handler: () => {\r\n          node.addNode(this.cloneNode(buffer.get()));\r\n        }\r\n      },\r\n      change: {\r\n        name: 'Редактировать',\r\n        handler: async () => {\r\n          changeBlock.DOMElement.setAttribute('open', 'open');\r\n          node.setData(await changeBlock.returnData(node.getStyles(), node.getTextChild().textContent));\r\n        }\r\n      },\r\n      hide: {\r\n        name: 'Скрыть',\r\n        handler: async () => {\r\n          node.canselSelect();\r\n          activeBarBuffer.hideActiveBar();\r\n        }\r\n      },\r\n      save: {\r\n        name: 'Сохранить',\r\n        handler: () => {\r\n          savePanel.DOMElement.setAttribute('open', 'open');\r\n        }\r\n      }\r\n    };\r\n  }\r\n  makeSaveListener() {\r\n    document.getElementById('saveSite').onclick = function () {\r\n      let site =\r\n        siteFirstPart +\r\n        `\r\n    <style> ${defaultStyles}\r\n    </style>` +\r\n        siteSecondPart +\r\n        document.getElementsByClassName('node')[0].outerHTML +\r\n        siteThirdPart;\r\n      const buttonsBars = document.getElementsByClassName('buttonBar');\r\n\r\n      for (const buttonsBar of buttonsBars) {\r\n        site = site.split(buttonsBar.outerHTML).join('');\r\n      }\r\n      site = site.split('outline: rgb(226, 125, 95) solid 3px;').join('');\r\n\r\n      const csvData = 'data:application/html;charset=utf-8,' + encodeURIComponent(site);\r\n      this.href = csvData;\r\n      this.target = '_blank';\r\n      this.download = 'index.html';\r\n      savePanel.DOMElement.removeAttribute('open');\r\n    };\r\n  }\r\n  async addVideo(node) {\r\n    node.addNode(this.create('div'));\r\n    addImgVideo.DOMElement.setAttribute('open', 'open');\r\n    const iframe = document.createElement('iframe');\r\n    const url = await addImgVideo.getSrc('video');\r\n    iframe.setAttribute('src', url.replace('youtu.be', 'www.youtube.com/embed'));\r\n    node.getLastChild().DOMElement.appendChild(iframe);\r\n  }\r\n  async addImg(node) {\r\n    node.addNode(this.create('div'));\r\n    addImgVideo.DOMElement.setAttribute('open', 'open');\r\n    const img = document.createElement('img');\r\n    img.setAttribute('src', await addImgVideo.getSrc('img'));\r\n    node.getLastChild().DOMElement.appendChild(img);\r\n  }\r\n  async addA(node) {\r\n    node.addNode(this.create('div'));\r\n    addA.DOMElement.setAttribute('open', 'open');\r\n    const a = document.createElement('a');\r\n    const data = await addA.getData();\r\n    a.innerHTML = data.text;\r\n    a.href = data.href;\r\n    a.addEventListener(\r\n      'click',\r\n      function (e) {\r\n        e.preventDefault();\r\n        alert('Сейчас переход по ссылке недоступен');\r\n      },\r\n      false\r\n    );\r\n    node.getLastChild().DOMElement.appendChild(a);\r\n  }\r\n  addTextareaInput(node, type) {\r\n    node.addNode(this.create('div'));\r\n    const element = document.createElement(type);\r\n    element.style.backgroundColor = 'rgba(0,0,0,0)';\r\n    node.getLastChild().DOMElement.appendChild(element);\r\n  }\r\n}\r\n\n;// CONCATENATED MODULE: ./src/index.js\nconst body = document.getElementsByTagName('body');\r\n\r\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', start());\r\n\r\nfunction start() {\r\n  const nodeFactory = new VirtualNodeFactory();\r\n  const root = nodeFactory.create('div');\r\n\r\n  body[0].appendChild(root.getDOMElement());\r\n}\r\n\n\n//# sourceURL=webpack://vietnam-node-empty/./src/index.js_+_12_modules?")}},__webpack_exports__={};__webpack_modules__[257]()})();