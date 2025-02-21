import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { tokenContext } from "./AuthContext.jsx"

export const cartContext=createContext()

export default function CartContextProvider({children}) {
    const{token}=useContext(tokenContext)
    const[numOfItems,setNumOfItems]=useState(0)
    const[products,setProducts]=useState([])
    const[totalPrice,setTotalPrice]=useState(0)
    const[loading,setLoading]=useState(false)
    
    const[caartId,setCaartId]=useState(null)

    // add to cart
    async function addProductToCart(id){
        try {
            const{data}= await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{productId:id},{headers:{token:localStorage.getItem("token")}})
           getUserCart()
            return data   
        } catch (error) {
            console.log(error);      
        }
    }

    // get user cart
    async function getUserCart() {
        setLoading(true);
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: { token: localStorage.getItem("token") }
            });
    
            setNumOfItems(data.numOfCartItems);
            setProducts(data.data.products);
            setTotalPrice(data.data.totalCartPrice);

                setCaartId(data.data._id); 

             // console.log("cart id from cart context",caartId);
                
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    



    //update count
    async function updateCount(id,count){
        try {
            const{data}=await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{headers:{token:localStorage.getItem("token")}})
            setNumOfItems(data.numOfCartItems)
            setProducts(data.data.products)
            setTotalPrice(data.data.totalCartPrice)
            
        } catch (error) {
            console.log(error,"error from update count");
            
        }
    }

    //remove item
    async function removeItem(id) {
        try {
            const{data}=await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            setNumOfItems(data.numOfCartItems)
            setProducts(data.data.products)
            setTotalPrice(data.data.totalCartPrice)
            
        } catch (error) {
            console.log(error,"error from remove item context");
            
        }

    }

    //clear cart
    async function clearCart(){
        try {
            const{data}=await axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{
                headers:{
                    token:localStorage.getItem("token")
                }
            }) 

            setNumOfItems(0)
            setProducts([])
            setTotalPrice(0)

        } catch (error) {
            console.log(error,"error from clear cart context");
            
        }
    }

    useEffect(()=>{
        if(token!==null){
        getUserCart() }
    },[token])

  return (
    <cartContext.Provider value={
        {addProductToCart,
            numOfItems,
            totalPrice,
            products,
            loading,
            updateCount,
            removeItem,
            clearCart,
            caartId,
            setNumOfItems,setProducts,setTotalPrice
        }
    }>
      {children}
    </cartContext.Provider>
  )
}
