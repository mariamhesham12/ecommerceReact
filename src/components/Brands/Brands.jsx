import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PropagateLoader } from "react-spinners";

export default function Brands() {
  const [selectedBrand, setSelectedBrand] = useState(null); // Store selected brand data
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility

  async function getAllBrands() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { data, error, isPending } = useQuery({
    queryKey: ["brands"],
    queryFn: getAllBrands,
  });

  if (isPending)
    return (
      <div className="h-screen flex justify-center items-center">
        <PropagateLoader color="green" />
      </div>
    );
  if (error) return "An error has occurred: " + error.message;

  // Open modal and set selected brand
  function openModal(brand) {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  }

  // Close modal
  function closeModal() {
    setIsModalOpen(false);
    setSelectedBrand(null);
  }

  return (
    <div className="py-20">
      <h1 className="text-center text-2xl font-bold text-main-color">All Brands</h1>

      <div className="w-[80%] mx-auto mt-5">
        <div className="flex flex-wrap justify-center items-center">
          {data?.data.data.map((brand) => (
            <div key={brand._id} className="p-4 w-full md:w-1/2 lg:w-1/4">
              <div
                className="p-2 rounded-lg border-2 border-gray-200 hover:shadow-all-shadow duration-500 transition-all cursor-pointer"
                onClick={() => openModal(brand)}
              >
                <img src={brand.image} alt={brand.slug} className="w-full" />
                <p className="text-center text-sm my-3 text-green-700 font-bold">{brand.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Component */}
      {isModalOpen && selectedBrand && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            {/* Modal Header */}
            <h2 className="text-xl font-bold text-center text-main-color">{selectedBrand.name}</h2>
            
            {/* Modal Body */}
            <div className="my-4">
              <img src={selectedBrand.image} alt={selectedBrand.slug} className="w-full rounded-md" />
              <p className="text-gray-700 text-center mt-2">This is the brand: {selectedBrand.name}</p>
            </div>

            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
              onClick={closeModal}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
