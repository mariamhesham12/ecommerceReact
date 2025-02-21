import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { PropagateLoader } from "react-spinners"

export default function AllCategories({setSelectedCatId,setSelectedCatName}) {
    async function getAllCategories(){
        return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
      }
      const{error,data,isPending}=useQuery({
        queryKey:['categories'],
        queryFn:getAllCategories
      })
      if(isPending) return <div className="h-screen flex justify-center items-center"><PropagateLoader color="green" /></div>
    
      if (error) return 'An error has occurred: ' + error.message
    
      // console.log(data);
  return (
    <div className="py-20">
    <h1 className="text-center text-2xl font-bold text-main-color">All Categories</h1>
    <div className="w-[80%] mx-auto mt-5">
      <div className="flex flex-wrap items-center">
        {data?.data.data.map((cat)=>(
          <div key={cat._id} className="w-full md:w-1/2 lg:w-1/3 p-6">

            <div onClick={()=>{
              setSelectedCatId(cat._id);
              setSelectedCatName(cat.name);}} 
              className="border-2 border-gray-300 rounded-lg hover:shadow-all-shadow transition-all duration-700">
              <img src={cat.image} className="w-full h-[350px] object-cover" alt={cat.slug}  />
              <p className="py-4 text-center font-bold text-sm text-main-color">{cat.name}</p>

            </div>
          </div>
        ))}

      </div>
    </div>
  </div>
  )
}
