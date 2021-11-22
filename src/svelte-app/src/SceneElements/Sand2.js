import * as THREE from 'three';
import { loadTextures } from '../ThreeJsCore/Loaders';

export const addToScene = (scene) =>
  loadTextures([
    './assets/textures/sand_stylized_02/base_color.png', 
    './assets/textures/sand_stylized_02/roughness_map.png', 
    './assets/textures/sand_stylized_02/normal_map.png',
    './assets/textures/sand_stylized_02/height.png'
  ], textures => {

    const repeatX = 192 / 32;
    textures.forEach(t => {
      t.wrapS = THREE.RepeatWrapping;
      t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(repeatX, repeatX);
      t.encoding = THREE.sRGBEncoding;
      t.offset.set(0, 0);
    });

    const geo = new THREE.PlaneGeometry(192, 192, 192 * 4, 192 * 4);
    const mat = new THREE.MeshStandardMaterial({
      map: textures[0],
      roughnessMap: textures[1],
      normalMap: textures[2],
      displacementMap: textures[3],
      displacementScale: 0.2,
      roughness: 0.9
    });
    const obj = new THREE.Mesh(geo, mat);
    obj.receiveShadow = true;
    obj.rotateX(-Math.PI / 2);
    obj.position.set(16, 0, 16);
    scene.add(obj);
  });

export default addToScene;