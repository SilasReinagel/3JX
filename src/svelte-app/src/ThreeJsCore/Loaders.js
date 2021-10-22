import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

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

export const loadTexture = (path, onLoaded) => 
  new THREE.TextureLoader().load(
    path,
    (texture) => onLoaded(texture),
    undefined,
    (error) => { logError(error) }
  );

export const loadTextureAsync = (path) => new THREE.TextureLoader().loadAsync(path);

export const loadHdr = (path, onLoaded) => 
  new RGBELoader().load(
    path,
    (texture) => onLoaded(texture),
    undefined,
    (error) => { logError(error) }
  );
