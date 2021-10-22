import Home from './Pages/Home.svelte';
import Contact from './Pages/Contact.svelte';
import CarOnWhite from './Scenes/CarOnWhite.svelte';
import CarWithSky from './Scenes/CarWithSky.svelte';

const DefaultPage = CarWithSky;
export const pages = [
  { path: '/', href: '/', name: 'Home', component: DefaultPage, showInMainNav: true },
  { path: '/carOnWhite', href: '/index.html?page=carOnWhite', name: 'Scene', component: CarOnWhite, showInMainNav: true },
  { path: '/carWithSky', href: '/index.html?page=carWithSky', name: 'Scene', component: CarWithSky, showInMainNav: true },
  { path: '/contact', href: '/index.html?page=contact', name: 'Contact', component: Contact, showInMainNav: true },
]

const address = (line1, city, state, zip5, mapLink) => ({ line1, city, state, zip5, mapLink, toString: () => `${line1}, ${city}, ${state}, ${zip5}`});
const site = ({
    name: 'Site Name',
    owner: 'Site Owner',
    slogan: 'We are great at business!',
    email: 'aaa@abc.com',
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