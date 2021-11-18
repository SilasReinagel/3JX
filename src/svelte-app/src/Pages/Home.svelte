<script>
  import Container from '../Elements/Container.svelte';
  import PageLayout from '../Layout/PageLayout.svelte';
  import { pages } from '../static-content';

  const reversedPages = pages.reverse();
</script>

<PageLayout>
  <Container>
    <section>
      <div class="layout center-vh">
        {#each reversedPages.filter(x => x.isScene) as page}
          <a href={page.href}>
            <!-- <h1>{page.name}</h1> -->
            <div class="img-box">
              <img src="./assets/preview/{page.name}.jpg" alt="{page.name} Preview Image"/>
            </div>
          </a>            
        {/each}
      </div>
    </section>
  </Container>
</PageLayout>

<style>
  section {
    padding: 1em;
  }

  .layout {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  a {
    margin: 6px;
  }

  .img-box {
    width: 480px;
    max-width: 92vw;
    height: 360px;
    overflow: hidden;
  }

  h1 {
    margin-left: auto;
    margin-right: auto;
  }
</style>