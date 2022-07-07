import url from "./URL"

export default async () => {
    const response = await fetch(`${url}/api/products?populate=image`).catch(error => console.log(error))

    const products = await response.json()
    if (products.error){
        return null
    }
    return products;
}