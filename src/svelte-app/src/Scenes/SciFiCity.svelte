<script>
import BasicOrbitScene from './BasicOrbitScene.svelte';
import * as THREE from 'three';
import { gsap } from 'gsap';

let clock = new THREE.Clock();
let camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 1, 500 );
let city = new THREE.Object3D();
let smoke = new THREE.Object3D();
let town = new THREE.Object3D();
let cameraFocalPoint = new THREE.Vector3();

const config = {
  createCarPos: true,
  sceneColor: 0x42f5ec,
  fogStartDistance: 10,
  fogEndDistance: 32,
};

const createCamera = () => {
  camera.position.set(0, 2, 14);
  return camera;
}

const mathRandom = (num = 8) => {
  var numValue = - Math.random() * num + Math.random() * num;
  return numValue;
};

const createCars = (cScale = 2, cPos = 20, cColor = 0xFFFF00) => {
  var cMat = new THREE.MeshToonMaterial({color:cColor, side:THREE.DoubleSide});
  var cGeo = new THREE.BoxGeometry(1, cScale/40, cScale/40);
  var cElem = new THREE.Mesh(cGeo, cMat);
  var cAmp = 3;
  
  if (config.createCarPos) {
    config.createCarPos = false;
    cElem.position.x = -cPos;
    cElem.position.z = (mathRandom(cAmp));

    //gsap.to(cElem.position, { duration:3, x:cPos, repeat:-1, yoyo:true, delay:mathRandom(3)});
  } else {
    config.createCarPos = true;
    cElem.position.x = (mathRandom(cAmp));
    cElem.position.z = -cPos;
    cElem.rotation.y = 90 * Math.PI / 180;
  
    //gsap.to(cElem.position, { duration:5, z:cPos, repeat:-1, yoyo:true, delay:mathRandom(3), ease:"power2.inOut" });
  };
  cElem.receiveShadow = true;
  cElem.castShadow = true;
  cElem.position.y = Math.abs(mathRandom(5));
  city.add(cElem);
};

const createBuildings = (numBuildings = 100) => {
  var segments = 2;

  var geometry = new THREE.BoxGeometry(1,1,1,segments,segments,segments);
  var material = new THREE.MeshStandardMaterial({
    color:0x000000,
    wireframe:false,
    //opacity:0.9,
    //transparent:true,
    //roughness: 0.3,
    //metalness: 1,
    //shading: THREE.SmoothShading,
    //shading:THREE.FlatShading,
    side:THREE.DoubleSide});
  var wmaterial = new THREE.MeshLambertMaterial({
    color:0xFFFFFF,
    wireframe:true,
    transparent:true,
    opacity: 0.03,
    side:THREE.DoubleSide/*,
    shading:THREE.FlatShading*/});

  for (var i = 1; i<numBuildings; i++) {
    var cube = new THREE.Mesh(geometry, material);
    var wfloor = new THREE.Mesh(geometry, wmaterial);

    var floor = new THREE.Mesh(geometry, material);
    floor.scale.y = 0.05;
    floor.position.set(cube.position.x, 0, cube.position.z)

    cube.castShadow = false;
    cube.receiveShadow = false;
    cube.rotationValue = 0.1+Math.abs(mathRandom(8));
    
    cube.scale.y = 0.1+Math.abs(mathRandom());
    
    var cubeWidth = 0.9;
    cube.scale.x = cube.scale.z = cubeWidth+mathRandom(1-cubeWidth);
    cube.position.x = Math.round(mathRandom());
    cube.position.z = Math.round(mathRandom());
    
    cube.add(wfloor);
    town.add(floor);
    town.add(cube);
  }
}

const init = ({ scene, renderer }) => {
  if (window.innerWidth > 800) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.needsUpdate = true;
  };

  scene.background = new THREE.Color(config.sceneColor);
  scene.fog = new THREE.Fog(config.sceneColor, config.fogStartDistance, config.fogEndDistance);

  //----------------------------------------------------------------- GRID Helper
  var gridHelper = new THREE.GridHelper( 60, 120, 0xFF0000, 0x000000);
  city.add( gridHelper );

  createBuildings(100);
  generateLines();

  //----------------------------------------------------------------- Lights
  var ambientLight = new THREE.AmbientLight(0xFFFFFF, 4);
  var lightFront = new THREE.SpotLight(0xFFFFFF, 20, 10);
  var lightBack = new THREE.PointLight(0xFFFFFF, 0.5);

  lightFront.rotation.x = 45 * Math.PI / 180;
  lightFront.rotation.z = -45 * Math.PI / 180;
  lightFront.position.set(5, 5, 5);
  lightFront.castShadow = true;
  lightFront.shadow.mapSize.width = 6000;
  lightFront.shadow.mapSize.height = lightFront.shadow.mapSize.width;
  lightFront.penumbra = 0.1;
  lightBack.position.set(0,6,0);

  smoke.position.y = 2;

  scene.add(ambientLight);
  scene.add(lightBack);
  scene.add(city);
  city.add(lightFront);
  city.add(smoke);
  city.add(town);

  //----------------------------------------------------------------- Particular
  
  var gmaterial = new THREE.MeshToonMaterial({color:0xFFFF00, side:THREE.DoubleSide});
  var gparticular = new THREE.CircleGeometry(0.01, 3);
  var aparticular = 5;
  
  for (var h = 1; h<300; h++) {
    var particular = new THREE.Mesh(gparticular, gmaterial);
    particular.position.set(mathRandom(aparticular), mathRandom(aparticular),mathRandom(aparticular));
    particular.rotation.set(mathRandom(),mathRandom(),mathRandom());
    smoke.add(particular);
  };
  
  var pmaterial = new THREE.MeshPhongMaterial({
    color:0x000000,
    side:THREE.DoubleSide,
    opacity:0.9,
    transparent:true});
  var pgeometry = new THREE.PlaneGeometry(60,60);
  var pelement = new THREE.Mesh(pgeometry, pmaterial);
  pelement.rotation.x = -90 * Math.PI / 180;
  pelement.position.y = -0.001;
  pelement.receiveShadow = false;

  city.add(pelement);

  cameraFocalPoint.set(city.position.x, city.position.y + 1, city.position.z);
  camera.lookAt(cameraFocalPoint);
};

const dispose = () => {

}

const generateLines = () => {
  for (var i = 0; i<60; i++) {
    createCars(0.1, 20);
  };
};

//----------------------------------------------------------------- ANIMATE

const animate = ({ renderer, scene, camera }) => {
  const deltaTime = clock.getDelta();
  const elapsed = clock.getElapsedTime();
  
  smoke.rotation.y += 0.1 * deltaTime;
  smoke.rotation.x += 0.1 * deltaTime;

  camera.position.y = Math.sin(elapsed * 0.5) * 0.04 + 6;
  camera.position.x += Math.sin(elapsed * 0.01) * 0.02;
  camera.position.z += Math.sin(elapsed) * 0.01;

  camera.lookAt(cameraFocalPoint);
}
</script>

<BasicOrbitScene init={init} dispose={dispose} animate={animate} createCamera={createCamera}/>
