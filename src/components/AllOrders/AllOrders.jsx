import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { PropagateLoader } from "react-spinners"

export default function AllOrders() {

    const{id}=  jwtDecode(localStorage.getItem("token"))
    // console.log(id);

    async function getUserOrders(){
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
    }

    const{data,error,isPending}=useQuery({
        queryKey:['userOrders'],
        queryFn:getUserOrders
    })

    console.log(data);
    
    if(isPending) return <div className="h-screen flex justify-center items-center"><PropagateLoader color="green" /></div>

    if (error) return 'An error has occurred: ' + error.message
    
  return (
    <div className="py-20">
      <div className="w-[90%] mx-auto">
        {data?.data.map((order)=>(
        <div key={order.id} className="bg-slate-100 p-4 mb-5">
            <p className="font-bold mb-2">Total Order Price: <span className="text-main-color text-sm">{order.totalOrderPrice} EGP</span></p>
            <p className="font-bold">Payment Method Type: <span className="text-main-color text-sm">{order.paymentMethodType}</span></p>

            <div className="flex justify-center items-center">
                {order?.cartItems.map((orderImg)=>(
                    <div key={orderImg._id} className="mx-2 py-7">
                        <img src={orderImg?.product?.imageCover} className="w-full h-[100px] lg:h-[200px]" alt={orderImg?.product?.title}/>
                    </div>

                ))}

            </div>

        </div>
        ))}
       

      </div>
    </div>
  )
}
