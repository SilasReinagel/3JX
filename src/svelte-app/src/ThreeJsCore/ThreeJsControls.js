import { OrbitControls } from 'three-stdlib';

export const createOrbitControls = (camera, renderer) => new OrbitControls(camera, renderer.domElement);