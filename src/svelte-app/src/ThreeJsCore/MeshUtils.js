import * as THREE from 'three';

export const setMaterialDoubleSidedRecursive = (o) => {
  if (o.material)
    o.material.side = THREE.DoubleSide;
  o.children.forEach(c => setMaterialDoubleSidedRecursive(c));
  return o;
}
