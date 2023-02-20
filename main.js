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
        // canvas.freeDrawingBrush.color = colorPicker.value;
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

const clearCanvas = (canvas) => {
  canvas.getObjects().forEach(obj => {
    if (obj === canvas.backgroundImage) return;
    canvas.remove(obj);
  })
}

const createRect = (canvas) => {
  const canvasCenter = canvas.getCenter();
  const rect = new fabric.Rect({
    left: canvasCenter.left,
    top: canvasCenter.top,
    fill: 'red',
    width: 100,
    height: 100,
    originX: 'center',
    originY: 'center',
    cornerColor: 'white',

  });
  canvas.add(rect);
}

const createCirc = (canvas) => {
  const canvasCenter = canvas.getCenter();
  const circ = new fabric.Circle({
    left: canvasCenter.left,
    top: canvasCenter.top,
    fill: 'red',
    cornerColor: 'white',
    radius: 50,
    originX: 'center',
    originY: 'center',
  });
  canvas.add(circ);
}

const togglePanBtn = document.querySelector('.toggle-pan');
togglePanBtn.addEventListener('click', () => toggleMode(modes.pan));

const toggleDrawBtn = document.querySelector('.toggle-draw');
toggleDrawBtn.addEventListener('click', () => toggleMode(modes.drawing));

const colorPicker = document.querySelector('#color-picker');
const colorPickerLabel = document.querySelector('#color-picker-label');
colorPicker.addEventListener('change', (event) => {
  canvas.freeDrawingBrush.color = event.target.value;
  colorPickerLabel.value = event.target.value;
});
colorPickerLabel.addEventListener('change', (event) => {
  canvas.freeDrawingBrush.color = event.target.value;
  colorPicker.value = event.target.value;
});

const clearCanvasBtn = document.querySelector('.clear-canvas');
clearCanvasBtn.addEventListener('click', () => clearCanvas(canvas));

const addRectBtn = document.querySelector('.add-rect');
addRectBtn.addEventListener('click', () => createRect(canvas));
const addCircBtn = document.querySelector('.add-circ');
addCircBtn.addEventListener('click', () => createCirc(canvas));

const canvas = initCanvas('canvas');
let mousePressed = false;
let color = '#000000';

setBackground('https://picsum.photos/300/300', canvas);

setPanEvents(canvas);
