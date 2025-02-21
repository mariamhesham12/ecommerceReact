
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout/Layout.jsx'
import Login from './components/Login/Login.jsx'
import Register from './components/Register/Register.jsx'
import Home from './components/Home/Home.jsx'
import Brands from './components/Brands/Brands.jsx'
import Cart from './components/Cart/Cart.jsx'
import Category from './components/Category/Category.jsx'
import Products from './components/Products/Products.jsx'
import Notfound from './components/Notfound/Notfound.jsx'
import { Toaster } from 'react-hot-toast'
import AuthContextProvider from './Context/AuthContext.jsx'
import ProtectedRouter from './components/ProtectedRouter/ProtectedRouter.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductDetails from './components/ProductDetails/ProductDetails.jsx'
import CartContextProvider from './Context/CartContext.jsx'
import Payment from './components/Payment/Payment.jsx'
import AllOrders from './components/AllOrders/AllOrders.jsx'
import WishListContextProvider from './Context/WishListContext.jsx'
import WishList from './components/WishList/WishList.jsx'
import ForgetPassword from './components/ForgetPassword/ForgetPassword.jsx'
import VerifyCode from './components/VerifyCode/VerifyCode.jsx'
import ResetPassword from './components/ResetPassword/ResetPassword.jsx'

function App() {
 const queryClient= new QueryClient()
  const router=createBrowserRouter([
    {path:"/",element:<Layout/>,children:[
      {index:true,element:<Login/>},
      {path:"/register",element:<Register/>},
      {path:"/home",element:<ProtectedRouter><Home/></ProtectedRouter>},
      {path:'/productDetails/:id',element:<ProtectedRouter><ProductDetails/></ProtectedRouter>},
      {path:"/brands",element:<ProtectedRouter><Brands/></ProtectedRouter>},
      {path:"/cart",element:<ProtectedRouter><Cart/></ProtectedRouter>},
      {path:"/category",element:<ProtectedRouter><Category/></ProtectedRouter>},
      {path:"/products",element:<ProtectedRouter><Products/></ProtectedRouter>},
      {path:"/payment",element:<ProtectedRouter><Payment/></ProtectedRouter>},
      {path:"/ecommerceReact/allorders",element:<ProtectedRouter><AllOrders/></ProtectedRouter>},
      {path:"/wishList",element:<ProtectedRouter><WishList/></ProtectedRouter>},
      {path:"/forgetPassword",element:<ForgetPassword/>},
      {path:"/verifyCode",element:<VerifyCode/>},
      {path:"/resetPassword",element:<ResetPassword/>},
      {path:"*",element:<Notfound/>},
    ]}
  ])

  return (
   <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <CartContextProvider>
      <WishListContextProvider>
      <Toaster position="top-right" reverseOrder={false}/>
      <RouterProvider router={router}/>
      </WishListContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
    </QueryClientProvider>
  )
}

export default App
