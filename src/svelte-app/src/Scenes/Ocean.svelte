<script>
  import * as THREE from 'three';
  import * as dat from 'dat.gui';
  import BasicOrbitScene from './BasicOrbitScene.svelte';
  import { Water } from 'three/examples/jsm/objects/Water';
	import { Sky } from 'three/examples/jsm/objects/Sky';

	let water, sun;
  let orbitTarget = new THREE.Vector3(0, 6, 0);

  const config = {
  };

  const guiChanged = () => {
  }

  const initGui = ({ renderer }) => {
    const gui = new dat.GUI({ closeOnTop: true, closed: true });
    return gui;
  }

  const createCamera = () => {
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 6000);
    camera.position.set(3,8,3);
    return camera;
  }

  const init = ({ scene, renderer }) => {  
    sun = new THREE.Vector3();

    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);

    water = new Water(
      waterGeometry,
      {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load( 'assets/textures/waternormals.jpg', function ( texture ) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        }),
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 3.7,
        fog: scene.fog !== undefined
      }
    );

    water.rotation.x = - Math.PI / 2;

    // Skybox
    const sky = new Sky();
    sky.scale.setScalar(10000);
    scene.add(sky);

    const skyUniforms = sky.material.uniforms;

    skyUniforms[ 'turbidity' ].value = 10;
    skyUniforms[ 'rayleigh' ].value = 2;
    skyUniforms[ 'mieCoefficient' ].value = 0.005;
    skyUniforms[ 'mieDirectionalG' ].value = 0.8;

    const parameters = {
      elevation: 2,
      azimuth: -150
    };

    const pmremGenerator = new THREE.PMREMGenerator( renderer );

    function updateSun() {
      const phi = THREE.MathUtils.degToRad( 90 - parameters.elevation );
      const theta = THREE.MathUtils.degToRad( parameters.azimuth );

      sun.setFromSphericalCoords( 1, phi, theta );

      sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
      water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();

      scene.environment = pmremGenerator.fromScene(sky).texture;
    }

    updateSun();

    scene.add( water );
    scene.add(new THREE.AmbientLight(0xffffff, 1));

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    const color = 0xFFFFFF;  // white
    const near = 20;
    const far = 9000;
    scene.fog = new THREE.Fog(color, near, far);
  };

  const animate = () => {
    water.material.uniforms[ 'time' ].value += 0.36 / 60.0;
  }
</script>

<BasicOrbitScene config={config} createGui={initGui} init={init} animate={animate} 
  orbitTarget={orbitTarget} createCamera={createCamera}/>
