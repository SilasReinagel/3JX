<script>
  import { onMount } from 'svelte';
  import * as THREE from 'three';

  let camera, scene, renderer;
  let geometry, material, mesh;
  let canvas;

  const getWindowAspect = () => window.innerWidth / window.innerHeight;

  const animation = (time) => {
    mesh.rotation.x = time / 2000;
    mesh.rotation.y = time / 1000;

    renderer.render( scene, camera );
  }

  const init = () => {
    camera = new THREE.PerspectiveCamera(70, getWindowAspect(), 0.01, 100);
    camera.position.z = 1;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    material = new THREE.MeshNormalMaterial();
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop( animation );
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
