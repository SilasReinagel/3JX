<script>
  import * as THREE from 'three';
  import * as dat from 'dat.gui';
  import BasicOrbitScene from './BasicOrbitScene.svelte';

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
  };
</script>

<BasicOrbitScene config={config} createGui={initGui} init={init} />
