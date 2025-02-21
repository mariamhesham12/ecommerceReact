import { NavLink, useNavigate } from "react-router-dom";
import logo from "./../../assets/images/freshcart-logo.svg";
import { useContext } from "react";
import { tokenContext } from "../../Context/AuthContext.jsx";
import { cartContext } from "../../Context/CartContext.jsx";

export default function Navbar() {

  const{numOfItems}=useContext(cartContext)
  const{token,setToken}=useContext(tokenContext)
  const navigate=useNavigate()

  function signOut(){
    localStorage.removeItem("token")
    setToken(null)
    navigate("/")
  }

  return (
    <div>
      <nav className="bg-light-color fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between lg:justify-normal mx-auto p-4">
          <NavLink
            to={"/home"}
            className="flex items-center space-x-3 rtl:space-x-reverse lg:w-[20%]"
          >
            <img src={logo} className="h-8 w-[130px]" alt="Logo" />
          </NavLink>

          <div className="flex lg:order-2 space-x-3 lg:space-x-0 rtl:space-x-reverse">
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          <div className="items-center justify-between hidden w-full lg:flex lg:w-[80%] lg:order-1" id="navbar-sticky">
            
            <div className="bg-slate-50 lg:w-1/2">
            <ul className="flex items-center flex-col lg:p-0 mt-4 font-medium text-sm border border-gray-100 rounded-lg bg-light-color lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:bg-light-color">
              {token?<><li>
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded-sm lg:bg-transparent lg:p-0 
              ${isActive ? "text-green-500" : "text-gray-900"}`
                  }
                >
                  Home
                </NavLink>
              </li>
              
              <li>
                <NavLink
                  to={"/products"}
                  className={({ isActive }) => 
                    `block py-2 px-3 rounded-sm lg:bg-transparent lg:p-0 
                    ${isActive ? 'text-green-500' : 'text-gray-900'}`
                  }  
                  >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/category"}
                  className={({ isActive }) => 
                    `block py-2 px-3 rounded-sm lg:bg-transparent lg:p-0 
                    ${isActive ? 'text-green-500' : 'text-gray-900'}`
                  }
                  >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/brands"}
                  className={({ isActive }) => 
                    ` block pt-2 px-3 rounded-sm lg:bg-transparent lg:p-0 
                    ${isActive ? 'text-green-500' : 'text-gray-900'}`
                  }>
                  Brands
                 
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/allorders"}
                  className={({ isActive }) => 
                    ` block pt-2 px-3 rounded-sm lg:bg-transparent lg:p-0 
                    ${isActive ? 'text-green-500' : 'text-gray-900'}`
                  }>
                  All Orders
                 
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/wishList"}
                  className={({ isActive }) => 
                    ` block pt-2 px-3 rounded-sm lg:bg-transparent lg:p-0 
                    ${isActive ? 'text-green-500' : 'text-gray-900'}`
                  }>
                  Wishlist
                 
                </NavLink>
              </li>
              <li>
              <NavLink 
                to="/cart" 
                className={({ isActive }) => 
                  `relative block py-2 px-3 rounded-sm lg:bg-transparent lg:p-0 
                  ${isActive ? 'text-green-500' : 'text-gray-900'}`
                }
              >
                Cart
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-4 -end-5">{numOfItems}</div>
              </NavLink>
            </li>
              </>:""}

            </ul>
            </div>

       
            <div className="bg-red-100 lg:w-1/2">
            <ul className="flex items-center flex-col lg:p-0 lg:justify-end mt-4 font-medium text-sm border border-gray-100 rounded-lg bg-light-color lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:bg-light-color">
            <a href="https://www.instagram.com/accounts/login/?hl=en" target="blank"><i className="fa-brands fa-instagram py-2 px-3 lg:p-0 lg:m-0"></i></a>
            <a href="https://www.facebook.com/login.php/" target="blank"> <i className="fa-brands fa-facebook py-2 px-3 lg:p-0 lg:m-0"></i></a>       
            <a href="https://www.youtube.com/" target="blank"> <i className="fa-brands fa-youtube py-2 px-3 lg:p-0 lg:m-0"></i></a> 
            {token?<button onClick={signOut} className="py-2 px-3 lg:p-0 lg:m-0" >SignOut</button>:<>
              <NavLink to={'/'} className={({ isActive }) =>`block py-2 px-3 rounded-sm lg:bg-transparent lg:p-0 ${isActive ? "text-green-500" : "text-gray-900"}`}>Login</NavLink>
              <NavLink to={'/register'} className={({ isActive }) =>`block py-2 px-3 rounded-sm lg:bg-transparent lg:p-0 ${isActive ? "text-green-500" : "text-gray-900"}`}>Register</NavLink>
            
            </>}  
            
            </ul>
            </div>

            
          </div>
          
          
        </div>
      </nav>
    </div>
  );
}
