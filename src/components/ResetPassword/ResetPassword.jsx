import axios from "axios";
import { useFormik } from "formik"
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from 'yup'
import { tokenContext } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";

export default function ResetPassword() {
    const[loading,setLoading]=useState(false)
    const[loaading,setLoaading]=useState(false)
    const{setToken}=useContext(tokenContext)
    const navigate=useNavigate()

  async function resetPassword(values){
    setLoading(true)
    setLoaading(true)
        try {
            const{data}=await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",values)
            console.log(data);
            setToken(data.token)
            localStorage.setItem("token",data.token)
            toast.success("Password updated successfully")
            navigate("/home")
            setLoading(false)
            setLoaading(false)

        } catch (error) {
            toast.error(error?.response?.data?.message)
            console.log(error);
            setLoading(false)
            setLoaading(false)
            
        }
        
    }

 const validationSchema=Yup.object().shape({
  email:Yup.string().required("Email is required").email("invalid email format"),
  newPassword:Yup.string().required("Password is required").matches(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/,"Password must be at least 6 characters long and include at least one letter and one number"),
  })
    const formik=useFormik({
        initialValues:{
            email:"",
            newPassword:""
        },
        validationSchema,
        onSubmit:resetPassword
    })
    if(loaading){
        return <div className="h-screen flex justify-center items-center"><PropagateLoader color="green" /></div>
    }
  return (
       <div className="py-20 mb-[100px]">
        <div className="mx-auto w-[90%]">
        <p className="text-xl font-bold mt-5">Reset your account password:</p>
        
        <form onSubmit={formik.handleSubmit}>
        
        <div className="relative z-0 w-full mt-7 mb-5 group">
            <input type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email:</label>
        </div>
        {formik.errors.email&&formik.touched.email&&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.email}!</span>
        </div>}

        <div className="relative z-0 w-full mt-7 mb-5 group">
            <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.newPassword} name="newPassword" id="newPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Password:</label>
        </div>
        
        {formik.errors.newPassword&&formik.touched.newPassword&&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.newPassword}!</span>
        </div>}

        <button type="submit" className="float-end mt-5 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
        
        {loading?<div role="status">
            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>:'Reset password'}

        </button>
        </form>
        </div>
    </div>
  )
}
