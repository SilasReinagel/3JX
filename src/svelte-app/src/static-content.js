import Home from './Pages/Home.svelte';
import Contact from './Pages/Contact.svelte';
import Scene from './Pages/ThreeScene.svelte';

const DefaultPage = Scene;
export const pages = [
  { path: '/', href: '/', name: 'Home', component: Scene, showInMainNav: true },
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