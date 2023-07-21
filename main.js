import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Clock, Vector3 } from 'three';
import * as YUKA from 'yuka';
// import { scale } from 'math/dist/declarations/src/vector2';
// import * as DAT from 'https://cdn.jsdelivr.net/npm/dat.gui@0.7.7/build/dat.gui.module.js'

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

function loadModelWithAnimation(loader, modelPath, position, scale, rotationSpeed) {
  loader.load(modelPath, function (gltf) {
    const model = gltf.scene;
    scene.add(model);

    model.scale.set(scale, scale, scale);
    model.position.copy(position);

    function animate() {
      requestAnimationFrame(animate);
      model.rotation.y += rotationSpeed;
    }

    animate();
  }, undefined, function (error) {
    console.error("The model failed to load:", error);
  });
}

const anime_model = new GLTFLoader();
const anime_model2 = new GLTFLoader();
const chopper = new GLTFLoader();

loadModelWithAnimation(
  anime_model,
  'yamato.gltf',
  new THREE.Vector3(-29.98, -27.4, 12),
  0.07,
  0.05
);

loadModelWithAnimation(
  anime_model2,
  'anime2.gltf',
  new THREE.Vector3(-39.98, -29.4, 14),
  0.068,
  -0.05
);

loadModelWithAnimation(
  chopper,
  'chopper.gltf',
  new THREE.Vector3(-52.98, -26.4, 16),
  0.068,
  0.05
);


//Rocket
const rocket_model = new GLTFLoader();

rocket_model.load('model.gltf', function (gltf) {
  const rocket = gltf.scene;
  scene.add(rocket);

  // Set initial rotation
  rocket.rotation.y = Math.PI / 2; // Adjust the angle as needed

  //rocket tracking
  function sync(entity, renderComponent) {
    readerComponent.matrix.copy(entity.worldMatrix);
  }

  // const pursuer = new YUKA.Vehicle();
  // pursuer.setRenderComponent(rocket, sync);
  // YUKA.EntityManager.add(pursuer);
  // pursuer.position.set(-10, 0, -3);
  // pursuer.maxSpeed = 3;

  // const evaderGeometry = new THREE.SphereBufferGeometry(0.01);
  // const evaderMaterial = new THREE.MeshPhongMaterial({ color: 0xFFEA00 });
  // const evaderMesh = new THREE.Mesh(evaderGeometry, evaderMaterial);
  // evaderMesh.matrixAutoUpdate = false;
  // scene.add(evaderMesh);

  // const evader = new YUKA.Vehicle();
  // evader.setRenderComponent(evaderMesh, sync);
  // entityManager.add(evader);
  // evader.position.set(2, 0, -3);
  // evader.maxSpeed = 2;

  // const pursuitBehavior = new YUKA.PursuitBehavior(evader, 5);
  // pursuer.steering.add(pursuitBehavior);

  // const evaderTarget = new YUKA.Vector3();
  // const seekBehavior = new YUKA.SeekBehavior(evaderTarget);
  // evader.steering.add(seekBehavior);

  // const time = new YUKA.Time();


  // // Animation function to rotate the model
  // function animate() {
  //   const delta = time.update().getDelta();
  //   YUKA.entityManager.update(delta);

  //   const elapsed = time.getElapsed();
  //   evaderTarget.x = Math.cos(elapsed) * Math.sin(elapsed * 0.2) * 6;
  //   evaderTarget.z = Math.sin(elapsed * 0.8) * 6;

  //   renderer.render(scene, camera);
  //   requestAnimationFrame(animate);
  // }

  // animate();
}, undefined, function (error) {
  console.error("The model failed to load:", error);
});

// Torus
const geometry = new THREE.TorusGeometry(6, 0.87, 30, 1000,);
const material = new THREE.MeshStandardMaterial({ color: "#36013F" });
// const material = new THREE.MeshStandardMaterial({ color: "#A020F0" });
const torus = new THREE.Mesh(geometry, material);
torus.position.set(2.4, 0, -5)

const geometry2 = new THREE.TorusGeometry(12, 1.6, 30, 1000,);
const material2 = new THREE.MeshStandardMaterial({ color: "#000040" })
// const material2 = new THREE.MeshStandardMaterial({ color: "#34fe4f" })
const torus2 = new THREE.Mesh(geometry2, material2);
torus2.position.set(2.4, 0, -4)

const geometry3 = new THREE.TorusGeometry(20, 2.6, 30, 1000,);
const material3 = new THREE.MeshStandardMaterial({ color: "#000000" })
// const material3 = new THREE.MeshStandardMaterial({ color: "#d1fe49" })
const torus3 = new THREE.Mesh(geometry3, material3);
torus3.position.set(3.0, 0, -4)

