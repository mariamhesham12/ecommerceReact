
import amazon from './../../assets/images/amazon-pay-svgrepo-com.svg'
import googlePlay from './../../assets/images/google-play-badge-logo-svgrepo-com.svg'
export default function Footer() {
  return (
    <div>
      

<footer className="bg-light-color rounded-lg shadow-sm dark:bg-gray-900">
  <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
    <div>
        <span className="self-center text-xl mb-2 block font-semibold whitespace-nowrap">Get the FreshCart app</span>
        <p className="text-gray-600 mb-5 text-sm">We will send you a link, open it to your phone to download the app.</p> 
    </div>

    <div className="w-[90%] mx-auto flex flex-col lg:flex-row">

    <div className="w-full lg:w-[80%]">
      <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Email..." required />
    </div>
    <div className="w-full lg:w-[20%] mt-3 lg:mt-0">
    <button type="button" className=" focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 lg:ml-3">Share App Link</button>
    </div>
    </div>
    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <div className="flex items-center justify-between lg:flex-row flex-col">
      <div className="flex items-center">
      <p className="text-[12px] lg:text-[16px] mr-2">Payment Partners</p>
      <img src={amazon} 
        alt="Amazon Pay" className="h-4 lg:h-7" />
         <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" 
        alt="MasterCard" className="h-2 lg:h-3 mx-1 lg:mx-3" />
         <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" 
        alt="PayPal" className="h-2 lg:h-3" />

      </div>
      
      <div className="flex items-center mt-3 lg:mt-0">
      <p className="text-[12px] lg:text-[16px]">Get deliveries with FreshCart</p>
      <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
          alt="Download on the App Store" className="h-4 lg:h-7 mx-1 lg:mx-3" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
          alt="Get it on Google Play" className="h-4 lg:h-7" />
      </div>
      
      
    </div>
    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700" />
  </div>
</footer>


    </div>
  )
}
