<script>
  import * as THREE from 'three';
  import BasicOrbitScene from './BasicOrbitScene.svelte';
  import { loadTexture } from '../ThreeJsCore/Loaders';

  let tiles;
  let tileMat;
  let tex;
  let tileIndex = 0;
  let remainingUntilNextImage = 0;
  let cacheBreaker = 0;
  let initialNumTileLoaded = 0;
  
  const config = {
    timeBetweenImages: 2.5,
    tilesWide: 4,
    tilesHigh: 2,
  };

  const getNextImageUrl = () => `https://picsum.photos/256?cache=${cacheBreaker++}`; 

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

  const renderTextureTileByIndex = (renderer, mat, t, index) => {
    const x = index % config.tilesWide;
    const y = Math.abs(1 - Math.floor(index / config.tilesWide));
    renderTextureTile(renderer, mat, t, x, y);
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
    tex = tiledTexture;
    tileMat = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: tiledTexture });
    tiles = new THREE.Mesh(new THREE.PlaneBufferGeometry(16, 8), tileMat);
    scene.add(tiles);
    remainingUntilNextImage = config.timeBetweenImages;

    const numTiles = config.tilesWide * config.tilesHigh;
    for (let i = 0; i < numTiles; i++)
      loadTexture(getNextImageUrl(), t => { 
        renderTextureTileByIndex(renderer, tileMat, t, i);
        initialNumTileLoaded++;
      });
  };

  const animate = ({ clock, renderer }) => {
    const deltaTime = clock.getDelta();
    tiles.rotation.y += 0.2 * deltaTime;

    if (initialNumTileLoaded < (config.tilesWide * config.tilesHigh))
      return;

    remainingUntilNextImage -= deltaTime;
    if (remainingUntilNextImage <= 0) {
      loadTexture(getNextImageUrl(), t => renderTextureTileByIndex(renderer, tileMat, t, tileIndex));
      remainingUntilNextImage = config.timeBetweenImages;
      tileIndex += 1;
      tileIndex = tileIndex % (config.tilesWide * config.tilesHigh);
    }
  }
</script>

<BasicOrbitScene config={config} showControls={false} init={init} createCamera={createCamera} animate={animate}/>
