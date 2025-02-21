import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Slider from "react-slick";

export default function CategorySlider() {
    async function getAllCategories(){
        return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }
    const{data}=useQuery({
        queryKey:['categories'],
        queryFn:getAllCategories
    })
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow:6,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
        responsive: [
            {
                breakpoint: 1024, 
                settings: { slidesToShow: 6 }
            },
            {
                breakpoint: 768, 
                settings: { slidesToShow: 4 }
            },
            {
                breakpoint: 576, 
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 400, 
                settings: { slidesToShow: 1 }
            }
        ]
      };
  return (
    <div className="w-[90%] mx-auto">
        <p className="mb-5 text-xl font-bold">Shop Popular Categories</p>
      <Slider {...settings}>
        
        {data?.data.data.map((category)=>(
            <div key={category._id}>
            <img src={category.image} className="w-full h-[200px]" alt={category.slug} />
            <p className="text-center mt-2 text-sm">{category.name}</p>
            </div>
        ))}
     
      </Slider>
    </div>
  )
}
