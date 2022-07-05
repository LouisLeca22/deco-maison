<script>
    import globalStore from "../../stores/globalStore"
    import {fly, fade, blur} from "svelte/transition"
    import {link} from "svelte-routing"
    import ItemsList from "./ItemsList.svelte"
    import user from "../../stores/user"
</script>

<div class="cart-overlay" transition:blur>
    <div class="cart-container" transition:fly={{x: 100}}>
        <div class="cart" transition:fade={{delay: 400}}>
            <div class="cart-header">
                <button class="btn-close" on:click={() => {
                    globalStore.toggleItem("cart", false)
                }}>
                    <i class="fas fa-window-close"></i>
                </button>
                <h2 class="cart-title">Votre panier</h2>
                <span></span>
            </div>
            <ItemsList />
             <div class="cart-footer">
                {#if $user.jwt}
                <a href="/checkout" use:link class="btn btn-primary btn-block" on:click={() => globalStore.toggleItem('cart', false)}>Paiement</a>
                    {:else}
                <p class="cart-login">
                    Pour payer vous devez vous <a href="/login" use:link  on:click={() => globalStore.toggleItem('cart', false)}>connecter</a>
                </p>
                {/if}
             </div>
        </div>
    </div>
</div>