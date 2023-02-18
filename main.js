import { fabric } from 'fabric';

const initCanvas = (id) => {
  return new fabric.Canvas(id, {
    width: 500,
    height: 500,
    selection: false,
  });
};

const setBackground = (url, canvas) => {
  fabric.Image.fromURL(url, (img) => {
    canvas.backgroundImage = img;
    canvas.renderAll();
  });
};

let currentMode;
const modes = {
  pan: 'pan',
  drawing: 'drawing',
};

function toggleMode(mode) {
  switch (mode) {
    case modes.pan:
      currentMode = currentMode === modes.pan ? '' : modes.pan;
      break;
    case modes.drawing:
      if (currentMode === modes.drawing) {
        canvas.isDrawingMode = false;
        currentMode = '';
      } else {
        currentMode = modes.drawing;
        canvas.isDrawingMode = true;

      }
      break;
    default:
      break;
  }
  canvas.renderAll();
  console.log(`currentMode:`, currentMode);
}

const setPanEvents = (canvas) => {
  canvas.on('mouse:move', (event) => {
    if (!mousePressed) return;

    switch (currentMode) {
      case modes.pan:
        canvas.setCursor('grab');
        const mEvent = event.e;
        const delta = new fabric.Point(mEvent.movementX, mEvent.movementY);
        canvas.relativePan(delta);
        break;
      case modes.drawing:

        break;
    }
  });

  canvas.on('mouse:down', (event) => {
    mousePressed = true;

    if (currentMode === modes.pan) {
      canvas.setCursor('grab');
    }
  });

  canvas.on('mouse:up', (event) => {
    mousePressed = false;
    canvas.setCursor('default');
  });
};

const togglePanBtn = document.querySelector('.toggle-pan');
togglePanBtn.addEventListener('click', () => toggleMode(modes.pan));

const toggleDrawBtn = document.querySelector('.toggle-draw');
toggleDrawBtn.addEventListener('click', () => toggleMode(modes.drawing));

const canvas = initCanvas('canvas');
let mousePressed = false;

setBackground('https://picsum.photos/300/300', canvas);

setPanEvents(canvas);
