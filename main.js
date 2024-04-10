import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

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

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);


function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  star.globalAlpha = 0.1;
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// OCEAN Background

//const oceanTexture = new THREE.TextureLoader().load('ocean1.jpg');
const oceanTexture = new THREE.TextureLoader().load('new-ocean.webp');
scene.background = oceanTexture;

// PLASTIC SQUARE

const plasticTexture = new THREE.TextureLoader().load('oceanplastic.webp');

const plastic = new THREE.Mesh(new THREE.BoxGeometry(20, 20, 20), new THREE.MeshBasicMaterial({ map: plasticTexture }));

scene.add(plastic);


plastic.position.z = 0;
plastic.position.x = 10;

// BEACH SQUARE

const beachTexture = new THREE.TextureLoader().load('beach.webp');

const beach = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshBasicMaterial({ map: beachTexture }));

scene.add(beach);


beach.position.z = -100;
beach.position.x = 5;

// TURTLE SQUARE

const turtleTexture = new THREE.TextureLoader().load('turtle.webp');

const turtle = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), new THREE.MeshBasicMaterial({ map: turtleTexture }));
//const turtle = new THREE.Mesh(new THREE.CapsuleGeometry( 1, 1, 4, 8 ), new THREE.MeshBasicMaterial({ map: turtleTexture }));


scene.add(turtle);


turtle.position.z = -400;
turtle.position.x = -10;



// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  // plastic square inside movement
  plastic.rotation.y = t * 0.001;
  plastic.rotation.z = t * 0.001;
  plastic.position.z = t * 0.2;
  plastic.position.x -= 0.008;

  // beach square inside movement

  beach.rotation.y = t * 0.001;
  beach.rotation.z = t * 0.001;
  beach.position.z = t * 0.004;
  beach.position.x -= 0.008;

  // turtle square inside movement
  turtle.rotation.y = t * 0.001;
  turtle.rotation.z = t * 0.001;
  turtle.position.z = t * 0.000008;
  turtle.position.x -= 0.008;


  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0004;

  camera.rotation.z = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

 

  renderer.render(scene, camera);
}

animate();


// animating the videos

//const animationSection = document.querySelector('.animation');

//const green = document.querySelector('.green');

//animation.onscroll = () => {
//if (animation.scrollTop > 0){

//  green.play();
//}
//}



// fetching videos from wordpress

const endpoint = "https://federicobarbieri.dk/cph-cartel/wp-json/wp/v2/media";


async function getData() {
    let result = await fetch(endpoint);
    showPosts(await result.json());
}

function showPosts(posts){
    
    posts.forEach((bikini) => {

        let template = document.querySelector('template').content;
        let clone = template.cloneNode(true);

        clone.querySelector('video').src = bikini.source_url;

        let parent = document.querySelector('.animation');

        parent.appendChild(clone);
    });
}

getData();

