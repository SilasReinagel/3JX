<script>
  export let company;

  import TwoColumnLayout from '../Elements/TwoColumnLayout.svelte';
  import StandardPageLayout from '../Elements/StandardPageLayout.svelte';
</script>

<StandardPageLayout title="Contact Us" headerImg="/images/cafe-01.jpg" headerImgAlt="Cafe">
  <TwoColumnLayout>
    <form class="email-form" name="contact" form-name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" slot='first'>
      <h2>Contact Us</h2>
      <hr/>
      <div hidden aria-hidden="true">
        <label>
          Don’t fill this out if you're human:
          <input name="bot-field" />
        </label>
      </div>
      <input type="hidden" name="form-name" value="contact" />
      <input type="text" name="name" placeholder="Your Name"/>
      <input type="email" name="email" placeholder="Your Email"/>
      <textarea name="message" placeholder="Your Message"/>
      <button type="submit">Send</button>
    </form>
  </TwoColumnLayout>
</StandardPageLayout>

<style>
  h2, h3 {
    color: var(--alternate-color);
  }

  p {
    color: var(--alternate-color-light);
    font-size: 1.1em;
    line-height: 1.2em;
  }

  .email-form {
    display: flex;
    flex-direction: column;
  }

  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .address {
    margin-right: 4em;
    margin-bottom: 2em;
  }

  hr {
    vertical-align: middle;
    border-bottom: 2px solid #c7a17a;
    margin: 0 0 1.5em 0;
    width: 120px;
  }

  input {
    padding: 1em;
    margin: 1em 0;
  }

  ::placeholder {
    color: var(--secondary-color);
    opacity: 1;
  }

  button {
    padding: 1em;
    margin: 1em 25%;
    font-size: 1.2em;
    width: 50%;
  }

  textarea {
    padding: 1em;
    margin: 1em 0;
    min-height: 12em;
  }
</style>
