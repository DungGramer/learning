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

function togglePan() {
  currentMode = currentMode === modes.pan ? '' : modes.pan;
}

const setPanEvents = (canvas) => {
  canvas.on('mouse:move', (event) => {
    if (mousePressed && currentMode === modes.pan) {
      canvas.setCursor('grab');
      const mEvent = event.e;
      const delta = new fabric.Point(mEvent.movementX, mEvent.movementY);
      canvas.relativePan(delta);
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
togglePanBtn.addEventListener('click', togglePan);

const toggleDrawBtn = document.querySelector('.toggle-draw');

let currentMode;
const modes = {
  pan: 'pan',
};
const canvas = initCanvas('canvas');
let mousePressed = false;

setBackground('https://picsum.photos/300/300', canvas);

setPanEvents(canvas);