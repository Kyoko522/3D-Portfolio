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
var screen_width = window.innerWidth;

//Creating a new Scene
const scene = new THREE.Scene();//creating a new scene

// Setting up the Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);//setting up the camera
camera.position.setZ(30);
camera.position.setX(-3);

// Creating a new renderer
const renderer = new THREE.WebGLRenderer({//creating a new renderer
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

//Function to load a 3D model with animation
function loadModelWithAnimation(loader, modelPath, largeScreenPosition, scale, rotationSpeed, smallScreenPosition) {
  loader.load(modelPath, function (gltf) {
    const model = gltf.scene;
    scene.add(model);

    console.log(screen_width)
    model.scale.set(scale, scale, scale);
    if (screen_width >= 1700) {
      model.position.copy(largeScreenPosition);
    }
    else if (screen_width >= 1300 && screen_width <= 1700) {
      model.position.copy(smallScreenPosition)
    }
    else {
      model.position.copy(smallScreenPosition)
    }

    function animate() {
      requestAnimationFrame(animate);
      model.rotation.y += rotationSpeed;
    }

    animate();
  }, undefined, function (error) {
    console.error("The model failed to load:", error);
  });
}

const yamato = new GLTFLoader();
const raphtalia = new GLTFLoader();
const chopper = new GLTFLoader();
const rocket_model = new GLTFLoader();

// function updatePositionBasedOnScreenSize() {
//   const screenWidth = window.innerWidth;
//   const yamato = ...; // Get a reference to the yamato object, or you can pass it as an argument to this function

//   if (screenWidth < 1500) {
//     loadModelWithAnimation(yamato, 'yamato.gltf', new THREE.Vector3(smallScreenPositionX, smallScreenPositionY, smallScreenPositionZ), 0.07, 0.05);
//   } else {
//     loadModelWithAnimation(yamato, 'yamato.gltf', new THREE.Vector3(largeScreenPositionX, largeScreenPositionY, largeScreenPositionZ), 0.07, 0.05);
//   }
// }
// import Yamato_model from './Model\'s/yamato.gltf'

loadModelWithAnimation(
  yamato,
  'Model\'s/yamato.gltf',
  new THREE.Vector3(-35.98, -26.4, 12),
  0.07,
  0.05,
  new THREE.Vector3(-17.98, -26.4, 12)
);


loadModelWithAnimation(
  raphtalia,
  'Model\'s/anime2.gltf',
  new THREE.Vector3(-45.98, -27.4, 14),
  0.068,
  -0.05,
  new THREE.Vector3(-27.98, -28.4, 14)
);

loadModelWithAnimation(
  chopper,
  'Model\'s/chopper.gltf',
  new THREE.Vector3(-58.98, -24.4, 16),
  0.068,
  0.05,
  new THREE.Vector3(-40.98, -25.4, 16)
);

rocket_model.load('Model\'s/model.gltf', function (gltf) {
  const rocket = gltf.scene;
  // scene.add(rocket);//removing the rocket for now will added it later when i get the movement right

  // Set initial rotation
  rocket.rotation.y = Math.PI / 2; // Adjust the angle as needed

  //rocket tracking
  function sync(entity, renderComponent) {
    readerComponent.matrix.copy(entity.worldMatrix);
  }

  // animate();
}, undefined, function (error) {
  console.error("The model failed to load:", error);
});

// Torus's
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

scene.add(torus, torus2, torus3);

// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Function to add stars
const starGeometry = new THREE.IcosahedronGeometry(0.2, 0);//creating a new Icosahedron object to represent the stars

// Define the colors for the stars
const starColors = [
  "#e200f7", // pink stars
  "#014760", // dark/navy blue stars
  "#25f5fc", // bright blue stars
  "#ffffff", // white stars
  "#ffffff", // white stars
  "#34fe4f", // green stars
  "#d1fe49", // yellow stars
  "#FF5F1F", // orange stars
  "#FF3131"  // red stars
];

function addStar() {
  // Pick a random color for the star
  const randomColor = starColors[Math.floor(Math.random() * starColors.length)];
  const material = new THREE.MeshStandardMaterial({ color: randomColor });

  // Create the star mesh using the shared geometry and random color material
  const star = new THREE.Mesh(starGeometry, material);

  // Generate random positions for stars once
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(600));
  star.position.set(x, y, z);

  scene.add(star);
}

// Define the number of stars you want to add to the scene
const numStars = 99999; // You can adjust this number as needed

// Adding stars to the scene
Array(numStars).fill().forEach(addStar);

// Background
const spaceTexture = new THREE.TextureLoader();
scene.background = spaceTexture;

// Avatar
const sheelTexture = new THREE.TextureLoader().load('./Sheel\'s Pic/sheel.png'); //Adding a picture to the side of the box
const sheelTexture2 = new THREE.TextureLoader().load('./Sheel\'s Pic/sheel2.png'); //Adding a picture to another side of the box
const sheelTexture3 = new THREE.TextureLoader().load('./Sheel\'s Pic/sheel3.png'); //Adding a picture to another side of the box
const sheelTexture4 = new THREE.TextureLoader().load('./Sheel\'s Pic/sheel4.png'); //Adding a picture to another

const cubematerial = [
  new THREE.MeshBasicMaterial({ map: sheelTexture }), //this one is upside down
  new THREE.MeshBasicMaterial({ map: sheelTexture4 }), //more images will or should be added later need 3 more images so that each face is different
  new THREE.MeshBasicMaterial({ map: sheelTexture2 }),
  new THREE.MeshBasicMaterial({ map: sheelTexture2 }),
  new THREE.MeshBasicMaterial({ map: sheelTexture3 }),
  new THREE.MeshBasicMaterial({ map: sheelTexture3 })
]
const sheel_box = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), cubematerial);

