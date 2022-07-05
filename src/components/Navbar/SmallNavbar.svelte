<script>
    import CartButton from "../Cart/CartButton.svelte";
    import globalStore from "../../stores/globalStore"
    import {link} from "svelte-routing"
    let openSidebar = globalStore.toggleItem
</script>



<nav class="navbar">
    <div class="nav-center">
        <button class="btn-sidebar-toggle" on:click={() => openSidebar('sidebar', true)}>
            <i class="fas fa-bars"></i>
        </button>
        <a href="/" use:link class="nav-logo">
            <div class="logo">Mon chez moi</div>
        </a>
        <!-- cart button -->
        <CartButton />
    </div>
</nav>