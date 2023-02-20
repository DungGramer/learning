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
  canvas.getObjects().forEach((obj) => {
    if (obj === canvas.backgroundImage) return;
    canvas.remove(obj);
  });
};

const createRect = (canvas) => {
  const canvasCenter = canvas.getCenter();
  const rect = new fabric.Rect({
    left: canvasCenter.left,
    top: 0,
    fill: 'darkgreen',
    width: 100,
    height: 100,
    originX: 'center',
    originY: 'center',
    cornerColor: 'white',
  });
  canvas.add(rect);
  rect.animate('top', canvasCenter.top, {
    onChange: canvas.renderAll.bind(canvas),
  });
  rect.on('selected', () => {
    rect.set('fill', 'green');
  });
  rect.on('deselected', () => {
    rect.set('fill', 'darkgreen');
  });
};

const createCirc = (canvas) => {
  const canvasCenter = canvas.getCenter();
  const circle = new fabric.Circle({
    radius: 50,
    fill: 'tomato',
    left: canvasCenter.left,
    top: -50,
    originX: 'center',
    originY: 'center',
    cornerColor: 'white',
  });
  canvas.add(circle);
  canvas.renderAll();
  circle.animate('top', canvas.height - 50, {
    onChange: canvas.renderAll.bind(canvas),
    onComplete: () => {
      circle.animate('top', canvasCenter.top, {
        onChange: canvas.renderAll.bind(canvas),
        easing: fabric.util.ease.easeOutBounce,
        duration: 200,
      });
    },
  });
  circle.on('selected', () => {
    circle.set('fill', 'red');
  });
  circle.on('deselected', () => {
    circle.set('fill', 'tomato');
  });
};

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
