"use client";

import Image from "next/image";
import GeneratedResult from "./GeneratedResult";
import { useState } from "react";
import { EXPLORE_IMAGES } from "./Explore";

const Home = ({
  handleSectionChange,
  handlePremiumSection,
  setActiveSection,
  setActiveSubTab,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const firstEightImages = EXPLORE_IMAGES.slice(0, 8);
  const features = [
    {
      label: "Interior Design",
      image: "/images/Interior-Design.png",
      onClick: (fns) => fns.handlePremiumSection("interior-design"),
      isPremium: true,
    },
    {
      label: "Exterior Design",
      image: "/images/Exterior-Design.png",
      onClick: (fns) => fns.handleSectionChange("exterior-design"),
      isPremium: false,
    },
    {
      label: "Garden Design",
      image: "/images/Garden-Design.png",
      onClick: (fns) => fns.handlePremiumSection("garden-design"),
      isPremium: true,
    },
    {
      label: "Floor ReStyle",
      image: "/images/Floor-ReStyle.png",
      onClick: (fns) => fns.handlePremiumSection("floor-restyle"),
      isPremium: true,
    },
    {
      label: "Repaint",
      image: "/images/Repaint.png",
      onClick: (fns) => fns.handleSectionChange("repaint"),
      isPremium: false,
    },
  ];

  if (selectedImage) {
    return (
      <GeneratedResult
        generatedImage={selectedImage.src}
        onBack={() => setSelectedImage(null)}
        showBeforeAfter={false}
      />
    );
  }

  return (
    <div className="space-y-2">
      <h4 className="text-[16px] font-semibold text-[#1E1E1E]">
        Select an Option
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            onClick={() =>
              feature.onClick({ handleSectionChange, handlePremiumSection })
            }
            className="relative rounded-3xl overflow-hidden cursor-pointer group"
          >
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={feature.image}
                alt={feature.label}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-5 left-10 right-10 md:left-10 md:right-10 lg:left-10 lg:right-10 xl:left-20 xl:right-20 flex justify-between">
              <span className="bg-[#F3F3F3] text-black text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">
                Before
              </span>

              <span className="bg-[#F3F3F3] text-black text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">
                After
              </span>
            </div>

            <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 flex justify-center">
              <button className="flex cursor-pointer items-center bg-white/10 backdrop-blur-md text-white font-medium px-2 py-2 sm:py-2.5 md:py-1.5 rounded-full border border-white/20 hover:bg-white/20 transition w-[90%]">
                <span className="text-[11px] sm:text-[14px] font-semibold drop-shadow whitespace-nowrap truncate ml-2">
                  {feature.label}
                </span>

                <span className="flex items-center justify-center rounded-full bg-[#F4A261] w-5 h-5 sm:w-8 sm:h-8 flex-shrink-0 ml-auto">
                  <Image
                    src="/svgs/home-imag-arrow.svg"
                    alt="Arrow"
                    width={10}
                    height={10}
                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3"
                  />
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-[16px] font-semibold text-[#1E1E1E]">
            Explore Ideas
          </h4>

          <button
            onClick={() => handleSectionChange("explore")}
            className="text-sm font-medium cursor-pointer text-[#F4A261] hover:underline"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {firstEightImages.map((img) => (
            <div
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className="relative rounded-2xl overflow-hidden cursor-pointer aspect-square border-2 border-transparent hover:border-gray-300 transition"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
