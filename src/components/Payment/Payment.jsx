import { useFormik } from "formik"
import { useContext, useState } from "react"
import * as Yup from 'yup'
import { cartContext } from "../../Context/CartContext.jsx"
import axios from "axios"
import toast from "react-hot-toast"

export default function Payment() {
    const[loading,setLoading]=useState(false)
    const[Onlineloading,setOnlineLoading]=useState(false)
    const{ setNumOfItems,setProducts,setTotalPrice,caartId}=useContext(cartContext)

    async function cashPayment(values) {
        setLoading(true)
        try {
            const { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/${caartId}`,
                values,
                {
                    headers: { token: localStorage.getItem("token") }
                }
            );
            toast.success(data.status)
            setNumOfItems(0)
            setProducts([])
            setTotalPrice(0)
            // console.log(data);
            setLoading(false)

        } catch (error) {
            console.log(error.response?.data?.message);
            // toast.error(error.response?.data?.message)
            setLoading(false)
        }
    }
    
    // console.log("Cart ID in Payment:", caartId); 
    async function onlinePayment(values){
        setOnlineLoading(true)
        try {
            const{data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${caartId}`,values,{
                headers:{
                    token:localStorage.getItem("token")
                },
                params:{
                    url:"https://mariamhesham12.github.io/"
                }
            })
            toast.success(data.status)
            window.open(data.session.url)
            // console.log(data);
            setOnlineLoading(false)
            
           
        } catch (error) {
            console.log(error);
            setOnlineLoading(false)
            
        }
    }   

    const validationSchema=Yup.object().shape({
        shippingAddress: Yup.object().shape({
        details:Yup.string().required("Details are required"),
        phone:Yup.string().required("Phone is required").matches(/^01[0-2,5]{1}[0-9]{8}$/,"Phone must be in Egyptian format"),
        city:Yup.string().required("City are required")
    })})

    const formik=useFormik({
        initialValues:{
            shippingAddress:{
                details: "",
                phone: "",
                city: ""
                }
        },
        validationSchema,
        onSubmit:cashPayment
    })

  return (
    <div className="mt-[150px] pb-[150px]">
        <div className="container w-[90%] md:w-[70%] mx-auto">
        <h1 className="text-main-color text-2xl font-bold mt-5">Cash Payment:</h1>
        <form onSubmit={formik.handleSubmit}>

             {/* details input */}
           <div className="relative z-0 w-full mt-7 mb-5 group">
            <input type="text" value={formik.values.shippingAddress.details} onBlur={formik.handleBlur} onChange={formik.handleChange} name="shippingAddress.details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details:</label>
            </div>

            {formik.errors.shippingAddress?.details&&formik.touched.shippingAddress?.details&&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.shippingAddress?.details}!</span>
        </div>}


               {/* phone input */}
           <div className="relative z-0 w-full mt-7 mb-5 group">
            <input type="tel" name="shippingAddress.phone" value={formik.values.shippingAddress.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone:</label>
            </div>

            {formik.errors.shippingAddress?.phone&&formik.touched.shippingAddress?.phone&&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.shippingAddress?.phone}!</span>
            </div>}

               {/* city input */}
           <div className="relative z-0 w-full mt-7 mb-5 group">
            <input type="text" name="shippingAddress.city" id="city" value={formik.values.shippingAddress.city} onBlur={formik.handleBlur} onChange={formik.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City:</label>
            </div>
             
            {formik.errors.shippingAddress?.city&&formik.touched.shippingAddress?.city&&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.shippingAddress?.city}!</span>
            </div>}


             <button onClick={cashPayment} type="submit" className="float-end mt-5 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
             {loading?<i className="fa-solid fa-spin fa-spinner text-white"></i>:"Cash Payment"}
            </button>

            <button onClick={() => onlinePayment(formik.values)} type="button" className="float-end mt-5 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
             {Onlineloading?<i className="fa-solid fa-spin fa-spinner text-white"></i>:"Online Payment"}
            </button>

        </form>

        </div>
    </div>
  )
}
