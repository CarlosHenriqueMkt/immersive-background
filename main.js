import '/style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


//Cena
const scene = new THREE.Scene();
THREE.ColorManagement.enabled = false

//Tamanhos
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
}

/**
 * Geometria com uma textura
 */
const skyGeo = new THREE.SphereGeometry(45, 40, 40)
const texture = new THREE.TextureLoader().load('symmetrical_garden_02.jpg')
const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide })

const skyBox = new THREE.Mesh(skyGeo, material)
skyBox.userData = 'no-occlusion'
scene.add(skyBox)


//Camera
const camera = new THREE.PerspectiveCamera(45, size.width / size.height, 0.1, 1000);
camera.position.z = 8.5
scene.add(camera)


//Responsividade
window.addEventListener('resize', () => {
  //Atualiza a proporção da tela
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  
  //Atualiza a camera
  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix();
  
  //Atualiza o renderizador
  renderer.setSize(size.width, size.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//Renderizador
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
document.body.appendChild(renderer.domElement);
renderer.setSize(size.width, size.height);

//Controle para olhar em volta
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableZoom = false

//Relógio utilizado para atualização/animação frame a frame
const clock = new THREE.Clock()
console.log(clock)

const animation = () => {
  /* const elapsedTime = clock.getElapsedTime()
  console.log(elapsedTime)

  camera.position.x = elapsedTime * 2 */
  controls.update()
  renderer.render(scene, camera);

  requestAnimationFrame(animation)
}

animation()
