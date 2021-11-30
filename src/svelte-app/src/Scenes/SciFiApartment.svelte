<script>
  import * as THREE from 'three';
  import * as dat from 'dat.gui';
  import BasicOrbitScene from './BasicOrbitScene.svelte';
  import { loadGltf } from '../ThreeJsCore/Loaders';

  const config = {
  };

  const guiChanged = () => {
  }

  const initGui = ({ renderer }) => {
    const gui = new dat.GUI({ closeOnTop: true, closed: true });

    return gui;
  }

  const init = ({ scene, renderer }) => {    
    scene.add(new THREE.AmbientLight(0xffffff, 1));

    loadGltf('./assets/models/ExportRoom1.glb', gltf => {
      console.log({ gltf });

      const apartment = gltf.scene;
      apartment.rotation.set(0, -Math.PI / 2, 0);
      apartment.position.set(-3, -1, -3);
      scene.add(apartment);
    });
  };
</script>

<BasicOrbitScene config={config} createGui={initGui} init={init} />
