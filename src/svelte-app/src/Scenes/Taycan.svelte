<script>
  import { onMount } from 'svelte';
  import SceneLayout from '../Layout/SceneLayout.svelte';
  import * as THREE from 'three';
  import { loadFbx, loadTexture, loadTextures } from '../ThreeJsCore/Loaders';
  import { createOrbitControls } from '../ThreeJsCore/ThreeJsControls';
  import { setMaterialDoubleSidedRecursive } from '../ThreeJsCore/MeshUtils';
  import EnableFullScreen from '../ThreeJsCore/EnableFullscreen';
  import LoaderVisual from '../Elements/Loader.svelte';
  import * as dat from 'dat.gui';
  import addFloor from '../SceneElements/ConcretePlane-02';

  let loaded = false;
  let camera, scene, renderer;
  let canvas, controls;
  let envMap;
  let reflectionObjects = [];
  let needsReflectionUpdate = true;
  let mainObj;
  let gui;

  const config = {
    mainPositionY: 0.6,
  }

  const initGui = () => {
    gui = new dat.GUI({ closeOnTop: true, closed: true });
    gui.close();
    gui.add(config, 'mainPositionY')
      .step(0.1)
      .onChange(() => mainObj.position.y = config.mainPositionY);
  }

  THREE.CubeCamera.prototype.updateCubeMap = function ( renderer, scene ) {
    return this.update( renderer, scene );
  };

  const getWindowAspect = () => window.innerWidth / window.innerHeight;

  const animate = (time) => {
    if (!loaded)
      return;

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
    camera.position.z = 3;
    camera.position.x = 3;
    camera.position.y = 2;

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
    renderer.setClearColor(0xffffff);
    renderer.setAnimationLoop(animate);
    renderer.outputEncoding = THREE.sRGBEncoding;
    updateSize();

    EnableFullScreen(canvas);

    controls = createOrbitControls(camera, renderer);

    loadSkySphere(scene);

    loadFbx('./assets/models/taycan/taycan_applied_srink_V2.fbx', model => {
      const scaleFactor = 1;
      model.position.set(0,config.mainPositionY,0);
      model.scale.set(scaleFactor, scaleFactor, scaleFactor);
      setMaterialDoubleSidedRecursive(model);
      mainObj = model;
      scene.add(model);

      loaded = true;
    });

    addFloor(scene);

    scene.add(new THREE.AmbientLight(0xffffff, 0.2));

    const pointlight = new THREE.PointLight(0xffffff,1);
    pointlight.position.set(200,200,200);
    scene.add(pointlight);
  }

  const loadSkySphere = (scene) => {
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
      });
  };

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
		return () => window.removeEventListener('resize', onResize);
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
