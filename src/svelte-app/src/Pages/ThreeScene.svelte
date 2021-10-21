<script>
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import { loadFbx, loadTexture } from '../ThreeJsCore/Loaders';
  import { createOrbitControls } from '../ThreeJsCore/ThreeJsControls';

  let camera, scene, renderer;
  let canvas, controls;

  const getWindowAspect = () => window.innerWidth / window.innerHeight;

  const animate = (time) => {
    controls.update();
    renderer.render( scene, camera );
  }

  const init = () => {
    camera = new THREE.PerspectiveCamera(70, getWindowAspect(), 0.01, 100);
    camera.position.z = 5;
    camera.position.y = 2;

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);

    controls = createOrbitControls(camera, renderer);

    loadFbx('./assets/models/Car.fbx', m => {
      console.log(m);
      m.position.set(0,0,0);
      scene.add(m)
    });

    const light = new THREE.AmbientLight(0xffffff, 5); // soft white light
    scene.add(light);

    loadTexture('./assets/textures/gradient-01.jpg', t => scene.background = t);
  }

  const onWindowResize = () => {
    camera.aspect = getWindowAspect();
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  
  onMount(() => {
    init();
		window.addEventListener('resize', onWindowResize);
		return () => window.removeEventListener('resize', onResize);
	});
</script>

<canvas bind:this={canvas}></canvas>

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