scene.add(sheel_box);

// Earth
const earthTexture = new THREE.TextureLoader().load('Model\'s/earth.jpg');
const normalTexture = new THREE.TextureLoader().load('Model\'s/earth bump.jpg');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(60, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normalTexture,
  })
);

scene.add(earth);


earth.position.x = -200;
earth.position.z = 80;
earth.position.y = 1.55;

sheel_box.position.z = -5;
sheel_box.position.x = 2;


// Sun
const sunTexture = new THREE.TextureLoader().load('./Model\'s/moon.png');

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(20, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
    normalMap: normalTexture,
  })
);

scene.add(sun);


sun.position.x = -250;
sun.position.y = 0;
sun.position.z = -31

// Adding a tmu logo to the edcuation section
const school_logo = new THREE.TextureLoader().load('Projects Pics/TMU-rgb.png'); //Adding a picture to the side of the box
const tmu_materal =[  new THREE.MeshBasicMaterial({ map: school_logo }), //this one is upside down
  new THREE.MeshBasicMaterial({ map: school_logo  }), //more images will or should be added later need 3 more images so that each face is different
  new THREE.MeshBasicMaterial({ color: 0x000000 }), //
]
const tmu_logo = new THREE.Mesh(new THREE.BoxGeometry(1, 14.5, 29), tmu_materal);
scene.add(tmu_logo);

function resize_tmu_logo(){
if (screen_width <=1700){
tmu_logo.position.set(-52,-7,170);}
else{
  tmu_logo.position.set (-36,-3,130);
}}
resize_tmu_logo();


// Adding a tmu logo to the edcuation section
const java_cert_loader = new THREE.TextureLoader().load('Model\'s/java cert.png'); //Adding a picture to the side of the box
const java_cert_materal =[  new THREE.MeshBasicMaterial({ map: java_cert_loader }), //this one is upside down
  new THREE.MeshBasicMaterial({ map: java_cert_loader  }), //more images will or should be added later need 3 more images so that each face is different
  new THREE.MeshBasicMaterial({ color: 0x000000 }), //
]
const java_cert = new THREE.Mesh(new THREE.BoxGeometry(1, 34, 44),java_cert_materal);
scene.add(java_cert);

