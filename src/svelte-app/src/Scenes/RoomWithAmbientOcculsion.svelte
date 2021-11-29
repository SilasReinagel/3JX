<script>
  import * as THREE from 'three';
  import * as dat from 'dat.gui';
  import BasicOrbitScene from './BasicOrbitScene.svelte';
  import { loadFbx, loadTexture } from '../ThreeJsCore/Loaders';

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

    const modelPath = './assets/models/sci-interior/Models/';

    loadFbx(modelPath + 'Barrel.fbx', m => {
      m.children[0].material = new THREE.MeshPhongMaterial();
      scene.add(m);
    });

    loadFbx(modelPath + 'Floor-2.fbx', m => {
      const floor = new THREE.Group();
      m.position.set(-6, 0, -4);
      for (let i = 0; i < 5; i++) {
        spawnTiled({ 
          group: floor, 
          mesh: m, 
          num: 5, 
          setNext: (element, i) => element.position.x += 2
        });
        m.position.z += 2;
      }
      scene.add(floor);
    });

    loadFbx(modelPath + 'Wall-5.fbx', m => {
      const w1 = new THREE.Group();
      m.position.set(-6, 0, 0);
      for (let i = 0; i < 2; i++) {
        spawnTiled({ group: w1, mesh: m, num: 5, 
          setNext: (element, i) => { 
            element.rotation.y += Math.PI % (Math.PI * 2);
            element.position.x += 2;
            element.position.z = m.position.z + (i % 2 == 0 ? 0.11 : -0.11);
          }
        });
        m.position.y += 2;
      }

      const w2 = w1.clone();
      const w3 = w1.clone();
      const w4 = w1.clone();

      w1.position.z += -5;
      scene.add(w1);

      w2.rotation.y += Math.PI / 2;
      w2.position.x += -5;
      scene.add(w2);

      w3.position.z += 5;
      scene.add(w3);

      w4.rotation.y += Math.PI / 2;
      w4.position.x += 5;
      scene.add(w4);
    });
  };

  const spawnTiled = ({ group, mesh, num, setNext }) => {
    let x = mesh.clone();
    for (let i = 0; i < num; i++) {
      x = x.clone();
      setNext(x, i);
      group.add(x);
    }
  };
</script>

<BasicOrbitScene config={config} createGui={initGui} init={init} />
