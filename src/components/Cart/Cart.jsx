import { useContext } from "react"
import { cartContext } from "../../Context/CartContext.jsx"
import { PropagateLoader } from "react-spinners"
import { Link } from "react-router-dom"

export default function Cart() {
  const{totalPrice,products,loading,updateCount,removeItem,clearCart}=useContext(cartContext)
  // console.log(totalPrice,products,loading)

  if(loading){
    return <div className="h-screen flex justify-center items-center"><PropagateLoader color="green" /></div>
  }

  return (
  
    <div className="mt-20 mb-20 bg-slate-100 w-[90%] mx-auto p-5" >
      {products?.length==0 ? <p className="text-center font-bold text-xl">There is no data to display</p>:<>
        <p className="text-2xl font-bold mb-3">Shop Cart:</p>
      <p className="text-md text-main-color mb-5">Total Cart Price: {totalPrice} EGP</p>
      <button type="button" onClick={clearCart} className="mb-7 text-white text-sm bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 text-center me-2 lg:mb-10"><i className="fa-solid fa-trash text-white mr-1"></i> Clear Cart</button>
      <Link to={'/payment'} type="button" className="mb-7 text-white text-sm bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg px-5 py-2.5 text-center me-2 lg:mb-10">Payment</Link>

      <div className="parent">

      {products?.map((product)=>(
        <div key={product.product._id} className="flex justify-center flex-wrap lg:flex-nowrap items-center border-b-[1px] pb-5 mb-5 border-dotted border-gray-600">

        <div className="w-full lg:w-1/6 mb-5 lg:mb-0">
          <img src={product.product.imageCover} className="w-full" alt={product.product.title} />
        </div>

        <div className="w-full lg:w-4/6 lg:ml-5 text-center lg:text-left">
          <p className="text-md font-bold mb-2">{product.product.title}</p>
          <p className="text-sm text-main-color mb-7">price: {product.price} </p>
          <button onClick={()=>removeItem(product.product._id)} type="button" className="mb-7 text-white text-sm bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 text-center me-2 lg:mb-2"><i className="fa-solid fa-trash text-white mr-1"></i> Remove</button>
        </div>

        <div className="w-full lg:w-1/6 flex justify-center lg:justify-normal">
        <div><button onClick={()=>updateCount(product.product._id,product.count+1)} type="button" className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1 text-center mb-2">+</button></div>
        <div className="mx-3"><p>{product.count}</p></div>
        <div><button onClick={()=>updateCount(product.product._id,product.count-1)} type="button" className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1 text-center mb-2">-</button></div>
        </div>
      </div>
      ))}


      </div>
      </>}
     
    </div>
  )
}
