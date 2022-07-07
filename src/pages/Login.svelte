<script>
    import loginUser from "../strapi/loginUser"
    import registerUser from "../strapi/registerUser"
    import {navigate} from "svelte-routing"
    import globalStore from "../stores/globalStore"
    let email = "";
    let password = "";
    let username = "Nom d'utilisateur";
    let isMember = true
    $: isEmpty = !email || !password || !username || $globalStore.alert

    function toggleMember(){
        isMember = !isMember
        if(!isMember){
            username = ""
        } else {
            username = "Nom d'utilisateur"
        }
    }
    
    async function handleSubmit(){
        globalStore.toggleItem("alert", true, "Chargement...")
        let user;
        if(isMember){
           user = await loginUser({email, password})
        } else {
           user = await registerUser({email, password, username})
        }
        if(user){
            navigate('/products')
            globalStore.toggleItem("alert", true, "Bienvenue sur Déco Maison!")
            return;
        } 
        globalStore.toggleItem("alert", true, "Une erreur s'est produite... Réessayez", true)

    }
</script>

<svelte:head>
    <title>Connexions</title>
</svelte:head>

<section class="form">
    <h2 class="section-title">
        {#if isMember}
        Se connecter
        {:else}
        Créer un compte
        {/if}
    </h2>
    <form class="login-form" on:submit|preventDefault={handleSubmit}>
        <div class="form-control">
            <label for="email">
                E-mail
            </label>
            <input type="email" id="email" bind:value={email} />
        </div>
        <div class="form-control">
            <label for="password">
                Mot de passe
            </label>
            <input type="password" id="password" bind:value={password} />
        </div>
        {#if !isMember} 
        <div class="form-control">
            <label for="username">
                Nom d'utilisateur
            </label>
            <input type="text" id="username" bind:value={username} />
        </div>
        {/if}
        {#if isEmpty}
            <p class="form-empty">Tous les champs doivent être remplis</p>
        {/if}
        <button type="submit" class="btn btn-block btn-primary" disabled={isEmpty} class:disabled={isEmpty}>
            C'est parti !
        </button>
        {#if isMember}
            <p class="register-link">S'inscrire ?  <button on:click={toggleMember} type="button">Cliquez ici</button></p>
          
            {:else}
            <p class="register-link">Déjà inscrit ? <button on:click={toggleMember} type="button">Cliquez ici</button></p>
          
        {/if}
    </form>
</section>