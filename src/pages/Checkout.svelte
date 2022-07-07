<script>
  import { onMount } from "svelte";
  import { navigate, link } from "svelte-routing";
  import user from "../stores/user";
  import cart, { cartTotal } from "../stores/cart";
  import submitOrder from "../strapi/submitOrder"
  import globalStore from "../stores/globalStore"
  let address;
  $: isEmpty = !address | $globalStore.alert

  // stripe vars
  let cardElement;
  let cardErrors;
  let card;
  let stripe;
  let elements;

  onMount(() => {
    if (!$user.jwt) {
      navigate("/");
      return;
    }
    if ($cartTotal > 0) {
      stripe = Stripe(
        "pk_test_51KGWCfCQVu5hGfDjy7HwGAbfF6pDCQ2NJHQD1qwGasIEpLIZEYS36Q5StMDmJOwwAGm0w6Ao0bTCOk3coh80vQTz00fZxUl6PI"
      );
      elements = stripe.elements();
      card = elements.create("card");
      card.mount(cardElement);
      card.addEventListener("change", function (event) {
        if (event.error) {
          cardErrors.textContent = event.error.message;
        } else {
          cardErrors.textContent = "";
        }
      });
    }
  });

  async function handleSubmit() {
    globalStore.toggleItem('alert', true, "Traitement du paiement...")
    let response = await stripe
      .createToken(card)
      .catch((error) => console.log(error));
    const { token } = response;
    if (token) {
      const {id} = token 
      let order = await submitOrder({address,total:$cartTotal, items: $cart, stripeTokenId: id, userToken: $user.jwt })
        if(order){
            globalStore.toggleItem("alert", true, "Votre paiement a bien été enregistré")
            cart.set([])
            localStorage.setItem("cart", JSON.stringify([]))
            navigate("/")
            return
        }
    } else {
        globalStore.toggleItem('alert', true, "Une erreur s'est produite.. Réessayez",true)
    }
  }
</script>

<svelte:head>
  <title>Paiement</title>
</svelte:head>

{#if $cartTotal > 0}
  <section class="form">
    <h2 class="section-title">Paiement</h2>
    <form class="checkout-form" on:submit|preventDefault={handleSubmit}>
      <h3>order total : {$cartTotal}€</h3>
      <div class="form-control">
        <label for="name">Votre adresse</label>
        <input type="text" id="name" bind:value={address} />
      </div>
      <div class="stripe-input">
        <label for="card-element">Carte bancaire</label>
        <p class="stripe-info">
          Tester le paiement en utilisant cette carte :
          <span>4242 4242 4242</span>
          <br />
          Entrez n'importe quelle date d'expiration
          <br />
          Entrez n'importe quel code de sécurité à 3 chiffres
        </p>
        <div id="card-element" bind:this={cardElement} />
        <div id="card-errors" bind:this={cardErrors} role="alert" />
      </div>
      {#if isEmpty}
        <p class="form-empty">Les champs doivent être remplis</p>
      {/if}
      <button
        type="submit"
        class="btn btn-block btn-primary"
        disabled={isEmpty}
        class:disabled={isEmpty}
      >
        Payer
      </button>
    </form>
  </section>
{:else}
  <div class="checkout-empty">
    <h2>Votre panier est vide</h2>
    <a href="/products" use:link class="btn btn-primary">Voir nos produits</a>
  </div>
{/if}
