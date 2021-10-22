<script>
  import Container from '../Elements/Container.svelte';
  import PageLayout from '../Layout/PageLayout.svelte';
  import { pages } from '../static-content';

</script>

<PageLayout>
  <Container>
    <section>
      <div class="column">
        {#each pages.filter(x => x.isScene) as page}
          <a href={page.href}>{page.name}</a>
        {/each}
      </div>
    </section>
  </Container>
</PageLayout>

<style>
  section {
    padding: 1em;
  }

  .column {
    display: flex;
    flex-direction: column;
  }

  a {
    margin: 6px;
  }
</style>