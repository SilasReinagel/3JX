import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

export const loadFbx = (path, onLoaded) => 
  new FBXLoader().load(
    path,
    (object) => { onLoaded(object); },
    (xhr) => { console.log((xhr.loaded / xhr.total) * 100 + '% loaded') },
    (error) => { console.log(error) }
  );

export const loadTexture = (path, onLoaded) => 
  new THREE.TextureLoader().load(
    path,
    (texture) => onLoaded(texture),
    undefined,
    (error) => { console.log(error) }
  );
