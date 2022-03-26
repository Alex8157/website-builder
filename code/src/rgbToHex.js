export function rgbToHex(rgbString) {
  const values = [...rgbString]
    .map((i) => {
      if (isFinite(i) === true || i === '.') {
        return i;
      } else {
        return ' ';
      }
    })
    .join('')
    .split(' ')
    .filter((i) => i !== '')
    .map((i) => Number(i));
  const r = values[0],
    g = values[1],
    b = values[2];
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function hexToRGB(hex) {
  let r = 0,
    g = 0,
    b = 0;

  if (hex.length === 4) {
    r = '0x' + hex[1] + hex[1];
    g = '0x' + hex[2] + hex[2];
    b = '0x' + hex[3] + hex[3];
  } else if (hex.length === 7) {
    r = '0x' + hex[1] + hex[2];
    g = '0x' + hex[3] + hex[4];
    b = '0x' + hex[5] + hex[6];
  }

  return 'rgb(' + +r + ',' + +g + ',' + +b + ')';
}
