<script>
	import DefaultLayout from './Layout/DefaultLayout.svelte';
	import { pages } from './static-content.js';

  const page = '/' + (new URLSearchParams(window.location.search).get('page') || '');
  const matchingRoutes = pages.filter(r => r.path.toLocaleLowerCase() === (page).toLocaleLowerCase());
	const component = matchingRoutes[0].component;
	const pageName = matchingRoutes[0].name;
</script>

<main>
	<svelte:component this={component}/>
</main>

<style>
main {
	width: 100%;
}
</style>  
 