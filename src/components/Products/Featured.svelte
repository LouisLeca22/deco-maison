<script>
    import Product from "./Product.svelte";
    import Spinner from "../Spinner.svelte"
    import products, {featuredStore} from "../../stores/defaultProducts";
    export let title = "";
    // $: featured = $products.filter(item => item.featured === true)

  </script>
  
  {#if $featuredStore.length === 0}
    <Spinner />
    {:else}
 
  <section class="section">
    <h2 class="section-title">{title}</h2>
    <div class="products-center">
      {#each $featuredStore as product (product.id)}
        <Product {product}  />
        {:else}
        <Spinner />
      {/each}
    </div>
  </section>
  {/if}