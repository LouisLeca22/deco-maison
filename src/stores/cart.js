import { writable, derived} from "svelte/store";
// import localCart from "../localCart"

// cart
const cart = writable(getStorageCart())


// totalCart
export const cartTotal = derived(cart, ($cart) => {
   let total = $cart.reduce((acc, curr) => {
        acc += curr.amount * curr.price
        return acc;
    }, 0)
    return parseFloat(total.toFixed(2))
})

// local functions
const remove = (id, items) => {
    return items.filter(item => item.id !== id)
}

const toggleAmount = (id, items, action) => {
    return items.map(item => {
      if (item.id === id){
        if(action === "inc"){
            return {...item, amount: item.amount + 1}
        } else if (action == "dec") {
            return {...item, amount: item.amount -1 }
        } 
      } else {
        return item
      }
    })
}

// global functions
export const removeItem = id => {
    cart.update(storeValue => {
        return remove(id, storeValue);
    })
}
export const increaseAmount = id => {
    cart.update(storeValue => {
        return toggleAmount(id, storeValue, "inc")
    })
}

export const decreaseAmount = (id, amount) => {
    cart.update(storeValue => {
        // let item = storeValue.find(item => item.id === id)
        let cart;
        if (amount === 1){
            cart = remove(id, storeValue)
        } else {
            cart = toggleAmount(id, storeValue, "dec")
        }
        return cart;
    })
}

export const addToCart = product => {
    cart.update(storeValue => {
        const {id, image, title, price} = product 
        let item = storeValue.find(item => item.id === id)
        let cart;
        if(item){
            cart = toggleAmount(id, storeValue, "inc")
        } else {
            let newItem = {id, image, title, price, amount : 1};
            cart = [...storeValue, newItem]
        }
        return cart
    })
}

// localStorage
function getStorageCart(){
    return localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
}

// used within the ItemsList component with the afterUpdate method
export function setStorageCart(cartValues){
    localStorage.setItem('cart', JSON.stringify(cartValues))
}


export default cart