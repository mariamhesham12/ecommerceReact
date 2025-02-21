import axios from "axios"
import { useEffect, useState } from "react"


export default function SubCategories({selectedCatId,selectedCatName}) {
    const[subCat,setSubCat]=useState([])
    const[isCatClicked,setIsCatClicked]=useState(false)

    async function getSubCategory(catId){
        try {
            const{data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${catId}/subcategories`)
            console.log(data.data);
            setSubCat(data.data)
            
        } catch (error) {
            console.log(error);          
        }      
    }

    useEffect(()=>{
        if(selectedCatId){
        setIsCatClicked(true)
        getSubCategory(selectedCatId)
    }
    },[selectedCatId])
  
    
  return (
    <div className="pb-20">
    {isCatClicked&& (<>{subCat?.length>0?<>
    <p className="text-center text-2xl font-bold text-main-color">{selectedCatName} SubCategory</p>
    <div className="w-[80%] mx-auto mt-5">
        <div className="flex flex-wrap items-center">
            {subCat.map((subCat)=>(
                <div key={subCat._id} className="w-full md:w-1/2 lg:w-1/3 p-4">
                    <div className="border-2 border-gray-300 rounded-md hover:shadow-all-shadow transition-all duration-700">
                        <p className="text-center p-5">{subCat.name}</p>
                    </div>
                </div>
            ))}

        </div>
      
    </div>
    </>:<p className="text-center text-2xl font-bold text-main-color">There is no SubCategory for {selectedCatName}</p>}</>)
        }
    </div>
  )
}
