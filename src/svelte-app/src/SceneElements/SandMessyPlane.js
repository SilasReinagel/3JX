import * as THREE from 'three';
import { loadTextures } from '../ThreeJsCore/Loaders';

export const addToScene = (scene) =>
  loadTextures([
    './assets/textures/sand_messy/base_color.png', 
    './assets/textures/sand_messy/roughness_map.png', 
    './assets/textures/sand_messy/normal_map.png'
  ], textures => {

    const repeatX = 192 / 4;
    textures.forEach(t => {
      t.wrapS = THREE.RepeatWrapping;
      t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(repeatX, repeatX);
      t.encoding = THREE.sRGBEncoding;
      t.offset.set(0, 0);
    });

    const geo = new THREE.PlaneGeometry(192, 192);
    const mat = new THREE.MeshStandardMaterial({
      map: textures[0],
      roughnessMap: textures[1],
      normalMap: textures[2]
    })
    const obj = new THREE.Mesh(geo, mat);
    obj.rotateX(-Math.PI / 2);
    scene.add(obj);
  });

export default addToScene;