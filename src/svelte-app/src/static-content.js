import Home from './Pages/Home.svelte';
import Contact from './Pages/Contact.svelte';
import CarOnWhite from './Scenes/CarOnWhite.svelte';
import CarWithSky from './Scenes/CarWithSky.svelte';

const DefaultPage = Home;
export const pages = [
  { path: '/', href: '/', name: 'Home', component: DefaultPage, showInMainNav: true },
  { path: '/carOnWhite', href: '/index.html?page=carOnWhite', name: 'CarOnWhite', component: CarOnWhite, showInMainNav: true, isScene: true },
  { path: '/carWithSky', href: '/index.html?page=carWithSky', name: 'CarWithSky', component: CarWithSky, showInMainNav: true, isScene: true },
  { path: '/contact', href: '/index.html?page=contact', name: 'Contact', component: Contact, showInMainNav: false },
]

const address = (line1, city, state, zip5, mapLink) => ({ line1, city, state, zip5, mapLink, toString: () => `${line1}, ${city}, ${state}, ${zip5}`});
export const site = ({
    name: 'Three JS Gallery',
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