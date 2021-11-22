<script>
  import * as THREE from 'three';
  import * as dat from 'dat.gui';
  import BasicOrbitScene from './BasicOrbitScene.svelte';
  import addFloor from '../SceneElements/Sand2';
  import { loadFbx } from '../ThreeJsCore/Loaders';

  let ambientLight;
  let directionalLight
  let lightTarget;

  const config = {
    ambientLightIntensity: 0.6,
    sunIntensity: 0.6,
    lightColor: 0xFFF4D6,
    shadowsEnabled: true,
    dLightX: -40,
    dLightY: 30,
    dLightZ: -40
  };

  const createCamera = () => {
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.set(-24,12,6);
    return camera;
  }

  const initGui = ({ renderer }) => {
    const gui = new dat.GUI({ closeOnTop: true, closed: true });
    gui.add(config, 'ambientLightIntensity')
      .min(0)
      .max(2)
      .step(0.1)
      .onChange(() => ambientLight.intensity = config.ambientLightIntensity);
    gui.add(config, 'sunIntensity')
      .min(0)
      .max(10)
      .step(0.1)
      .onChange(() => directionalLight.intensity = config.sunIntensity);
    gui.add(config, 'shadowsEnabled')
      .onChange(() => directionalLight.castShadow = config.shadowsEnabled);
    gui.add(config, 'dLightX')
      .min(-100)
      .max(100)
      .step(1)
      .onChange(() => directionalLight.position.x = config.dLightX);
    gui.add(config, 'dLightY')
      .min(0)
      .max(255)
      .step(1)
      .onChange(() => directionalLight.position.y = config.dLightY);
    gui.add(config, 'dLightZ')
      .min(-100)
      .max(100)
      .step(1)
      .onChange(() => directionalLight.position.z = config.dLightZ);
    return gui;
  }

  const randomFloat = (min, max) => {
    const normalized = Math.random();
    return (normalized * (max - min)) + min;
  };

  const basicModelTransform = (obj) => {
    obj.scale.set(0.02, 0.02, 0.02);
    obj.rotation.x = Math.PI / 2;
    obj.children.forEach(c => c.castShadow = true);
  }

  const setRandomSpawnPos = (v) => v.set(randomFloat(-spawnHalfRange, spawnHalfRange), 0, randomFloat(-spawnHalfRange, spawnHalfRange));

  const centerVector = new THREE.Vector3();
  const spawnVector = new THREE.Vector3();
  const spawnDesertAsset = (scene, fbxName, number) => {
    loadFbx(`./assets/models/desertcute/${fbxName}`, m => {
      basicModelTransform(m);
      m.castShadow = true;

      for(let i = 0; i < number; i++) {
        const x = m.clone();
        x.castShadow = true;
        setRandomSpawnPos(spawnVector);
        while (spawnVector.distanceTo(centerVector) < minDistanceFromCenter)
          setRandomSpawnPos(spawnVector);
        x.position.set(spawnVector.x, spawnVector.y, spawnVector.z);
        x.rotation.z = randomFloat(0, 1) * Math.PI;
        scene.add(x);
      }
    });
  }

  const spawnHalfRange = 75;
  const minDistanceFromCenter = 10;

  const init = ({ scene, renderer }) => {
    scene.background = new THREE.Color(config.lightColor);

    spawnDesertAsset(scene, 'Cactus 01.FBX', 10);
    spawnDesertAsset(scene, 'Cactus 03.FBX', 10);
    spawnDesertAsset(scene, 'Cactus 05.FBX', 10);
    spawnDesertAsset(scene, 'Tiles 01.FBX', 10);
    spawnDesertAsset(scene, 'Rock Pillar 01.FBX', 5);
    spawnDesertAsset(scene, 'Rock Pillar 02.FBX', 3);
    spawnDesertAsset(scene, 'Stone 02.FBX', 5);

    loadFbx('./assets/models/desertcute/Pyramid 01.FBX', m => {
      basicModelTransform(m);
      scene.add(m);
      m.position.set(0, 0, 0);
    });

    const sphere = new THREE.Mesh(new THREE.SphereGeometry(2, 16, 16), new THREE.MeshPhongMaterial());
    sphere.position.set(-8, 4, -6);
    sphere.visible = false;
    lightTarget = sphere;

    ambientLight = new THREE.AmbientLight(config.lightColor, config.ambientLightIntensity); 

    const shadowCameraHalfWidth = 50;
    directionalLight = new THREE.DirectionalLight(config.lightColor, config.sunIntensity);
    directionalLight.position.set(config.dLightX, config.dLightY, config.dLightZ);
    directionalLight.target = lightTarget;
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024
    directionalLight.shadow.mapSize.height = 1024
    directionalLight.shadow.bias = 0.0001;
    directionalLight.shadow.radius = 20;
    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 100;
    directionalLight.shadow.camera.top = shadowCameraHalfWidth;
    directionalLight.shadow.camera.right = shadowCameraHalfWidth;
    directionalLight.shadow.camera.bottom = -shadowCameraHalfWidth;
    directionalLight.shadow.camera.left = -shadowCameraHalfWidth;
    //scene.add(new THREE.CameraHelper(directionalLight.shadow.camera));

    scene.add(ambientLight);
    scene.add(directionalLight);
    scene.add(sphere);
    addFloor(scene);

    renderer.shadowMap.enabled = config.shadowsEnabled;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    scene.fog = new THREE.Fog(config.lightColor, 12, 100);
  };
</script>

<BasicOrbitScene config={config} createGui={initGui} init={init} createCamera={createCamera} orbitTarget={lightTarget} />
