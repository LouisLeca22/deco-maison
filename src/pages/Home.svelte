
<script>
    import Hero from "../components/Hero.svelte"
    import {link} from "svelte-routing"
    import Featured from "../components/Products/Featured.svelte"
</script>

<svelte:head>
    <title>Accueil</title>
</svelte:head>

  <Hero>
    <a href="/products" class="btn btn-primary btn-hero" use:link>Voir le catalogue</a>
  </Hero>
  <Featured title="Les nouveautés"/>