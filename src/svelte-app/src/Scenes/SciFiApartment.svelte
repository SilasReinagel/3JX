<script>
  import * as THREE from 'three';
  import * as dat from 'dat.gui';
  import BasicOrbitScene from './BasicOrbitScene.svelte';
  import { loadGltf } from '../ThreeJsCore/Loaders';
  import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
	import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
	import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass.js';
  import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
  import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
	import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

  let composer, renderPass, saoPass, bloomPass;

  const config = {
    exposure: 1,
    bloomStrength: 1.5,
    bloomThreshold: 0.7,
    bloomRadius: 0.62
  };

  const guiChanged = () => {
  }

  const initGui = ({ renderer, saoPass }) => {
    const gui = new dat.GUI();
    gui.add(saoPass.params, 'output', {
					'Beauty': SAOPass.OUTPUT.Beauty,
					'Beauty+SAO': SAOPass.OUTPUT.Default,
					'SAO': SAOPass.OUTPUT.SAO,
					'Depth': SAOPass.OUTPUT.Depth,
					'Normal': SAOPass.OUTPUT.Normal
				} ).onChange( function ( value ) {
      saoPass.params.output = parseInt( value );
    } );
    gui.add( saoPass.params, 'saoBias', - 1, 1 );
    gui.add( saoPass.params, 'saoIntensity', 0, 1 );
    gui.add( saoPass.params, 'saoScale', 0, 10 );
    gui.add( saoPass.params, 'saoKernelRadius', 1, 100 );
    gui.add( saoPass.params, 'saoMinResolution', 0, 1 );
    gui.add( saoPass.params, 'saoBlur' );
    gui.add( saoPass.params, 'saoBlurRadius', 0, 200 );
    gui.add( saoPass.params, 'saoBlurStdDev', 0.5, 150 );
    gui.add( saoPass.params, 'saoBlurDepthCutoff', 0.0, 0.1 );

    gui.add( config, 'bloomThreshold', 0.0, 1.0 ).onChange( function ( value ) {
      bloomPass.threshold = Number( value );
    } );

    gui.add( config, 'bloomStrength', 0.0, 3.0 ).onChange( function ( value ) {
      bloomPass.strength = Number( value );
    } );

    gui.add( config, 'bloomRadius', 0.0, 1.0 ).step( 0.01 ).onChange( function ( value ) {
      bloomPass.radius = Number( value );
    } );
    gui.close();
    return gui;
  }

  const getRenderer = () => composer;

  const init = ({ scene, renderer, camera }) => {    
    composer = new EffectComposer(renderer);
    renderPass = new RenderPass( scene, camera );
    composer.addPass( renderPass );
    saoPass = new SAOPass( scene, camera, false, true );
    saoPass.params.saoIntensity = 0.01;
    saoPass.params.saoKernelRadius = 50;
    saoPass.params.saoBlurRadius = 16;

    composer.addPass( saoPass );

    bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
    bloomPass.threshold = config.bloomThreshold;
    bloomPass.strength = config.bloomStrength;
    bloomPass.radius = config.bloomRadius;
    composer.addPass(bloomPass);

    const fxaaPass = new ShaderPass(FXAAShader);
    const pixelRatio = renderer.getPixelRatio();

    fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( window.innerWidth * pixelRatio );
    fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( window.innerHeight * pixelRatio );

    composer.addPass(fxaaPass);

    scene.add(new THREE.AmbientLight(0xffffff, 0.2));

    loadGltf('./assets/models/ExportRoom1.glb', gltf => {
      const apartment = gltf.scene;
      apartment.rotation.set(0, -Math.PI / 2, 0);
      apartment.position.set(-2.4, -1.6, -3);
      apartment.traverse(o => {
        console.log({ name: o.name, o });
        if (o.name.startsWith('Fluor') && o.name.endsWith('_2')) {
          o.add(new THREE.PointLight(0xffffff, 0.5, 10));
        }
      });

      scene.add(apartment);
    });

    return ({ saoPass });
  };
</script>

<BasicOrbitScene config={config} createGui={initGui} init={init} createRenderer={getRenderer}/>
