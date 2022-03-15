<script>
  export let init;
  export let config = ({});
  export let loaded = false;
  export let animate = () => {};
  export let dispose = () => {};
  export let onFrame = () => {};
  export let createGui = undefined;
  export let createCamera = undefined;
  export let createControls = undefined;
  export let createRenderer = undefined;
  export let afterWindowResize = () => {};
  export let orbitTarget = undefined;
  export let showControls = true;

  import { onMount } from 'svelte';
  import SceneLayout from '../Layout/SceneLayout.svelte';
  import LoaderVisual from '../Elements/Loader.svelte';
  import * as THREE from 'three';
  import { createOrbitControls } from '../ThreeJsCore/ThreeJsControls';
  import EnableFullScreen from '../ThreeJsCore/EnableFullscreen';  

  let scene = new THREE.Scene();
  let camera, renderer;
  let canvas, controls;
  let gui;
  let clock = new THREE.Clock();

  const getWindowAspect = () => window.innerWidth / window.innerHeight;

  const render = () => {
    if (!loaded)
      return;
    
    animate({ scene, camera, renderer, clock });
    if (controls)
      controls.update();
    onFrame({ scene, camera, renderer });
    renderer.render(scene, camera);
  }

  const setupCamera = () => {
    if (createCamera) {
      camera = createCamera();
    } else {
      camera = new THREE.PerspectiveCamera(70, getWindowAspect(), 0.01, 100);
      camera.position.set(3,3,3);
    }
  }

  const setupThree = () => {
    setupCamera();

    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
    renderer.setClearColor(config.backgroundColor);
    renderer.setAnimationLoop(render);
    updateSize();

    EnableFullScreen(canvas);

    if (createControls) {
      controls = createControls({ camera, renderer });
    } else {
      controls = createOrbitControls(camera, renderer);
      if (orbitTarget)
        controls.target = orbitTarget;
    }

    const initParams = init({ camera, scene, renderer });
    if (showControls)
      gui = createGui({ camera, scene, renderer, ...initParams });
    if (createRenderer)
      renderer = createRenderer();
    loaded = true;
  }

  const onWindowResize = () => {
    updateSize();
    afterWindowResize();
  }

  const updateSize = () => {
    camera.aspect = getWindowAspect();
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
  
  onMount(() => {
    setupThree();
		window.addEventListener('resize', onWindowResize);
		return () => { 
      if (gui)
        gui.destroy();
      window.removeEventListener('resize', onResize);
      dispose();
    }
	});
</script>

<SceneLayout>
  <canvas bind:this={canvas}></canvas>
</SceneLayout>

{#if !loaded}
  <LoaderVisual/>
{/if}

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
