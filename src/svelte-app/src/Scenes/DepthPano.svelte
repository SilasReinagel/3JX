<script>
  import * as THREE from 'three';
  import * as dat from 'dat.gui';
  import BasicOrbitScene from './BasicOrbitScene.svelte';

  let camera, clock, sphere;

  const config = {
    displacementScale: -4.0,
    wireframe: false
  };

  const guiChanged = () => {
    sphere.material.displacementScale = config.displacementScale;
    sphere.material.wireframe = config.wireframe;
    sphere.material.needsUpdated = true;
  }

  const initGui = ({ renderer }) => {
    const gui = new dat.GUI();
    gui.add(config, 'displacementScale', -10.0, 10.0, 0.1 ).onChange(guiChanged);
    gui.add(config, 'wireframe').onChange(guiChanged);
    gui.closed = true;
    return gui;
  }

  const animate = () => {
    if (!clock || !sphere) return;

    const time = clock.getElapsedTime();

    sphere.rotation.y += 0.001;
    sphere.position.x = Math.sin( time ) * 0.2;
    sphere.position.z = Math.cos( time ) * 0.2;
  };

  const createCamera = () => {
		camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 2000 );
    return camera;
  }

  const init = ({ scene, renderer }) => {    
    renderer.xr.enabled = true;
    renderer.xr.setReferenceSpaceType('local'); 

		clock = new THREE.Clock();

		scene.background = new THREE.Color( 0x101010 );

		const light = new THREE.AmbientLight( 0xffffff, 1 );
		scene.add( light );

		scene.add( camera );

		// Create the panoramic sphere geometery
		const panoSphereGeo = new THREE.SphereGeometry( 6, 256, 256 );

		// Create the panoramic sphere material
		const panoSphereMat = new THREE.MeshStandardMaterial( {
			side: THREE.BackSide,
      wireframe: config.wireframe,
			displacementScale: config.displacementScale
		} );

		// Create the panoramic sphere mesh
		sphere = new THREE.Mesh( panoSphereGeo, panoSphereMat );

		// Load and assign the texture and depth map
		const manager = new THREE.LoadingManager();
		const loader = new THREE.TextureLoader( manager );

		loader.load( './assets/textures/pano/kandao3.jpg', function ( texture ) {
			texture.minFilter = THREE.NearestFilter;
			texture.generateMipmaps = false;
			sphere.material.map = texture;
		} );

		loader.load( './assets/textures/pano/kandao3_depthmap.jpg', function ( depth ) {
			depth.minFilter = THREE.NearestFilter;
			depth.generateMipmaps = false;
			sphere.material.displacementMap = depth;
		} );

    // On load complete add the panoramic sphere to the scene
    manager.onLoad = function () {
      scene.add( sphere );
    };
  };
</script>

<BasicOrbitScene config={config} createGui={initGui} init={init} createCamera={createCamera} animate={animate} createControls={() => undefined}/>
