<script>
	import * as THREE from 'three';
  import * as dat from 'dat.gui';
  import BasicOrbitScene from './BasicOrbitScene.svelte';
  import { OrbitControls } from 'three-stdlib';
	import { Reflector } from 'three-stdlib';
  import { loadFbx } from '../ThreeJsCore/Loaders';

  let loaded = false;
  let groundMirror, verticalMirror;

  const createCamera = () => {
    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
    camera.position.set(60, 50, 60);
    return camera;
  }

  const createControls = ({ camera, renderer }) => {
    const cameraControls = new OrbitControls( camera, renderer.domElement );
    cameraControls.target.set(0, 10, 0);
    cameraControls.maxDistance = 200;
    cameraControls.minDistance = 0.1;
    cameraControls.update();
    return cameraControls;
  }

  const init = ({ scene }) => {
    const planeGeo = new THREE.PlaneGeometry( 100.1, 100.1 );

    let geometry, material;

    geometry = new THREE.CircleGeometry( 40, 64 );
    groundMirror = new Reflector( geometry, {
      clipBias: 0.003,
      textureWidth: window.innerWidth * window.devicePixelRatio,
      textureHeight: window.innerHeight * window.devicePixelRatio,
      color: 0x777777
    } );
    groundMirror.position.y = 0.5;
    groundMirror.rotateX( - Math.PI / 2 );
    scene.add( groundMirror );

    geometry = new THREE.PlaneGeometry( 100, 100 );
    verticalMirror = new Reflector( geometry, {
      clipBias: 0.003,
      textureWidth: window.innerWidth * window.devicePixelRatio,
      textureHeight: window.innerHeight * window.devicePixelRatio,
      color: 0x889999
    } );
    verticalMirror.position.y = 50;
    verticalMirror.position.z = - 50;
    scene.add( verticalMirror );

    loadFbx('./assets/models/Car.fbx', m => {
      const scaleFactor = 20;
      m.scale.set(scaleFactor, scaleFactor, scaleFactor);
      scene.add(m)
    });

    // walls
    const planeTop = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );
    planeTop.position.y = 100;
    planeTop.rotateX( Math.PI / 2 );
    scene.add( planeTop );

    const planeBottom = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );
    planeBottom.rotateX( - Math.PI / 2 );
    scene.add( planeBottom );

    const planeFront = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0x7f7fff } ) );
    planeFront.position.z = 50;
    planeFront.position.y = 50;
    planeFront.rotateY( Math.PI );
    scene.add( planeFront );

    const planeRight = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0x00ff00 } ) );
    planeRight.position.x = 50;
    planeRight.position.y = 50;
    planeRight.rotateY( - Math.PI / 2 );
    scene.add( planeRight );

    const planeLeft = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xff0000 } ) );
    planeLeft.position.x = - 50;
    planeLeft.position.y = 50;
    planeLeft.rotateY( Math.PI / 2 );
    scene.add( planeLeft );

    // lights
    const mainLight = new THREE.PointLight( 0xcccccc, 1.5, 250 );
    mainLight.position.y = 60;
    scene.add( mainLight );

    const greenLight = new THREE.PointLight( 0x00ff00, 0.25, 1000 );
    greenLight.position.set( 550, 50, 0 );
    scene.add( greenLight );

    const redLight = new THREE.PointLight( 0xff0000, 0.25, 1000 );
    redLight.position.set( - 550, 50, 0 );
    scene.add( redLight );

    const blueLight = new THREE.PointLight( 0x7f7fff, 0.25, 1000 );
    blueLight.position.set( 0, 50, 550 );
    scene.add( blueLight );

    loaded = true;
  }

  const afterResize = () => {
    groundMirror.getRenderTarget().setSize(
      window.innerWidth * window.devicePixelRatio,
      window.innerHeight * window.devicePixelRatio
    );
    verticalMirror.getRenderTarget().setSize(
      window.innerWidth * window.devicePixelRatio,
      window.innerHeight * window.devicePixelRatio
    );
  }

  const animate = () => {
  }

</script>

<BasicOrbitScene animate={animate} init={init} createCamera={createCamera} afterWindowResize={afterResize} createControls={createControls} />