function resize_java_cert(){
if (screen_width <=1700){
java_cert.position.set(-40,0,355);
java_cert.scale.set(1,1,1)} //When the screen goes back to the small preview go back to the original scale for the model
else{
  java_cert.scale.set(2, 2, 2); //When the screen is large the model will be 2 time bigger in all deminations
  java_cert.position.set (-140,10,400); //change the position to when the screen is bigger
}
} 

resize_java_cert();

// Adding a resume image next to the resume section
const resume_texture = new THREE.TextureLoader().load('resume_pic.png'); //Adding a picture to the side of the box
const resume_material =[  new THREE.MeshBasicMaterial({ map: resume_texture }), //this one is upside down
  new THREE.MeshBasicMaterial({ map: resume_texture  }), //more images will or should be added later need 3 more images so that each face is different
  new THREE.MeshBasicMaterial({ color: 0xffffff })
]
const resume_cube = new THREE.Mesh(new THREE.BoxGeometry(.5, 22, 17), resume_material);
scene.add(resume_cube);

resume_cube.position.set(-8,-3,378);

// Add an event listener to the canvas or container element
const canvas = document.querySelector('canvas'); // Replace 'canvas' with the appropriate container element if needed
canvas.addEventListener('click', onCubeClick, false);

function onCubeClick(event) {
    // Get the mouse click coordinates
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Raycasting to detect if the mouse click intersects with the cube
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera); // 'camera' is your Three.js camera object
    const intersects = raycaster.intersectObject(resume_cube);

    if (intersects.length > 0) {
        // The cube is clicked
        // Perform the download action here
        downloadSomething(); // Replace this with your download function
    }
}

function downloadSomething() {
    // Implement your download logic here
    // For example, you can create a downloadable link and simulate a click event
    const link = document.createElement('a');
    link.href = "Sheel's Resume2.pdf"; // Replace with the actual download file path
    link.download = "Sheel's Resume2.pdf"; // Replace with the desired filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}



//create a blue LineBasicMaterial
const helpers = new THREE.LineBasicMaterial({ color: 0x0000ff });

const points = [];
points.push(new THREE.Vector3(0, 0, 100));
points.push(new THREE.Vector3(0, 100, 0));
points.push(new THREE.Vector3(100, 0, 0));

const lines = new THREE.BufferGeometry().setFromPoints(points);

const line = new THREE.Line(lines, helpers);

scene.add(line);


// Scroll Animation
function moveCamera() {

  console.log(camera.position)
  const t = document.body.getBoundingClientRect().top;

  sheel_box.rotation.y += 0.05;

  sheel_box.rotation.z += 0.05;

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
  torus.rotation.x -= 0.91865367;
  torus.rotation.y -= 0.919367;
  torus.rotation.z -= 0.9354678;

  torus2.rotation.x += 0.08312087;
  torus2.rotation.y += 0.082093;
  torus2.rotation.z += 0.073049856;

  torus3.rotation.x -= 0.02;
  torus3.rotation.y += 0.01;
  torus3.rotation.z -= 0.02;

  earth.rotation.y += 0.05;
  earth.rotation.x += -0.003;

  sheel_box.rotation.y += 0.05;
  sheel_box.rotation.z += 0.02;

  resume_cube.rotation.y += 0.03;

  tmu_logo.rotation.y += 0.03

  java_cert.rotation.y += -0.03

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
  screen_width = window.innerWidth;
  resize_tmu_logo();
  resize_java_cert();
});
animate();

// Update the mouse position
window.addEventListener('mousemove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
  modelFollowsCursor = true; // Start following the cursor when mouse movement is detected
});





// notes here at 1185 to 1772 all three nodel need to move to the right
// all models still need to be clickable currently they are doing nothing
// also need ot split up the main.js into smaller file so that 
// want the model to move or drift way when the user is scrolling down and drift back in place when scrolling back into the corrent place



// Notes for Next Time

// - For the models like the tmu model, the cert model and resume make it a function next time so that you don't keep copy pasting the same time of code
// - Use class and other files to break your code down so that it's organized making it a lot easier to find what your looking for (don't do everything in one file)
// - When deploying your website you will need to turn the image into url so use this link https://vitejs.dev/guide/assets.html