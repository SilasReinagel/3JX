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

  let loaded = false;
  let camera, scene, renderer;
  let canvas, controls;
  let reflectionObjects = [];
  let needsReflectionUpdate = true;
  let mainObj;
  let gui;
  let lightmapMaterial, darkmapMaterial;
  let floorMat;

  const config = {
    mainPositionY: 0.6,
    lightmapOpacity: 0.6,
    darkmapOpacity: 0.6,
    displacementBias: 0,
    displacementScale: 0.02,
    bumpScale: 0.1
  }

  const addFloor = (scene) =>
  loadTextures([
    './assets/textures/concrete_32/concrete-032-512-diffuse.jpg', 
    './assets/textures/concrete_32/concrete-032-512-distortion-01.jpg', 
    './assets/textures/concrete_32/concrete-032-512-roughness.jpg',
    './assets/textures/concrete_32/concrete-032-512-bump.jpg',
  ], textures => {

    const repeatX = 96 / 4;
    textures.forEach(t => {
      t.wrapS = THREE.RepeatWrapping;
      t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(repeatX, repeatX);
      t.offset.set(0, 0);
    });

    textures[0].encoding = THREE.sRGBEncoding;

    const geo = new THREE.PlaneGeometry(96, 96, 2048, 2048);
    const mat = new THREE.MeshStandardMaterial({
      map: textures[0],
      roughnessMap: textures[2],
      displacementMap: textures[1],
      displacementBias: config.displacementBias,
      displacementScale: config.displacementScale,
      bumpMap: textures[3],
      bumpScale: config.bumpScale
    });
    floorMat = mat;
    const obj = new THREE.Mesh(geo, mat);
    obj.rotateX(-Math.PI / 2);
    scene.add(obj);
  });

  const initGui = () => {
    gui = new dat.GUI({ closeOnTop: true, closed: true });
    gui.close();
    gui.add(config, 'mainPositionY')
      .step(0.1)
      .onChange(() => mainObj.position.y = config.mainPositionY);
    gui.add(config, 'lightmapOpacity')
      .step(0.1)
      .min(0)
      .max(1)
      .onChange(() => lightmapMaterial.opacity = config.lightmapOpacity);
    gui.add(config, 'darkmapOpacity')
      .step(0.1)
      .min(0)
      .max(1)
      .onChange(() => darkmapMaterial.opacity = config.darkmapOpacity);
    gui.add(config, 'displacementBias')
      .step(0.1)
      .min(-1)
      .max(10)
      .onChange(() => floorMat.displacementBias = config.displacementBias);
    gui.add(config, 'displacementScale')
      .step(0.01)
      .min(-1)
      .max(1)
      .onChange(() => floorMat.displacementScale = config.displacementScale);
    gui.add(config, 'bumpScale')
      .step(0.01)
      .min(-1)
      .max(1)
      .onChange(() => floorMat.bumpScale = config.bumpScale);
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

    loadTexture('./assets/textures/fake-lightmap-03.png', t => {
      t.wrapS = THREE.RepeatWrapping;
      t.wrapT = THREE.RepeatWrapping;
      t.encoding = THREE.sRGBEncoding;
      t.offset.set(0, 0);

      const geo = new THREE.PlaneGeometry(96, 96);
      const mat = new THREE.MeshStandardMaterial({
        map: t,
        transparent: true,
        opacity: config.lightmapOpacity
      });

      lightmapMaterial = mat;

      const obj = new THREE.Mesh(geo, mat);
      obj.rotateX(-Math.PI / 2);
      obj.position.setY(0.1);
      scene.add(obj);
    });

    // loadTexture('./assets/textures/fake-darkmap-03.png', t => {
    //   t.wrapS = THREE.RepeatWrapping;
    //   t.wrapT = THREE.RepeatWrapping;
    //   t.encoding = THREE.sRGBEncoding;
    //   t.offset.set(0, 0);

    //   const geo = new THREE.PlaneGeometry(96, 96);
    //   const mat = new THREE.MeshStandardMaterial({
    //     map: t,
    //     transparent: true,
    //     opacity: config.darkmapOpacity        
    //   });

    //   darkmapMaterial = mat;

    //   const obj = new THREE.Mesh(geo, mat);
    //   obj.rotateX(-Math.PI / 2);
    //   obj.position.setY(0.2);
    //   scene.add(obj);
    // });

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
