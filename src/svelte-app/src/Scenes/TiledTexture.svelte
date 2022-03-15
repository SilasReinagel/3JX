<script>
  import * as THREE from 'three';
  import BasicOrbitScene from './BasicOrbitScene.svelte';
  import { loadTexture } from '../ThreeJsCore/Loaders';

  let tiles;

  const config = {
  };

  const createCamera = () => {
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);
    camera.position.set(0, 0, 14);
    return camera;
  }

  const loadBackground = ({ scene }) => {
    const skyMat = new THREE.MeshMatcapMaterial({ side: THREE.BackSide });
    loadTexture('./assets/textures/matcaps/matcap-rgb-01.png', t => { 
      skyMat.matcap = t; 
      skyMat.needsUpdate = true; 
    });
    scene.add(new THREE.Mesh(new THREE.SphereBufferGeometry(48, 64, 64), skyMat)); 
  }

  const renderTextureTile = (renderer, mat, t, x, y) => {
    renderer.copyTextureToTexture(new THREE.Vector2(x * 256, y * 256), t, mat.map);
    mat.needsUpdate = true;      
  }

  const createDataTexture = (width, height) => {
    const size = width * height;
    const data = new Uint8Array(4 * size);
    const dt = new THREE.DataTexture(data, width, height);

    for (let i = 0; i < size; i++) {
      const stride = i * 4;

      data[ stride ] = 255;
      data[ stride + 1 ] = 0;
      data[ stride + 2 ] = 255;
      data[ stride + 3 ] = 255;
    }

    dt.flipY = true;
    dt.minFilter = THREE.LinearFilter;
    dt.magFilter = THREE.LinearFilter;
    dt.generateMipmaps = true;
    dt.needsUpdate = true;
    return dt;
  }

  const init = ({ scene, renderer }) => {  
    loadBackground({ scene });

    const tiledTexture = createDataTexture(1024, 512);
    const mat = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: tiledTexture });
    tiles = new THREE.Mesh(new THREE.PlaneBufferGeometry(16, 8), mat);
    scene.add(tiles);

    for (let x = 0; x < 4; x++)
      for (let y = 0; y < 2; y++)
        loadTexture(`./assets/textures/tiles/0${1 + x + y * 4}.png`, t => renderTextureTile(renderer, mat, t, x, Math.abs(1-y)));
  };

  const animate = ({ clock }) => {
    const deltaTime = clock.getDelta();
    tiles.rotation.y += 0.2 * deltaTime;
  }
</script>

<BasicOrbitScene config={config} showControls={false} init={init} createCamera={createCamera} animate={animate}/>
