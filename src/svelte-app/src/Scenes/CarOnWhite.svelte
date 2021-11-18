<script>
  import * as THREE from 'three';
  import * as dat from 'dat.gui';
  import BasicOrbitScene from './BasicOrbitScene.svelte';
  import { loadFbx } from '../ThreeJsCore/Loaders';

  let ambientLight;

  const config = {
    backgroundColor: 0xffffff,
    ambientLightIntensity: 5,
  }

  const createCamera = () => {
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);
    camera.position.set(3,3,3);
    return camera;
  }

  const initGui = ({ renderer }) => {
    const gui = new dat.GUI({ closeOnTop: true, closed: true });
    gui.addColor(config, 'backgroundColor')
      .onChange(() => renderer.setClearColor(config.backgroundColor));
    gui.add(config, 'ambientLightIntensity')
      .min(0)
      .max(20)
      .step(0.1)
      .onChange(() => ambientLight.intensity = config.ambientLightIntensity);
    return gui;
  }

  const init = ({ scene }) => {
    loadFbx('./assets/models/Car.fbx', m => {
      scene.add(m);
    });

    ambientLight = new THREE.AmbientLight(0xffffff, 5);
    scene.add(ambientLight);
  };
</script>

<BasicOrbitScene config={config} createGui={initGui} init={init} createCamera={createCamera}/>
