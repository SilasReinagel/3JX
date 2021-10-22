<script>  
  import company, { pages } from '../static-content.js';
</script>

<header>
  <a href="." class="logo">
    <div class="logo-img">
      <img src={company.logo} alt="Logo"/>
    </div>
  </a>
</header>

<style>
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    height: 82px;
    padding: 0 16px;
  }

  .logo {
    display: flex;
    flex-direction: row;
    max-height: 92px;
  }

  .logo-img {
    width: 48px;
  }
</style>
