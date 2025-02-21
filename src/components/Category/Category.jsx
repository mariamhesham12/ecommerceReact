import { useState } from "react";
import AllCategories from "../AllCategories/AllCategories.jsx";
import SubCategories from "../SubCategories/SubCategories.jsx";

export default function Category() {

  const[selectedCatId,setSelectedCatId]=useState(null)
  const[selectedCatName,setSelectedCatName]=useState("")

  return (
    <>
   <AllCategories setSelectedCatId={setSelectedCatId} setSelectedCatName={setSelectedCatName}/>
   <SubCategories selectedCatId={selectedCatId} selectedCatName={selectedCatName}/>
   </>
  )
}
