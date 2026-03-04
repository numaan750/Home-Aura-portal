"use client";
import Image from "next/image";
import { useState } from "react";

const GeneratedResult = ({
  generatedImage,
  uploadedImage,
  selectedRoom,
  selectedRoomImage,
  selectedStyle,
  selectedStyleImage,
  selectedColor,
  selectedColorImage,
  onBack,
  onSave,
  showBeforeAfter = true,
}) => {
  const [showComparison, setShowComparison] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const handleDownload = async () => {
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      if (window.showSaveFilePicker) {
        const fileHandle = await window.showSaveFilePicker({
          suggestedName: "home-aura-design.jpg",
          types: [
            {
              description: "JPEG Image",
              accept: { "image/jpeg": [".jpg", ".jpeg"] },
            },
          ],
        });
        const writable = await fileHandle.createWritable();
        await writable.write(blob);
        await writable.close();
      } else {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = "home-aura-design.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Download failed:", error);
        alert("Download nahi ho saka, dobara try karein.");
      }
    }
  };
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: "Home Aura Design", url: generatedImage });
    } else {
      alert("Share not supported on this browser");
    }
  };
  return (
    <div className="flex flex-col h-full  gap-5 p-2 pb-6 items-center">
      <div
        className="w-full max-w-full h-[250px] md:h-[430px] mx-auto rounded-3xl border-2 border-[#F4A261] relative flex-shrink-0 overflow-hidden cursor-ew-resize select-none bg-gradient-to-br from-[#F4A261]/20 to-[#E07A5F]/20"
        onMouseMove={(e) => {
          if (!isDragging) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const pct = Math.min(Math.max((x / rect.width) * 100, 0), 100);
          setSliderPosition(pct);
        }}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onTouchMove={(e) => {
          if (!isDragging) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.touches[0].clientX - rect.left;
          const pct = Math.min(Math.max((x / rect.width) * 100, 0), 100);
          setSliderPosition(pct);
        }}
        onTouchEnd={() => setIsDragging(false)}
      >
        <img
          src={generatedImage}
          alt="After"
          className="absolute inset-0 w-full h-full object-contain rounded-3xl"
        />
        {showComparison && uploadedImage && (
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img
              src={uploadedImage}
              alt="Before"
              className="absolute inset-0 w-full h-full object-contain rounded-3xl"
            />
          </div>
        )}
        {showComparison && (
          <>
            <span className="absolute top-3 left-3 bg-white/80 text-black text-[11px] font-medium px-3 py-1 rounded-full z-20">
              Before
            </span>
            <span className="absolute top-3 right-3 bg-white/80 text-black text-[11px] font-medium px-3 py-1 rounded-full z-20">
              After
            </span>
          </>
        )}
        {showComparison && (
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
            style={{ left: `${sliderPosition}%` }}
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center cursor-ew-resize border-2 border-[#F4A261]"
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#F4A261"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12H3" />
                <path d="m15 18 6-6-6-6" />
                <path d="m9 6-6 6 6 6" />
              </svg>
            </div>
          </div>
        )}
        {showBeforeAfter && (
          <button
            onClick={() => {
              setShowComparison(!showComparison);
              setSliderPosition(50);
            }}
            className="absolute bottom-3 right-3 w-14 h-14 cursor-pointer"
          >
            <Image
              src="/svgs/Compare-Icon.svg"
              alt="compare"
              width={20}
              height={20}
            />
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-3 w-full max-w-full flex-shrink-0">
        {selectedRoom && (
          <span className="border border-[#F4A261] text-[#1E1E1E] text-[13px] font-medium px-3 py-1.5 rounded-full flex items-center gap-2">
            {selectedRoomImage && (
              <img
                src={selectedRoomImage}
                alt={selectedRoom}
                className="w-5 h-5 object-contain rounded"
              />
            )}
            {selectedRoom}
          </span>
        )}
        {selectedStyle && (
          <span className="border border-[#F4A261] text-[#1E1E1E] text-[13px] font-medium px-3 py-1.5 rounded-full flex items-center gap-2">
            {selectedStyleImage && (
              <img
                src={selectedStyleImage}
                alt={selectedStyle}
                className="w-5 h-5 object-cover rounded"
              />
            )}
            {selectedStyle}
          </span>
        )}
        {selectedColor && (
          <span className="border border-[#F4A261] text-[#1E1E1E] text-[13px] font-medium px-3 py-1.5 rounded-full flex items-center gap-2">
            {selectedColorImage &&
              (selectedColorImage.startsWith("#") ? (
                <div
                  className="w-5 h-5 rounded"
                  style={{ backgroundColor: selectedColorImage }}
                />
              ) : (
                <img
                  src={selectedColorImage}
                  alt={selectedColor}
                  className="w-5 h-5 object-cover rounded"
                />
              ))}
            {selectedColor}
          </span>
        )}
      </div>
      <div className="flex-1" />
      <div className="flex gap-4 w-full max-w-[700px] flex-shrink-0">
        <button
          onClick={handleDownload}
          className="flex-1 py-3 rounded-full bg-gradient-to-r from-[#F4A261] to-[#E07A5F] text-white font-semibold flex items-center justify-center gap-2 cursor-pointer hover:opacity-90 transition"
        >
          <Image
            src="/svgs/Save-button-Icon.svg"
            alt="save"
            width={18}
            height={18}
            className="object-contain"
          />
          Save
        </button>
        <button
          onClick={handleShare}
          className="flex-1 py-3 rounded-full bg-gradient-to-r from-[#F4A261] to-[#E07A5F] text-white font-semibold flex items-center justify-center gap-2 cursor-pointer hover:opacity-90 transition"
        >
          <Image
            src="/svgs/Share-Button-icon.svg"
            alt="share"
            width={18}
            height={18}
            className="object-contain"
          />
          Share
        </button>
      </div>
    </div>
  );
};

export default GeneratedResult;
