<script>
    import user from "../stores/user"
    import globalStore from "../stores/globalStore"
    import {link} from "svelte-routing"
</script>


{#if $user.jwt}
<a href="/" use:link class="logout-btn" on:click={() => {
    globalStore.toggleItem("sidebar", false)
}}>Déconnexion</a>
{:else}
<a href="/" use:link  on:click={() => {
    globalStore.toggleItem("sidebar", false)
}}>Connexion</a>
{/if}