import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Clock, Vector3 } from 'three';

const clock = new Clock();


// Setup
let mouseX = 0;
let mouseY = 0;
let delayTimer = 1000; // Delay duration in milliseconds
let elapsedTime = 0;
let modelFollowsCursor = false;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// adding the model to the scene
const loader = new GLTFLoader();
let model;//declaring the model to the scene

function loadModel() {
  loader.load(
    'model.gltf',
    function (gltf) {
      const model = gltf.scene;

      model.position.set(0,0,0);
      scene.add(model);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

loadModel();

// Torus

const geometry = new THREE.TorusGeometry(6, 0.87, 30, 1000, );
const material = new THREE.MeshStandardMaterial({ color: "#A020F0" });
const torus = new THREE.Mesh(geometry, material);
torus.position.set(2.4,0,-5)

const geometry2 = new THREE.TorusGeometry(12, 1.6, 30, 1000 ,);
const material2 = new THREE.MeshStandardMaterial({ color:"#34fe4f"})
const torus2 = new THREE.Mesh(geometry2, material2);
torus2.position.set(2.4,0,-4)

const geometry3 = new THREE.TorusGeometry(20, 3.6, 30, 1000 ,);
const material3 = new THREE.MeshStandardMaterial({ color:"#d1fe49"})
const torus3 = new THREE.Mesh(geometry3, material3);
torus3.position.set(3.0,0,-4)

scene.add(torus);
scene.add(torus2);
scene.add(torus3);
// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);


//adding stars/dotes in the background
function addStar() {
  const geometry = new THREE.IcosahedronGeometry(0.2, 0);
  //dark or navy blue stars 
  const material2 = new THREE.MeshStandardMaterial({ color: "#014760" });
  //pink stars
  const material  = new THREE.MeshStandardMaterial({ color: "#e200f7" });
  //bright blue stars
  const material3 = new THREE.MeshStandardMaterial({ color: "#25f5fc" });
//white stars
  const material4 = new THREE.MeshStandardMaterial({ color: "#ffffff" });
//green stars
  const material5 = new THREE.MeshStandardMaterial({ color: "#34fe4f" });
  //yellow stars
  const material6 = new THREE.MeshStandardMaterial({ color: "#d1fe49" });
  //orange stars
  const material7 =  new THREE.MeshStandardMaterial({ color: "#FF5F1F"});
  
  const star = new THREE.Mesh(geometry, material);
  const star2 = new THREE.Mesh(geometry, material2);
  const star3 = new THREE.Mesh(geometry, material3);
  const star4 = new THREE.Mesh(geometry, material4);
  const star5 = new THREE.Mesh(geometry, material5);
  const star6 = new THREE.Mesh(geometry, material6);
  const star7 = new THREE.Mesh(geometry, material7);

  const [x1, y1, z1] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(300));

  const [x2, y2, z2] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(300));

  const [x3, y3, z3] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(300));

  const [x4, y4, z4] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(300));
  
  const [x5, y5, z5] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(300));
  
  const [x6, y6, z6] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(300));

  const [x7, y7, z7] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(300));

  

  star.position.set(x1, y1, z1);
  star2.position.set(x2, y2, z2);
  star3.position.set(x3, y3, z3);
  star4.position.set(x4, y4, z4);
  star5.position.set(x5, y5, z5);
  star6.position.set(x6, y6, z6);
  star7.position.set(x7, y7, z7);

  scene.add(star, star2, star3, star4, star5, star6, star7);
}
Array(9000).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader();
scene.background = spaceTexture;

// Avatar

const sheelTexture = new THREE.TextureLoader().load('sheel.png');

const sheel = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map:sheelTexture}));

scene.add(sheel);

// Earth

const earthTexture = new THREE.TextureLoader().load('earth.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normalTexture,
  })
);

scene.add(earth);

earth.position.z = -10;
earth.position.x = -80;

sheel.position.z = -5;
sheel.position.x = 2;

// Sun

const sunTexture = new THREE.TextureLoader().load('sun_texture.jpg');

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
    normalMap: normalTexture,
  })
);

scene.add(sun);

sun.position.z = 92
sun.position.x = 1
sun.position.y = -60


// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  earth.rotation.x += 0.05;
  earth.rotation.y += 0.075;
  earth.rotation.z += 0.05;

  sheel.rotation.y += 0.05;
  
  sheel.rotation.z += 0.05;

  camera.position.z = t * -0.04;
  camera.position.x = t * -0.0004;
  camera.rotation.y = t * -0.0004;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  if (modelFollowsCursor) {
    elapsedTime += clock.getDelta() * 1000; // Calculate elapsed time
    
    if (elapsedTime > delayTimer) {
      const mouseNormalizedX = (mouseX / window.innerWidth) * 2 - 1;
      const mouseNormalizedY = -(mouseY / window.innerHeight) * 2 + 1;

      // Convert mouse position to three.js world coordinates
      const vector = new THREE.Vector3(
        mouseNormalizedX,
        mouseNormalizedY,
        0.5
      ).unproject(camera);

      // // Set the position of the model to follow the cursor
      // model.position.copy(vector);

      elapsedTime = 0; // Reset the elapsed time

      
    }
  }


  torus.rotation.x -= 0.11865367;
  torus.rotation.y -= 0.119367;
  torus.rotation.z -= 0.4354678;

  torus2.rotation.x += 0.08312087;
  torus2.rotation.y += 0.082093;
  torus2.rotation.z += 0.073049856;

  torus3.rotation.x -= 0.02;
  torus3.rotation.y += 0.01;
  torus3.rotation.z -= 0.02;

  earth.rotation.x += 0.005;

  sheel.rotation.y += 0.05;
  sheel.rotation.z += 0.02;

  //print where the camera is located
  console.log(camera.position)

  // controls.update();

  renderer.render(scene, camera);

}


const loop = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop)}
  loop();


//resize the scene when the user make the screen bigger and smaller
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
animate();

// Update the mouse position
window.addEventListener('mousemove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
  modelFollowsCursor = true; // Start following the cursor when mouse movement is detected
});
