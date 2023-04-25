import "./style.css";
import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Times
// let time = Date.now();
const clock = new THREE.Clock();

// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });

// Animation
const tick = () => {
  /*{
    // Time
    const currentTime = Date.now();
    const deltaTime = currentTime - time;
    time = currentTime; 
    
    // Update objects

    // mesh.rotation.y += 0.001 * deltaTime; //? Add deltaTime to make it frame rate independent
    // mesh.rotation.y = elapsedTime; //? elapsedTime is the time since the clock started
  } */
  const elapsedTime = clock.getElapsedTime();
  /* {
    mesh.position.y = Math.sin(elapsedTime); //? Move the cube up and down
    mesh.position.x = Math.cos(elapsedTime); //? Move the cube left and right
  } */
  {
    camera.position.y = Math.sin(elapsedTime); //? Move the camera up and down
    camera.position.x = Math.cos(elapsedTime); //? Move the camera left and right
    camera.lookAt(mesh.position); //? Make the camera look at the cube
  }
  // Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
