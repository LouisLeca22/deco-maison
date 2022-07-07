import {writable, derived} from "svelte/store"
import getProducts from "../strapi/getProducts"


const store = writable([], () => {
    setProducts()
    return () => {}
})

async function setProducts (){
    let products;
    let {data} = await getProducts();
    if (data){
        data = data.map(item => {
            return {id: item.id, ...item.attributes}
        } )
        products = flattenProducts(data)
        store.set(products)
    }
}

// flatten products
function flattenProducts(data){
    return data.map(item => {
        let image = item.image.data.attributes.url;
        // let image = `${url}${item.image.data.attributes.url}`
         return {...item, image}
    })
} 
// featured store
export const featuredStore = derived(store, ($featured => {
    return $featured.filter(item => item.featured === true)
}))

 export default store