scene.add(torus);
scene.add(torus2);
scene.add(torus3);

// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Stars
function addStar() {
  const geometry = new THREE.IcosahedronGeometry(0.2, 0);
  //dark or navy blue stars 
  const material2 = new THREE.MeshStandardMaterial({ color: "#014760" });
  //pink stars
  const material = new THREE.MeshStandardMaterial({ color: "#e200f7" });
  //bright blue stars
  const material3 = new THREE.MeshStandardMaterial({ color: "#25f5fc" });
  //white stars
  const material4 = new THREE.MeshStandardMaterial({ color: "#ffffff" });
  //green stars
  const material5 = new THREE.MeshStandardMaterial({ color: "#34fe4f" });
  //yellow stars
  const material6 = new THREE.MeshStandardMaterial({ color: "#d1fe49" });
  //orange stars
  const material7 = new THREE.MeshStandardMaterial({ color: "#FF5F1F" });
  //red stars
  const material8 = new THREE.MeshStandardMaterial({ color: "#FF3131" });

  const star = new THREE.Mesh(geometry, material);
  const star2 = new THREE.Mesh(geometry, material2);
  const star3 = new THREE.Mesh(geometry, material3);
  const star4 = new THREE.Mesh(geometry, material4);
  const star5 = new THREE.Mesh(geometry, material5);
  const star6 = new THREE.Mesh(geometry, material6);
  const star7 = new THREE.Mesh(geometry, material7);
  const star8 = new THREE.Mesh(geometry, material8);

  const [x1, y1, z1] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(350));

  const [x2, y2, z2] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(350));

  const [x3, y3, z3] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(350));

  const [x4, y4, z4] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(350));

  const [x5, y5, z5] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(350));

  const [x6, y6, z6] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(350));

  const [x7, y7, z7] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(350));

  const [x8, y8, z8] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(350));


  star.position.set(x1, y1, z1);
  star2.position.set(x2, y2, z2);
  star3.position.set(x3, y3, z3);
  star4.position.set(x4, y4, z4);
  star5.position.set(x5, y5, z5);
  star6.position.set(x6, y6, z6);
  star7.position.set(x7, y7, z7);
  star8.position.set(x8, y8, z8);

  scene.add(star, star2, star3, star4, star5, star6, star7, star8);

}
Array(9000).fill().forEach(addStar);


// Background
const spaceTexture = new THREE.TextureLoader();
scene.background = spaceTexture;

// Avatar
const sheelTexture = new THREE.TextureLoader().load('sheel.png'); //Adding a picture to the side of the box
const sheelTexture2 = new THREE.TextureLoader().load('sheel2.png'); //Adding a picture to another side of the box
const sheelTexture3 = new THREE.TextureLoader().load('sheel3.png'); //Adding a picture to another side of the box

const cubematerial = [
  new THREE.MeshBasicMaterial({ map: sheelTexture }), //this one is upside down
  new THREE.MeshBasicMaterial({ map: sheelTexture }),
  new THREE.MeshBasicMaterial({ map: sheelTexture2 }),
  new THREE.MeshBasicMaterial({ map: sheelTexture2 }),
  new THREE.MeshBasicMaterial({ map: sheelTexture3 }),
  new THREE.MeshBasicMaterial({ map: sheelTexture3 })
]
const sheel = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), cubematerial);

scene.add(sheel);

// Earth
const earthTexture = new THREE.TextureLoader().load('earth.jpg');
const normalTexture = new THREE.TextureLoader().load('earth bump.jpg');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normalTexture,
  })
);

scene.add(earth);

earth.position.z = 80;
earth.position.x = -30;
earth.position.y = 1.55;

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

  console.log(camera.position)
  const t = document.body.getBoundingClientRect().top;
  // earth.rotation.x += 1.5;
  // earth.rotation.y += 0.075;
  // earth.rotation.z += 0.05;

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

    }
    elapsedTime = 0; // Reset the elapsed time
  }

// to go back to the original rotation cahnge the first 1 into a 0
  torus.rotation.x -= 1.11865367;
  torus.rotation.y -= 1.119367;
  torus.rotation.z -= 1.4354678;

  torus2.rotation.x += 1.08312087;
  torus2.rotation.y += 1.082093;
  torus2.rotation.z += 1.073049856;

  torus3.rotation.x -= 1.02;
  torus3.rotation.y += 1.01;
  torus3.rotation.z -= 1.02;

  earth.rotation.y += 0.05;
  earth.rotation.x += 0.001;

  sheel.rotation.y += 0.05;
  sheel.rotation.z += 0.02;

  renderer.render(scene, camera);
}



const loop = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop)
}
loop();


// Resize the scene
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

