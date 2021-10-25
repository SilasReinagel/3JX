<script>
  import LoadingSpinner from './DefaultLoadingSpinner.svelte';
</script>

<div class='loader'>
  <div class='white-bg' />
  <LoadingSpinner/>
  <div class='loading-text'><h1>... Loading ...</h1></div>
</div>

<style>
  .white-bg {
    position: absolute;
    
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-color: #fff;
  }

  .loading-text {
    text-align: center;
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #000;
  }

  h1 {
    font-family: 'Body';
    text-transform: uppercase;
  }
</style>
