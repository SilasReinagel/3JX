<script>
	import { DefaultPage, pages } from './static-content.js';

  const page = '/' + (new URLSearchParams(window.location.search).get('page') || '');
  const matchingRoutes = pages.filter(r => r.path.toLocaleLowerCase() === (page).toLocaleLowerCase());
	const component = matchingRoutes.length == 0 ? DefaultPage : matchingRoutes[0].component;
</script>

<main>
	<svelte:component this={component}/>
</main>

<style>
main {
	width: 100%;
}
</style>  
 