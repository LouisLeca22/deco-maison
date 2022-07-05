<script>
  import Product from "./Product.svelte";
  import Spinner from "../Spinner.svelte"
  // import {onMount, onDestroy} from "svelte"
  import products from "../../stores/defaultProducts";
  // let localProducts = []
  // let unsubscribe;
  // onMount(() => {
  //     unsubscribe = products.subscribe(value => {
  //         console.log(value)
  //         localProducts = value
  //     })
  // })
  //  onDestroy(() => {
  //     unsubscribe()
  //  })
  export let title = "";
</script>

<section class="section">
  <h2 class="section-title">{title}</h2>
  <div class="products-center">
    {#each $products as product (product.id)}
      <Product {product}  />
      {:else}
      <Spinner />
    {/each}
  </div>
</section>
