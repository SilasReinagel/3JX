import * as THREE from 'three';
import { loadTextures } from '../ThreeJsCore/Loaders';

export const addToScene = (scene) =>
  loadTextures([
    './assets/textures/concrete-02/base_color.jpg', 
    './assets/textures/concrete-02/roughness_map.jpg', 
    './assets/textures/concrete-02/normal_map.jpg'
  ], textures => {

    const repeatX = 192 / 4;
    textures.forEach(t => {
      t.wrapS = THREE.RepeatWrapping;
      t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(repeatX, repeatX * 2);
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