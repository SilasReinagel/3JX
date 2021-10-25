<script>
  import { onMount } from 'svelte';
  import SceneLayout from '../Layout/SceneLayout.svelte';
  import * as THREE from 'three';
  import { loadFbx, loadTexture } from '../ThreeJsCore/Loaders';
  import { createOrbitControls } from '../ThreeJsCore/ThreeJsControls';
  import EnableFullScreen from '../ThreeJsCore/EnableFullscreen';

  let camera, scene, renderer;
  let canvas, controls;
  let envMap;
  let reflectionObjects = [];
  let needsReflectionUpdate = true;

  THREE.CubeCamera.prototype.updateCubeMap = function ( renderer, scene ) {
    return this.update( renderer, scene );
  };

  const getWindowAspect = () => window.innerWidth / window.innerHeight;

  const animate = (time) => {

    if (needsReflectionUpdate) {
      reflectionObjects.forEach(r => {
        r.obj.visible = false;
        r.probe.position.copy(r.obj.position);
        r.probe.updateCubeMap(renderer, scene);
        r.obj.visible = true;
      });
      needsReflectionUpdate = false;
    }

    controls.update();
    renderer.render(scene, camera);
  }

  const init = () => {
    camera = new THREE.PerspectiveCamera(70, getWindowAspect(), 0.01, 100);
    camera.position.z = 5;
    camera.position.y = 2;

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
    renderer.setClearColor(0xffffff);
    renderer.setAnimationLoop(animate);
    renderer.outputEncoding = THREE.sRGBEncoding;
    updateSize();

    EnableFullScreen(canvas);

    controls = createOrbitControls(camera, renderer);

    loadTexture('./assets/textures/coconut-mall-sky.png', t => {
        t.outputEncoding = THREE.sRGBEncoding;
        t.offset.set(0, -0.4);
        const skyCylinder = new THREE.Mesh(
          new THREE.SphereBufferGeometry(40, 40, 100, 128),
          new THREE.MeshBasicMaterial({
            map: t,
            side: THREE.BackSide
          })
        );
        skyCylinder.position.y = 0;

        scene.add(skyCylinder);        
        needsReflectionUpdate = true;
      });

    loadFbx('./assets/models/Car.fbx', m => {
      const carMesh = m.children[0];
      const carMeshMaterial = carMesh.material;

      const newMaterial = new THREE.MeshLambertMaterial({
        map: carMeshMaterial.map,
        combine: THREE.MultiplyOperation,
        reflectivity: 0.1
      });

      carMesh.material = newMaterial;

      scene.add(m);
      needsReflectionUpdate = true;
    });

    // Add Reflective Floor
    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(1024, { 
      format: THREE.RGBFormat, 
      generateMipmaps: true, 
      minFilter: THREE.LinearMipmapLinearFilter 
    });
    const reflectionCamera = new THREE.CubeCamera(0.1, 30000, cubeRenderTarget);

    const floorGeo = new THREE.PlaneGeometry(192, 192);
    const floorMat = new THREE.MeshBasicMaterial({ color: 0x111111, envMap: cubeRenderTarget.texture });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotateX(-Math.PI / 2);
    reflectionObjects.push({ probe: reflectionCamera, obj: floor });
    scene.add(reflectionCamera);
    scene.add(floor);

    scene.add(new THREE.AmbientLight(0xffffff, 0.2));

    const pointlight = new THREE.PointLight(0xffffff,1);
    pointlight.position.set(200,200,200);
    scene.add(pointlight);
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
		window.addEventListener('resize', onWindowResize);
		return () => window.removeEventListener('resize', onResize);
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
