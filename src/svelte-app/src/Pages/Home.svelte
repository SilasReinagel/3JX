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
        {#each reversedPages.filter(x => x.isScene) as page, i}
          <a id={i.toString()} href={page.href}>
            <div class="img-box">
              <img src="./assets/preview/{page.name}.jpg" alt="{page.name} Preview Image"/>
              <div class="top">
                <div class="linear-grad">
                  <h1 class="page-title">{page.title ? page.title : page.name}</h1>
                </div>
              </div>
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
    position: relative;
    width: 480px;
    max-width: 92vw;
    height: 360px;
    overflow: hidden;
  }

  .page-title {
    color: white;
    text-align: center;
    margin: auto;
  }

  .top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    transition-duration: 0.25s;
    background-color: rgba(0, 0, 0, 0);
    opacity: 1;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .top:hover {
    opacity: 0;
  }

  .linear-grad {
    position: relative;
    top: calc(70% - 32px);
    width: 100%;
    height: 64px;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.05) 100%);
    display: flex;
    justify-content: center;
    align-content: center;
  }
</style>