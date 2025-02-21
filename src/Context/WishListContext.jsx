import axios from "axios"
import { createContext, useState } from "react"
import toast from "react-hot-toast"


export const wishListContext=createContext()

export default function WishListContextProvider({children}) {
   
    const[wishList,setWishList]=useState([])

    async function addItemToWishList(productId) {
        try {
            const{data}=await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",{
                productId
            },
            {headers:{
                token:localStorage.getItem("token")
            }}
        )
        getUserWishList()
        toast.success(data.message)
        } catch (error) {
            console.log(error); 
        }   
    }
           

async function getUserWishList(){
  
    try {
        const{data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        setWishList(data)
        return data

    } catch (error) {
        console.log(error);
    }
}

async function removeProductFromWishList(productId){
    try {
        const{data}=await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
            headers:{
                token:localStorage.getItem("token")
            }
        })

        getUserWishList()

        toast.success(data.message)
    } catch (error) {
        console.log(error);
        
    }
    
    
}
   
  return (
    <wishListContext.Provider value={
        {addItemToWishList,wishList,removeProductFromWishList,getUserWishList}
    }>
      {children}
    </wishListContext.Provider>
  )
}
