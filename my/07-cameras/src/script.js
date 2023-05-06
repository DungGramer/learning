import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Cursor
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5; //? -0.5 to center the cursor
  cursor.y = -(event.clientY / sizes.height - 0.5); //? -0.5 to center the cursor. Minus to invert the axis
});

window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
});

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix(); //? Update the camera with the new aspect ratio

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); //? Limit the pixel ratio to 2 is enough for most devices
});

// Scene
const scene = new THREE.Scene();

// Object
/* const positionsArray = new Float32Array([
    0, 0, 0, //? Vertex 1
    0, 1, 0, //? Vertex 2
    1, 0, 0, //? Vertex 3
]);
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', positionsAttribute);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
const mesh = new THREE.Mesh(geometry, material); */

const geometry = new THREE.BufferGeometry();
const count = 50;
const positionArray = new Float32Array(count * 3 * 3); //? 3 vertices per triangle, 3 coordinates per vertex
for (let i = 0; i < count * 3 * 3; i++) {
    positionArray[i] = (Math.random() - 0.5) * 4; //? -0.5 to center the object, * 4 to make it bigger
}
const positionsAttribute = new THREE.BufferAttribute(positionArray, 3);
geometry.setAttribute('position', positionsAttribute);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
const mesh = new THREE.Mesh(geometry, material);

// const mesh = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
//   new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
// );
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(
  90,
  sizes.width / sizes.height,
  0.1,
  9999
);
/* camera.position.x = 2
camera.position.y = 2 */
camera.position.z = 2;
camera.lookAt(mesh.position);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; //? Smooth the camera movement
/* controls.target.y = 1;
controls.update(); */

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); //? Limit the pixel ratio to 2 is enough for most devices

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  // mesh.rotation.y = elapsedTime;
  /* //? Move the camera with the cursor, can't see back of the object
  camera.position.x = cursor.x * 10;
  camera.position.y = cursor.y * 10; */
  // Turn around the object, can see the object from all sides
  /*   camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3; 
  camera.position.y = cursor.y * 5;  */
  camera.lookAt(mesh.position); //| camera.lookAt(new THREE.Vector3()); //? Look at the center of the scene (0,0,0)
  controls.update(); //? Update the controls

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
