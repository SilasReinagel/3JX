import Home from './Pages/Home.svelte';
import Contact from './Pages/Contact.svelte';
import CarOnWhite from './Scenes/CarOnWhite.svelte';
import CarWithSky from './Scenes/CarWithSky.svelte';
import Taycan from './Scenes/Taycan.svelte';
import CarWithReflectiveFloor1  from './Scenes/CarWithReflectiveFloor1.svelte';
import EnvReflectiveObject from './Scenes/EnvReflectiveObject.svelte';
import BasicReflector from './Scenes/FloorMirror.svelte';
import SciFiCity from './Scenes/SciFiCity.svelte';
import FloorWithLightmap from './Scenes/FloorWithLightmap.svelte';
import ProceduralSky from './Scenes/ProceduralSky.svelte';
import Ocean from './Scenes/Ocean.svelte';
import DesertSunShadows from './Scenes/DesertSunShadows.svelte';
import Terrain from './Scenes/Terrain.svelte';
import RoomWithAmbientOcculsion from './Scenes/RoomWithAmbientOcculsion.svelte';
import DepthPano from './Scenes/DepthPano.svelte';

export const DefaultPage = Home;

const makeScene = (pageName, component) => ({ path: `/${pageName}`, name: pageName, href:`/index.html?page=${pageName}`, component, showInMainNav: false, isScene: true });
export const pages = [
  { path: '/', href: '/', name: 'Home', component: DefaultPage, showInMainNav: false },
  { path: '/contact', href: '/index.html?page=contact', name: 'Contact', component: Contact, showInMainNav: false },
  { path: '/carOnWhite', href: '/index.html?page=carOnWhite', name: 'CarOnWhite', component: CarOnWhite, showInMainNav: false, isScene: true },
  { path: '/carWithSky', href: '/index.html?page=carWithSky', name: 'CarWithSky', component: CarWithSky, showInMainNav: false, isScene: true },
  { path: '/taycan', href: '/index.html?page=taycan', name: 'Taycan', component: Taycan, showInMainNav: false, isScene: true },
  { path: '/carWithReflectiveFloor1', href: '/index.html?page=carWithReflectiveFloor1', name: 'CarWithReflectiveFloor1', component: CarWithReflectiveFloor1, showInMainNav: false, isScene: true },
  // { path: '/EnvReflectiveObject', href: '/index.html?page=envReflectiveObject', name: 'EnvReflectiveObject', component: EnvReflectiveObject, showInMainNav: false, isScene: true },
  makeScene('reflector', BasicReflector),
  makeScene('futureCity', SciFiCity),
  //makeScene('floorWithLightMap', FloorWithLightmap),
  makeScene('proceduralSky', ProceduralSky),
  makeScene('ocean', Ocean),
  makeScene('desertSunShadows', DesertSunShadows),
  //makeScene('terrain', Terrain),
  //makeScene('roomWithAmbientOcclusion', RoomWithAmbientOcculsion),
  makeScene('depthPano', DepthPano),
]

const address = (line1, city, state, zip5, mapLink) => ({ line1, city, state, zip5, mapLink, toString: () => `${line1}, ${city}, ${state}, ${zip5}`});
export const site = ({
    name: 'Three JS Examples Gallery',
    owner: 'Silas Reinagel',
    slogan: 'Interesting visuals exploration!',
    email: 'silas.reinagel@gmail.com',
    logo: './images/logo.png',
    logoMobile: './images/logo.png',
    address: address("123 Main Street", "City", "ST", "12345", ""),
    contactPrompt: 'Send us a message',
    social: {
        // steam: '',
        // twitter: '',
        // itchio: '',
        // reddit: ''
    }
  });

export default site;