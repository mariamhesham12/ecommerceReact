import { useContext, useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import { cartContext } from "../../Context/CartContext.jsx";
import toast from "react-hot-toast";
import { wishListContext } from "../../Context/WishListContext.jsx";

export default function WishList() {

const[loaading,setLoaading]=useState(false)
const[loading,setLoading]=useState(false)
const{addProductToCart}=useContext(cartContext)
const{removeProductFromWishList,getUserWishList,wishList}=useContext(wishListContext)
  
async function addToCart(id) {
    setLoaading(true)
    try {
      const data=await addProductToCart(id)
    //   console.log(data);
      if(data.status=="success"){
        toast.success(data.message)
        setLoaading(false)
      }else{
        toast.error("can't add this product to the cart")
        setLoaading(false)
      }
    } catch (error) {
      console.log(error);
      setLoaading(false)
      
    }
}
 async function getUserData() {
    setLoading(true)
    try {
      let data=  await getUserWishList()
      console.log(data,"from get user data");
      
      setLoading(false)
    } catch (error) {
        console.log(error);
        setLoading(false)    
    }
 }
    useEffect(()=>{
        getUserData()
    },[])
    console.log(wishList,"wishList from wish list component");
    
    
     
     if(loading){
        return <div className="h-screen flex justify-center items-center"><PropagateLoader color="green" /></div>
      }
    


  return (

  
    <div className="py-20">
      <div className="w-[90%] mx-auto">
        <div className="bg-slate-100 p-5">
            {wishList?.data?.length > 0 ?<>
                <h1 className="text-2xl font-bold mb-5">My Wishlist</h1>
         {
            wishList?.data?.map((item)=>(
            <div key={item._id} className="flex justify-center flex-wrap lg:flex-nowrap items-center border-b-[1px] pb-5 mb-5 border-dotted border-gray-600">
            
            <div className="w-full lg:w-1/6 mb-5 lg:mb-0">
            <img src={item.imageCover} className="w-full" alt={item.title} />
            </div>

            <div className="w-full lg:w-4/6 lg:ml-5 text-center lg:text-left">
            <p className="text-md font-bold mb-2">{item.title}</p>
            <p className="text-sm text-main-color mb-7">price: {item.price} </p>
            <button type="button" onClick={()=>removeProductFromWishList(item.id)} className="mb-7 text-white text-sm bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 text-center me-2 lg:mb-2"><i className="fa-solid fa-trash text-white mr-1"></i> Remove</button>
            </div>

            <div className="w-full lg:w-1/6 flex justify-center lg:justify-normal">
            <button type="button" onClick={()=>addToCart(item.id)} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5">
            {loaading?<i className="fa-solid fa-spinner fa-spin text-white"></i>:"+add to cart"}
            </button>

            </div>

            </div>
        ))}
            </> :<h1 className="text-2xl font-bold mb-5 text-center">No data in the Wishlist</h1> }
       
        </div>
        
      </div>
    </div>
  )
}
