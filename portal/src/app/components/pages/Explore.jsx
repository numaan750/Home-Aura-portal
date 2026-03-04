"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import GeneratedResult from "./GeneratedResult";

const AI_TOOLS = [
  {
    id: "all",
    label: "All Features",
    img: "/images/Explore-Ai/All-Features.png",
  },
  {
    id: "interior",
    label: "Interior Design",
    img: "/images/Explore-Ai/Interior-Design.png",
  },
  {
    id: "exterior",
    label: "Exterior Design",
    img: "/images/Explore-Ai/Exterior-Design.png",
  },
  {
    id: "garden",
    label: "Garden Design",
    img: "/images/Explore-Ai/Garden-Design.png",
  },
  { id: "paint", label: "Paint", img: "/images/Explore-Ai/Paint.png" },
  {
    id: "floor",
    label: "Floor ReStyle",
    img: "/images/Explore-Ai/Floor-ReStyle.png",
  },
];
export const EXPLORE_IMAGES = [
  {
    id: 1,
    src: "/images/Exlore/interior-home-aura-1.png",
    alt: "Interior 1",
    category: "interior",
  },
  {
    id: 2,
    src: "/images/Exlore/exterior-home-aura-1.png",
    alt: "Exterior 1",
    category: "exterior",
  },
  {
    id: 3,
    src: "/images/Exlore/interior-home-aura-2.png",
    alt: "Floor 1",
    category: "interior",
  },
  {
    id: 4,
    src: "/images/Exlore/garden-home-aura-1.png",
    alt: "Exterior 2",
    category: "garden",
  },
  {
    id: 5,
    src: "/images/Exlore/interior-home-aura-3.png",
    alt: "Kitchen 1",
    category: "interior",
  },
  {
    id: 6,
    src: "/images/Exlore/floor-home-aura-1.png",
    alt: "Kitchen 2",
    category: "floor",
  },
  {
    id: 7,
    src: "/images/Exlore/garden-home-aura-2.png",
    alt: "Bathroom 1",
    category: "garden",
  },
  {
    id: 8,
    src: "/images/Exlore/interior-home-aura-4.png",
    alt: "Bedroom 1",
    category: "interior",
  },
  {
    id: 9,
    src: "/images/Exlore/paint-home-aura-2.png",
    alt: "Living Room 1",
    category: "paint",
  },
  {
    id: 10,
    src: "/images/Exlore/exterior-home-aura-2.png",
    alt: "Garden 1",
    category: "exterior",
  },
  {
    id: 11,
    src: "/images/Exlore/exterior-home-aura-3.png",
    alt: "Exterior 3",
    category: "exterior",
  },
  {
    id: 12,
    src: "/images/Exlore/interior-home-aura-5.png",
    alt: "Interior 2",
    category: "interior",
  },
  {
    id: 13,
    src: "/images/Exlore/floor-home-aura-2.png",
    alt: "Bedroom 2",
    category: "floor",
  },
  {
    id: 14,
    src: "/images/Exlore/interior-home-aura-6.png",
    alt: "Garden 2",
    category: "interior",
  },
  {
    id: 15,
    src: "/images/Exlore/floor-home-aura-3.png",
    alt: "Living Room 2",
    category: "floor",
  },
  {
    id: 16,
    src: "/images/Exlore/floor-home-aura-6.png",
    alt: "Exterior 4",
    category: "floor",
  },
  {
    id: 17,
    src: "/images/Exlore/interior-home-aura-7.png",
    alt: "Interior 3",
    category: "interior",
  },
  {
    id: 18,
    src: "/images/Exlore/floor-home-aura-4.png",
    alt: "Exterior 5",
    category: "floor",
  },
  {
    id: 19,
    src: "/images/Exlore/garden-home-aura-3.png",
    alt: "Interior 4",
    category: "garden",
  },
  {
    id: 20,
    src: "/images/Exlore/paint-home-aura-1.png",
    alt: "Bedroom 3",
    category: "paint",
  },
  {
    id: 21,
    src: "/images/Exlore/exterior-home-aura-5.png",
    alt: "Bathroom 2",
    category: "exterior",
  },
  {
    id: 22,
    src: "/images/Exlore/exterior-home-aura-4.png",
    alt: "Bedroom 4",
    category: "exterior",
  },
  {
    id: 23,
    src: "/images/Exlore/garden-home-aura-5.png",
    alt: "Floor 2",
    category: "garden",
  },
  {
    id: 24,
    src: "/images/Exlore/garden-home-aura-4.png",
    alt: "Exterior 6",
    category: "garden",
  },
  {
    id: 25,
    src: "/images/Exlore/floor-home-aura-5.png",
    alt: "Interior 5",
    category: "floor",
  },
];

export default function AiToolsExplore({ resetExplore }) {
  const [activeTool, setActiveTool] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setSelectedImage(null);
  }, [resetExplore]);

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };

  const filteredImages =
    activeTool === "all"
      ? EXPLORE_IMAGES
      : EXPLORE_IMAGES.filter((img) => img.category === activeTool);

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
    <div className=" min-h-screen px-4 py-5">
      <h2 className="text-[16px] font-semibold text-gray-900 mb-3">Ai Tools</h2>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide w-full">
        {AI_TOOLS.map((tool) => {
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className="flex flex-col items-center flex-shrink-0 focus:outline-none group"
            >
              <div
                className={`relative w-16 h-16 sm:w-18 sm:h-18 md:w-24 md:h-24 lg:w-30 lg:h-30 cursor-pointer

                  rounded-2xl overflow-hidden border-2 transition-all duration-200
                  ${isActive ? "border-orange-400 shadow-md" : "border-transparent"}`}
              >
                <Image
                  src={tool.img}
                  alt={tool.label}
                  fill
                  sizes="90px"
                  className="object-cover"
                />
              </div>

              <span
                className={`mt-1.5 text-center text-[11px] sm:text-[12px] leading-tight font-medium transition-colors
                  ${isActive ? "text-orange-500" : "text-gray-700"}`}
              >
                {tool.label}
              </span>
            </button>
          );
        })}
      </div>
      <h2 className="text-[16px] font-semibold text-gray-900 mt-6 mb-3">
        Explore Ideas
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
        {filteredImages.map((img) => {
          return (
            <div
              key={img.id}
              onClick={() => handleImageClick(img)}
              className="relative rounded-2xl overflow-hidden cursor-pointer
               aspect-square
               border-2 border-transparent hover:border-gray-300 transition-all duration-200"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                className="object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
