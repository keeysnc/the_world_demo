import * as THREE from 'https://threejs.org/build/three.module.js';
import { FirstPersonControls } from 'https://threejs.org/examples/jsm/controls/FirstPersonControls.js';


const winWidth = window.innerWidth;
const winHeight = window.innerHeight;

let scene, camera, renderer, surface, item, item2, item3, clock, controls, raycaster, raycaster2;


init();

function init(){
  
  // load env map
  // const envMap = new THREE.CubeTextureLoader()
  // .setPath( 'textures/')
  // .load( [
  //   'unnamed-update.jpg',
  //   'unnamed-update.jpg',
  //   'unnamed-update.jpg',
  //   'unnamed-update.jpg',
  //   'unnamed-update.jpg',
  //   'unnamed-update.jpg',
  // ]);
  const loader = new THREE.TextureLoader();

  // scene and camera positioning
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  camera = new THREE.PerspectiveCamera(75, winWidth/winHeight, 0.01, 1000);
  camera.position.set( 0,0,100 );

  
  // ambient light
  // const ambient = new THREE.AmbientLight(0x5080EB, .3);
  // scene.add(ambient);

  
  // directional light
  const light = new THREE.DirectionalLight(0xffffff, .9);
  scene.add(light);

  // fog
  // const color = 0xffffff;  
  // const near = 10;
  // const far = 200;
  // scene.fog = new THREE.Fog(color, near, far);
  
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(winWidth, winHeight);

  //geometry
  const boxGeometry = new THREE.TetrahedronBufferGeometry(12,4)
  const boxMaterial = new THREE.MeshBasicMaterial({color:0xEB6A50})
  item = new THREE.Mesh(boxGeometry, boxMaterial)

  item.position.set(0,30,0)
  scene.add(item);

  const box2Geometry = new THREE.TetrahedronBufferGeometry(12,1)
  const box2Material = new THREE.MeshBasicMaterial({color:0xFF0051})
  item2 = new THREE.Mesh(box2Geometry, box2Material)

  item2.position.set(-90,60,0)
  scene.add(item2);


  const box3Geometry = new THREE.SphereBufferGeometry(12,1)
  const box3Material = new THREE.MeshBasicMaterial({color:0x14FFC4})
  item3 = new THREE.Mesh(box3Geometry, box3Material)

  item3.position.set(60,40,-40)
  scene.add(item3);

 
  // plane
  const geometry = new THREE.PlaneGeometry( 500, 500, 500, 500 );

  // initiate simplexNoise library
  // iterate through each vertex and expand the x and y vertices
  var simplex = new SimplexNoise(Math.random * 100);
  for (var i = 0, l = geometry.vertices.length; i < l; i++) {
    var v = geometry.vertices[i];
    v.z = simplex.noise2D(v.x / 500.0, v.y / 500.0) * 40;
  }
  

  const material = new THREE.MeshStandardMaterial({
    color: 0xBCFFF7, 
    side: THREE.DoubleSide,
    wireframe: true
  });


  surface = new THREE.Mesh(geometry, material);
  surface.position.set(0,0,8);
  surface.rotation.x = Math.PI / 2;
  surface.updateMatrixWorld(true);
  scene.add(surface);

  //initialize raycaster
  raycaster = new THREE.Raycaster();
  raycaster2 = new THREE.Raycaster();
  
  
  document.body.appendChild(renderer.domElement);

  
  // first person controls
  controls = new FirstPersonControls( camera, renderer.domElement );
  controls.lookSpeed = 0.1
  controls.movementSpeed = 10

  clock = new THREE.Clock(true)


  window.addEventListener('resize', resize, false);
  // window.addEventListener('keydown', getKeyCode, false);
  
  update();
  
}

function update(){
  requestAnimationFrame(update);
  renderer.render(scene, camera);
  controls.update(clock.getDelta())

   
   //set position of where the camera is and a line straight down
   // raycaster.set(origin or ray, direction -straight down)
   raycaster.set(camera.position, new THREE.Vector3(0, -1, 0));
   var intersects = raycaster.intersectObject(surface);
 
   //We take the intersection and we set the height of the sphere 
   //to equal the intersection height plus the radius of the sphere.
  camera.position.y = intersects[0].point.y + 0.2;
  if( camera.position.y < 0 ){
    camera.position.y = 0;
   }
}

function resize(){
  camera.aspect = winWidth / winHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(winWidth, winHeight);
}
