import './style.css'

import * as THREE from "three";

import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {FlyControls} from "three/examples/jsm/controls/FlyControls";


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 30;

const driveRyan = new THREE.TextureLoader().load("drive.png");
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(10,10,10),
  new THREE.MeshBasicMaterial({map:driveRyan})
);
scene.add(cube);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);
const controller = new FlyControls(camera, renderer.domElement);
controller.movementSpeed = 100;
controller.rollSpeed = Math.PI/24;
controller.autoForward = false;
controller.dragToLook = true;


function addStar(){
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial({color:0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star);
}

Array(500).fill().forEach(addStar);

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * 0.01
}

document.body.onscroll = moveCamera

//const audio = new Audio("nightcall.mp3");
//audio.load();
//audio.play();

//function playAudio(){
//  const audio = new Audio("nightcall.mp3");
//  audio.load();
//  audio.play();
//}
//
//window.onload = function(){
//  playAudio();
//}

function animate(){
  requestAnimationFrame(animate);

  cube.rotation.y += 0.007;

  controls.update();
  controller.update(0.01);

  renderer.render(scene, camera);
}

animate();