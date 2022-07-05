<script>
    export let id;
    export let image;
    export let title;
    export let price;
    export let amount;
    import {removeItem, increaseAmount, decreaseAmount} from "../../stores/cart"
</script>


<div class="cart-item">
    <img src={image} alt={title} />
    <div>
        <h4>{title}</h4>
        <h5>{price}</h5>
        <button class="cart-btn remove-btn" on:click={() => removeItem(id)}>
            Supprimer
        </button>
    </div>
    <div>
        <button class="cart-btn amount-btn" on:click={() => increaseAmount(id)}>
            <i class="fas fa-chevron-up"> </i>
        </button>
        <p class="item-amount">{amount }</p>
        <button class="cart-btn amount-btn" on:click={() => decreaseAmount(id, amount)}>
            <i class="fas fa-chevron-down"> </i>
        </button>
    </div>
</div>