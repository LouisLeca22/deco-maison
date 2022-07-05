<script>
    export let id;
    import globalStore from "../stores/globalStore"
    import products from "../stores/defaultProducts"
    import Spinner from "../components/Spinner.svelte"
    import {link} from "svelte-routing"
    import {addToCart} from "../stores/cart"
    $: product = $products.find(item => item.id === parseInt(id))
</script>

<svelte:head>
    <title>{!product ? "Produit" : product.title}</title>
</svelte:head>
{#if !product}
    <Spinner />
    {:else}
    <section class="single-product">
        <a href="/products" use:link  class="btn btn-primary">Back to product</a>
        <div class="single-product-container">
            <article class="single-product-image">
                <img src={product.image} alt={product.title}>
            </article>
            <article>
                <h1>{product.title}</h1>
                <h2>{product.price}€</h2>
                <p>{product.description}</p>
                <button on:click={() => {
                    addToCart(product)
                    globalStore.toggleItem("cart",true)
                }} class="btn btn-primary btn-block">
                    Ajouter au panier
                </button>
            </article>
        </div>
    </section>
{/if}
