<script>
	//components 
	import Navbar from "./components/Navbar/Navbar.svelte"
	import Sidebar from "./components/Navbar/Sidebar.svelte"
	import Cart from "./components/Cart/Cart.svelte"
	import Alert from "./components/Alert.svelte"
	// pages
	import Home from "./pages/Home.svelte"
	import About from "./pages/About.svelte"
	import Login from "./pages/Login.svelte"
	import ProductsList from "./pages/ProductsList.svelte"
	import SingleProduct from "./pages/SingleProduct.svelte"
	import Checkout from "./pages/Checkout.svelte"
	// router 
	import {Router, Route, Link} from "svelte-routing"
	// global store 
	import globalStore from "./stores/globalStore"
</script>

<Router> 
	<Navbar />
	{#if $globalStore.sidebar}
	<Sidebar />
	{/if}
	{#if $globalStore.cart}
	<Cart />
	{/if}
	{#if $globalStore.alert}
	<Alert />
	{/if}
	 <Route path="/" component={Home} />
	<Route path="/about" component={About} />
	<Route path="/products" component={ProductsList} />
	<Route path="/product/:id" component={SingleProduct} />
	<Route path="/login" component={Login} />
	<Route path="/checkout" component={Checkout} />
</Router>
