<script>
  import { onMount } from 'svelte';
  import SceneLayout from '../Layout/SceneLayout.svelte';
  import * as THREE from 'three';
  import { loadFbx, loadTexture } from '../ThreeJsCore/Loaders';
  import { createOrbitControls } from '../ThreeJsCore/ThreeJsControls';
  import EnableFullScreen from '../ThreeJsCore/EnableFullscreen';  
  import * as dat from 'dat.gui'

  let camera, scene, renderer;
  let canvas, controls;
  let gui;
  let ambientLight;

  const config = {
    backgroundColor: 0xffffff,
    ambientLightIntensity: 5,
  }

  const initGui = () => {
    gui = new dat.GUI({ closeOnTop: true, closed: true });
    gui.addColor(config, 'backgroundColor')
      .onChange(() => renderer.setClearColor(config.backgroundColor));
    gui.add(config, 'ambientLightIntensity')
      .min(0)
      .max(20)
      .step(0.1)
      .onChange(() => ambientLight.intensity = config.ambientLightIntensity);
  }

  const getWindowAspect = () => window.innerWidth / window.innerHeight;

  const animate = (time) => {
    controls.update();
    renderer.render( scene, camera );
  }

  const init = () => {
    camera = new THREE.PerspectiveCamera(70, getWindowAspect(), 0.01, 100);
    camera.position.set(3,3,3);

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
    renderer.setClearColor(config.backgroundColor);
    renderer.setAnimationLoop(animate);
    updateSize();

    EnableFullScreen(canvas);

    controls = createOrbitControls(camera, renderer);

    loadFbx('./assets/models/Car.fbx', m => scene.add(m));

    ambientLight = new THREE.AmbientLight(0xffffff, 5);
    scene.add(ambientLight);
  }

  const onWindowResize = () => updateSize();

  const updateSize = () => {
    camera.aspect = getWindowAspect();
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
  
  onMount(() => {
    init();
    initGui();
		window.addEventListener('resize', onWindowResize);
		return () => { 
      if (gui)
        gui.destroy();
      window.removeEventListener('resize', onResize);
    }
	});
</script>

<SceneLayout>
  <canvas bind:this={canvas}></canvas>
</SceneLayout>

<style>
  canvas {
    position: absolute;
    
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -5;
  }
</style>
