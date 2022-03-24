<script>
import * as THREE from 'three';
import BasicOrbitScene from './BasicOrbitScene.svelte';
import Grass from '../SceneElements/Grass'
  import { loadTexture } from '../ThreeJsCore/Loaders';

let grass;

const config = {
};

const init = ({ scene, renderer }) => {    
  scene.add(new THREE.AmbientLight(0xffffff, 1));
  grass = new Grass(64, 100000);
  scene.add(grass);

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

const createCamera = () => {
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
  camera.position.set(-7, 4, 7)
  camera.lookAt(0, 0, 0)
  return camera;
}

const animate = ({ clock }) => {
  const time = clock.getElapsedTime();
  grass.update(time);
}

</script>

<BasicOrbitScene config={config} showControls={false} init={init} createCamera={createCamera} animate={animate}/>
