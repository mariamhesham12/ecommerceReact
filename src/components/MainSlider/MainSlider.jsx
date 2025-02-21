import Slider from "react-slick";
import sliderimg1 from './../../assets/images/slider-image-1.jpeg'
import sliderimg2 from './../../assets/images/slider-image-2.jpeg'
import sliderimg3 from './../../assets/images/slider-image-3.jpeg'

import blog1 from './../../assets/images/blog-img-1.jpeg'
import blog2 from './../../assets/images/blog-img-2.jpeg'


export default function MainSlider() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true
      };
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center py-20 w-[90%] mx-auto">
        <div className="w-full lg:w-2/3">
        <Slider {...settings}>
            <div>
                <img src={sliderimg1} className="w-full h-[400px]" alt="slider img1" />
            </div>
            <div>
                <img src={sliderimg2} className="w-full h-[400px]" alt="slider img2" />
            </div>
            <div>
                <img src={sliderimg3} className="w-full h-[400px]" alt="slider img3" />
            </div>
        </Slider>
        </div>
        <div className="w-full lg:w-1/3">
            
            <img src={blog1} className="w-full h-[200px]" alt="blog1" />
            <img src={blog2} className="w-full h-[200px]" alt="blog2" />
           
        </div>
      
    </div>
  )
}
