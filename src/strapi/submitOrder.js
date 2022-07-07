import axios from "axios"
import url from "./URL"

async function submitOrder({address, total, items, stripeTokenId, userToken}){

    const response = await axios.post(`${url}/api/orders`, {data: {address, total, items, stripeTokenId}} , {headers: {Authorization: `Bearer ${userToken}`}}).catch(error => console.log(error))
   
    return response
}

export default submitOrder;