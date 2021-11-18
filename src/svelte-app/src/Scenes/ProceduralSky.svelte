<script>
  import * as THREE from 'three';
  import * as dat from 'dat.gui';
  import BasicOrbitScene from './BasicOrbitScene.svelte';
  import addFloor from '../SceneElements/SandMessyPlane';
  import { Sky } from 'three/examples/jsm/objects/Sky';

  let localRenderer;
  let ambientLight;
  let sun = new THREE.Vector3();
  let sky = new Sky();
  let cameraTarget = new THREE.Vector3();

  const config = {
    turbidity: 6.7,
    rayleigh: 4.5,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.88,
    elevation: 50,
    azimuth: 26,
    exposure: 1
  };

  function initSky(scene) {
    sky.scale.setScalar( 450000 );
    scene.add(sky);
  }

  const guiChanged = () => {
    const uniforms = sky.material.uniforms;
    uniforms['turbidity'].value = config.turbidity;
    uniforms['rayleigh'].value = config.rayleigh;
    uniforms['mieCoefficient'].value = config.mieCoefficient;
    uniforms['mieDirectionalG'].value = config.mieDirectionalG;

    const phi = THREE.MathUtils.degToRad(90 - config.elevation);
    const theta = THREE.MathUtils.degToRad(config.azimuth + 180);

    sun.setFromSphericalCoords(1, phi, theta);

    uniforms['sunPosition'].value.copy(sun);

    localRenderer.toneMappingExposure = config.exposure;
  }

  const createCamera = () => {
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);
    camera.position.set(3,6,3);
    cameraTarget.set(0, 6, 0);
    return camera;
  }

  const initGui = ({ renderer }) => {
    localRenderer = renderer;
    const gui = new dat.GUI({ closeOnTop: true, closed: true });

    gui.add(config, 'turbidity', 0.0, 20.0, 0.1 ).onChange(guiChanged);
    gui.add(config, 'rayleigh', 0.0, 10, 0.001 ).onChange(guiChanged);
    gui.add(config, 'mieCoefficient', 0.0, 0.1, 0.001 ).onChange(guiChanged);
    gui.add(config, 'mieDirectionalG', 0.0, 1, 0.001 ).onChange(guiChanged);
    gui.add(config, 'elevation', 0, 90, 0.1 ).onChange(guiChanged);
    gui.add(config, 'azimuth', - 180, 180, 0.1 ).onChange(guiChanged);
    gui.add(config, 'exposure', 0, 5, 0.0001 ).onChange(guiChanged);
    guiChanged();

    return gui;
  }

  const init = ({ scene, renderer }) => {    
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    addFloor(scene);
    initSky(scene);

    ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
  };
</script>

<BasicOrbitScene config={config} createGui={initGui} init={init} createCamera={createCamera} orbitTarget={cameraTarget}/>
