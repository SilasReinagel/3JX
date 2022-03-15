import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { GLTFLoader, DRACOLoader } from 'three-stdlib';

const debugLoggingEnabled = false;
const logInfo = (msg) => {
  if (debugLoggingEnabled)
    console.log(msg);
}

const logError = (msg) => {
  console.error(msg);
}

export const loadFbx = (path, onLoaded) => 
  new FBXLoader().load(
    path,
    (object) => { onLoaded(object); },
    (xhr) => { logInfo((xhr.loaded / xhr.total) * 100 + '% loaded') },
    (error) => { logError(error) }
  );

export const loadObj = (path, onLoaded) => 
  new OBJLoader().load(
    path,
    (object) => { onLoaded(object); },
    (xhr) => { logInfo((xhr.loaded / xhr.total) * 100 + '% loaded') },
    (error) => { logError(error) }
  );

export const loadTexture = (path, onLoaded) => 
  new THREE.TextureLoader().load(
    path,
    (texture) => onLoaded(texture),
    undefined,
    (error) => { logError(error) }
  );

export const loadTextures = (paths, onLoaded) => {
  let textures;
  const getTextures = () => new Promise((resolve, reject)=>{
    const manager = new THREE.LoadingManager(()=>resolve(paths));
    const loader = new THREE.TextureLoader(manager);
    textures = paths.map(filename => loader.load(filename));
    return textures;
  });
  
  getTextures()
    .then(r => onLoaded(textures));  
}

export const loadTextureAsync = (path) => new THREE.TextureLoader().loadAsync(path);

export const loadHdr = (path, onLoaded) => 
  new RGBELoader().load(
    path,
    (texture) => onLoaded(texture),
    undefined,
    (error) => { logError(error) }
  );

export const loadGltf = (path, onLoaded) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/three/examples/js/libs/draco/');
  loader.setDRACOLoader(dracoLoader);
  loader.load(path, onLoaded);
}
