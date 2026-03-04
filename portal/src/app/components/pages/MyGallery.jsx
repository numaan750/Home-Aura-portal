"use client";

import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "@/context/Appcontext";
import GeneratedResult from "./GeneratedResult";

const MyGallery = () => {
  const { gallery, fetchGallery } = useContext(AppContext);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  if (selectedItem) {
    return (
      <GeneratedResult
        generatedImage={selectedItem.imageUrl}
        uploadedImage={selectedItem.uploadedImage}
        selectedRoom={selectedItem.roomType}
        selectedRoomImage={selectedItem.roomTypeImage}
        selectedStyleImage={selectedItem.styleImage}
        selectedColorImage={selectedItem.colorImage}
        selectedStyle={selectedItem.style}
        selectedColor={selectedItem.color}
        onBack={() => setSelectedItem(null)}
        showBeforeAfter={true}
      />
    );
  }

  return (
    <div className="text-black">
      <div className="flex gap-3 mb-6">
        <p className="text-lg font-semibold">Recent Activity</p>
      </div>

      {gallery.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 gap-3">
          <div className="w-14 h-14 flex items-center justify-center">
            <Image
              src="/svgs/empty-History.svg"
              alt="empty-gallery"
              width={100}
              height={100}
            />
          </div>
          <p className="text-[15px] font-medium text-[#1E1E1E]">
            Nothing Here Yet
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {gallery.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedItem(item)}
              className="rounded-2xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-[#F4A261]"
            >
              <div className="aspect-square rounded-xl overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={`gallery-${index}`}
                  width={300}
                  height={300}
                  unoptimized
                  className="w-full h-full object-cover"
                />
              </div>
              {/* <div className="px-1 pt-1">
                {/* <span className="text-[11px] text-[#F4A261] font-medium capitalize">
                  {item.designType}
                </span>
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyGallery;
