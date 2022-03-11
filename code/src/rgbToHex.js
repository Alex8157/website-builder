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
