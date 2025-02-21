import { useQuery } from "@tanstack/react-query";
import axios from "axios"
// import { useState } from "react";
// import { useEffect } from "react";
import { PropagateLoader } from "react-spinners";
// import MainSlider from "../MainSlider/MainSlider.jsx";
// import CategorySlider from "../CategorySlider/CategorySlider.jsx";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext.jsx";
import toast from "react-hot-toast";
import { wishListContext } from "../../Context/WishListContext.jsx";

export default function Products() {

  const{addItemToWishList,wishList,getUserWishList}=useContext(wishListContext)
  const{addProductToCart}=useContext(cartContext)
  const[loading,setLoading]=useState(false)

  const[searchTerm,setSearchTerm]=useState("")


      useEffect(()=>{
        getUserWishList()
      },[])

  async function addToCart(id){
    setLoading(true)
    try {
      const data=await addProductToCart(id)
      // console.log(data);
      if(data.status=="success"){
        toast.success(data.message)
        setLoading(false)
      }else{
        toast.error("can't add this product to the cart")
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
      setLoading(false)
      
    }

    
  }

  async function getAllProducts(){
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }

  const {isPending,error,data}= useQuery({
    queryKey:['products'],
    queryFn:getAllProducts
  })
 
  if(isPending){
    return <div className="h-screen flex justify-center items-center"><PropagateLoader color="green" /></div>
  }

  if (error) return 'An error has occurred: ' + error.message

  const filteredItems= data?.data.data.filter((product)=> product.title.toLowerCase().includes(searchTerm.toLowerCase()))

  // const[products,setProducts]=useState(null)

//  async function getAllProducts(){
 
//   try {
//     const{data}=await axios.get("https://ecommerce.routemisr.com/api/v1/products")
//     // console.log(data);
//     setProducts(data.data)
   
//   } catch (error) {
//     console.log(error);
   
//   } 
//   }

  // console.log(products);

  // useEffect(()=>{
  //   getAllProducts()
  // },[])

  return (
     <>
        <div className="py-20 w-[90%] mx-auto">
        <input
        type="text"
        placeholder="Search for a product..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-1/2 block mx-auto mb-5 p-2 border rounded-lg shadow-md"
      />
          <div className="flex justify-center items-center flex-wrap">
          
            {filteredItems.length>0 && (
              filteredItems.map((product)=>(
                <div key={product.id} className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 p-4 hover:shadow-all-shadow transition-all duration-700 group overflow-hidden">
                  <Link to={`/productDetails/${product.id}`}>
                  <div className="product p-2">
                    <img src={product.imageCover} alt={product.slug} className="w-full h-[200px] object-cover" />
                    <h3 className="text-[12px] text-main-color mt-5">{product.category.name}</h3>
                    <p className="text-[14px] font-semibold mb-4">{product.title.split(" ").splice(0,2).join(" ")}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[12px]">{product.price} EGP</p>
                      </div>
                      <div>
                        <p className="text-[12px]"><i className="fa-solid fa-star text-yellow-400"></i> {product.ratingsAverage} </p>
                      </div>
                    </div>
                  </div>   
                 
                  </Link>
                  <button onClick={()=>addItemToWishList(product.id)} className="float-right mb-2"><i className={`fa-solid fa-heart ${wishList?.data?.some(item => item._id === product.id)?"text-red-600":"text-gray-500"}`}></i></button>
                  <button type="button" onClick={()=>addToCart(product.id)} className="mx-auto block w-full my-3 text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-bold rounded-lg text-[13px] px-5 py-2.5 text-center translate-y-[200%] group-hover:translate-y-[0%] transition-all duration-700">
                    {loading?<i className="fa-solid fa-spinner fa-spin text-white"></i>:"+add to cart"}
                    </button>
                </div>
              ))
               )}
    
          </div>
        </div>
       
        </>)
}
