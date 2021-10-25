import Home from './Pages/Home.svelte';
import Contact from './Pages/Contact.svelte';
import CarOnWhite from './Scenes/CarOnWhite.svelte';
import CarWithSky from './Scenes/CarWithSky.svelte';
import Taycan from './Scenes/Taycan.svelte';
import CarWithReflectiveFloor1  from './Scenes/CarWithReflectiveFloor1.svelte';

export const DefaultPage = Home;
export const pages = [
  { path: '/', href: '/', name: 'Home', component: DefaultPage, showInMainNav: false },
  { path: '/carOnWhite', href: '/index.html?page=carOnWhite', name: 'CarOnWhite', component: CarOnWhite, showInMainNav: false, isScene: true },
  { path: '/carWithSky', href: '/index.html?page=carWithSky', name: 'CarWithSky', component: CarWithSky, showInMainNav: false, isScene: true },
  { path: '/taycan', href: '/index.html?page=taycan', name: 'Taycan', component: Taycan, showInMainNav: false, isScene: true },
  { path: '/carWithReflectiveFloor1', href: '/index.html?page=carWithReflectiveFloor1', name: 'CarWithReflectiveFloor1', component: CarWithReflectiveFloor1, showInMainNav: false, isScene: true },
  { path: '/contact', href: '/index.html?page=contact', name: 'Contact', component: Contact, showInMainNav: false },
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