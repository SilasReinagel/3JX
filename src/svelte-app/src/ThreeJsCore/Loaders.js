import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

export const loadFbx = (path, onLoaded) => {
  new FBXLoader().load(path,
    (object) => { onLoaded(object); },
    (xhr) => { console.log((xhr.loaded / xhr.total) * 100 + '% loaded') },
    (error) => { console.log(error) }
  );
}