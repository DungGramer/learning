import { fabric } from 'fabric';

const initCanvas = (id) => {
  return new fabric.Canvas(id, {
    width: 500,
    height: 500,
  });
}

const setBackground = (url, canvas) => {
  fabric.Image.fromURL(url, (img) => {
    canvas.backgroundImage = img;
    canvas.renderAll();
  });
}

const canvas = initCanvas('canvas');
setBackground('https://picsum.photos/200/300', canvas);

canvas.on('mouse:move', (e) => {
  console.log(e);
});