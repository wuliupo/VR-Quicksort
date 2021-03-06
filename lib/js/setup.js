import 'aframe';

const EL_IDS = ['el-1', 'el-2', 'el-3', 'el-4', 'el-5', 'el-6', 'el-7', 'el-8', 'el-9', 'el-10', 'el-11', 'el-12'];
const EL_X_POSITIONS = EL_IDS.map((id, idx) => {
  const leftMostX = -((EL_IDS.length - 1) / 4);
  return leftMostX + (idx/2);
});


export const randomElOrder = () => {
  const arrayEls = [];

  const elIdCopy = EL_IDS.slice();

  for (let i = 0; i < EL_IDS.length; i++) {
    const randomIdx = Math.floor(Math.random() * elIdCopy.length);
    const randomElId = elIdCopy.splice(randomIdx, 1);
    const randomEl = document.getElementById(randomElId);
    arrayEls.push(randomEl);
  }

  return arrayEls;
};

export const setElHeights = arrayEls => { 
  arrayEls.forEach((arrayEl, idx) => {
    setHeightAndColor(arrayEl);
    const x = EL_X_POSITIONS[idx];
    arrayEl.setAttribute('position', `${x} 2 0`);
    arrayEl.setAttribute('visible', `false`);
  });
};

const eightBitSinStr = (x, offset) => {
  let sinHex = Math.floor(Math.sin(x + offset) * 127 + 128).toString(16);
  if (sinHex.length < 2) {sinHex = '0' + sinHex}
  return sinHex;
};

export const setHeightAndColor = arrayEl => {
  const numEls = EL_IDS.length;
  const id = parseInt(arrayEl.id.substr(3));
  arrayEl.setAttribute('geometry', `height:${0.5 + id/5}`);

  const frequency = 2 * Math.PI / numEls;
  const red   = eightBitSinStr(frequency*id, 0);
  const green = eightBitSinStr(frequency*id, 2);
  const blue  = eightBitSinStr(frequency*id, 4);

  arrayEl.setAttribute('material', 'color:#' + red + green + blue);
};

export const makeArrayElsVisible = arrayEls => {
  arrayEls.forEach(arrayEl => arrayEl.setAttribute('visible', 'true'));
};