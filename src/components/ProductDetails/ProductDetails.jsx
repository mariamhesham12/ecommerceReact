import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useParams } from "react-router-dom"
import Slider from "react-slick"
import { PropagateLoader } from "react-spinners"
import { cartContext } from "../../Context/CartContext.jsx"
import { useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { wishListContext } from "../../Context/WishListContext.jsx"

export default function ProductDetails() {

    const{addItemToWishList,wishList,getUserWishList}=useContext(wishListContext)
    const{id}=useParams()
    const[loading,setLoading]=useState(false)
    const{addProductToCart} = useContext(cartContext);

      useEffect(()=>{
        getUserWishList()
      },[])

    async function addToCart(){
        setLoading(true)
        try {
            const data= await addProductToCart(id)
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


    async function getProductDetails() {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    const{error,data,isPending}=useQuery({
        queryKey:['productDetails'],
        queryFn:getProductDetails
    })
    // console.log(data);
    
    if(isPending){
        return <div className="h-screen flex justify-center items-center"><PropagateLoader color="green" /></div>
    }
    if (error) return 'An error has occurred: ' + error.message

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        arrows:false
      };

  return (
    <div className="flex justify-center items-center flex-wrap py-20 w-[90%] mx-auto">
        <div className="w-full md:w-1/3">
        <Slider {...settings}>
            {data?.data.data?.images.map((imgDetail,indx)=>(
                <div key={indx}>
                    <img src={imgDetail} className="w-full h-[400px]" alt="image detail" />
                </div>
            ))}
        </Slider>
        </div>
        <div className="w-full md:w-2/3 md:px-10 mt-10 md:mt-0">
        <h2 className="font-bold mb-4 text-xl">{data?.data.data.title}</h2>
        <p className="text-sm mb-4 text-gray-600">{data?.data.data.description}</p>
        <p className="text-[13px] font-bold mb-2">{data?.data.data.category.name}</p>
        <div className="flex items-center justify-between mb-5">
            <div>
                <p className="text-[12px] font-bold">{data?.data.data.price} EGP</p>
            </div>
            <div>
            <p className="text-[12px] font-bold"><i className="fa-solid fa-star text-yellow-400"></i> {data?.data.data.ratingsAverage} </p>
            </div>
        </div>
        <button type="button" onClick={addToCart} className="w-full font-bold text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            {loading?<div role="status">
            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>:"+ add to cart"}</button>

        <button onClick={()=>addItemToWishList(id)} className="float-right mb-2"><i className={`fa-solid fa-heart ${wishList?.data?.some(item => item._id === id)?"text-red-600":"text-gray-500"}`}></i></button>
        </div>
      
    </div>
  )
}
