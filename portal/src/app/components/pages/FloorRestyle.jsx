"use client";
import { AppContext } from "@/context/Appcontext";
import Image from "next/image";
import { useState, useRef, useContext } from "react";
import GeneratedResult from "./GeneratedResult";
import HomeAuraLoadingScreen from "../HomeAuraLoadingScreen";
const styles = [
  { label: "Surprise Me", image: "/images/FLOOR/Style/Surprise-Me.png" },
  {
    label: "Hardwood Flooring",
    image: "/images/FLOOR/Style/Hardwood-Flooring.png",
  },
  {
    label: "Engineered Wood",
    image: "/images/FLOOR/Style/Engineered-Wood.png",
  },
  {
    label: "Laminate Flooring",
    image: "/images/FLOOR/Style/Laminate-Flooring.png",
  },
  { label: "Vinyl Flooring", image: "/images/FLOOR/Style/Vinyl-Flooring.png" },
  {
    label: "Marble Flooring",
    image: "/images/FLOOR/Style/Marble-Flooring.png",
  },
  { label: "Ceramic Tiles", image: "/images/FLOOR/Style/Ceramic-Tiles.png" },
  {
    label: "Porcelain Tiles",
    image: "/images/FLOOR/Style/Porcelain-Tiles.png",
  },
  {
    label: "Terrazzo Flooring",
    image: "/images/FLOOR/Style/Terrazzo-Flooring.png",
  },
  {
    label: "Concrete Flooring",
    image: "/images/FLOOR/Style/Concrete-Flooring.png",
  },
  {
    label: "Carpet Flooring",
    image: "/images/FLOOR/Style/Carpet-Flooring.png",
  },
  {
    label: "Bamboo Flooring",
    image: "/images/FLOOR/Style/Bamboo-Flooring.png",
  },
  { label: "Cork Flooring", image: "/images/FLOOR/Style/Cork-Flooring.png" },
  { label: "Stone Flooring", image: "/images/FLOOR/Style/Stone-Flooring.png" },
];

const ViewAllPopup = ({ title, children, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div className="bg-white rounded-3xl w-full max-w-lg max-h-[80vh] flex flex-col shadow-2xl">
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <h3 className="text-[18px] font-bold text-[#1E1E1E]">{title}</h3>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition cursor-pointer text-gray-600 font-bold"
        >
          ✕
        </button>
      </div>
      <div className="overflow-y-auto p-5 scrollbar-hide">{children}</div>
    </div>
  </div>
);

const InteriorDesign = ({ onMessageSent }) => {
  const { generateDesign, isPremium, credits } = useContext(AppContext);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedStyleImage, setSelectedStyleImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [popup, setPopup] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const fileInputRef = useRef(null);
  const styleScrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    setUploadedFile(file);
    setUploadedImage(URL.createObjectURL(file));
    setGeneratedImage(null);
  };

  const scrollToSelected = (ref, selectedLabel, items) => {
    if (!ref.current) return;
    const index = items.findIndex((item) => item.label === selectedLabel);
    if (index === -1) return;
    setTimeout(() => {
      const el = ref.current.children[index];
      if (el)
        el.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
    }, 100);
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setUploadedFile(null);
    setGeneratedImage(null);
  };

  const openFilePicker = () => {
    if (!uploadedImage) {
      fileInputRef.current?.click();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadedFile(file);
    setUploadedImage(URL.createObjectURL(file));
    setGeneratedImage(null);
  };
  const handleGenerate = async () => {
    if (!uploadedFile) return;

    if (!isPremium && credits <= 0) {
      onMessageSent?.();
      return;
    }

    setLoading(true);

    const result = await generateDesign({
      designType: "floor",
      roomType: selectedRoom,
      style: selectedStyle,
      color: selectedColor,
      uploadedImage: uploadedImage,
      styleImage: selectedStyleImage,
    });

    if (result?.needsPremium) {
      setLoading(false);
      onMessageSent?.();
      return;
    }

    if (result?.imageUrl) {
      setGeneratedImage(result.imageUrl);
      setShowResult(true);
    }

    setLoading(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = "interior-design.jpg";
    link.click();
  };

  const handleSaveToGallery = async () => {
    alert("Saved to Gallery!");
  };

  const canGenerate = uploadedFile && selectedStyle && !loading;
  if (loading) {
    return <HomeAuraLoadingScreen />;
  }
  if (showResult) {
    return (
      <GeneratedResult
        generatedImage={generatedImage}
        uploadedImage={uploadedImage}
        selectedStyle={selectedStyle}
        selectedStyleImage={selectedStyleImage}
        onBack={() => {
          setShowResult(false);
          setGeneratedImage(null);
        }}
        onSave={() => alert("Saved to Gallery!")}
      />
    );
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-hide gap-4 p-2 pb-6">
      <div>
        <h4 className="text-[16px] font-semibold text-[#1E1E1E] mb-2">
          Add A Photo
        </h4>
      </div>
      <div
        onClick={openFilePicker}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center bg-gradient-to-b from-[#F4A261]/20 to-[#E07A5F]/20 border-2 border-[#F4A261] rounded-3xl p-15 mb-4 ${
          uploadedImage ? "" : "cursor-pointer"
        }`}
      >
        {" "}
        {uploadedImage ? (
          <div className="relative">
            <img
              src={uploadedImage}
              alt="uploaded"
              className="max-h-52 rounded-xl object-contain"
            />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleRemoveImage();
              }}
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-black/70 text-white text-sm flex items-center justify-center hover:bg-black cursor-pointer"
            >
              ✕
            </button>
          </div>
        ) : (
          <>
            <p className="text-black font-bold text-[16px] mb-2">
              Start Redesigning
            </p>
            <p className="text-[#4B4B4B] text-[13px] mb-2">
              Redesign & Beautify Your Home & office
            </p>
            <span className="flex items-center gap-2 border border-[#F3F3F3] bg-[#F3F3F3] rounded-full px-4 py-2 text-[13px] font-medium text-[#1E1E1E]">
              <Image
                src="/svgs/Upload-image-icon.svg"
                alt="upload"
                width={16}
                height={16}
                className="object-contain shrink-0"
              />
              Upload Photo
            </span>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>
      <div>
        <div className="flex items-center justify-between  mb-4">
          <h4 className="text-[16px] font-semibold text-[#1E1E1E]">
            Select Style
          </h4>
          <button
            onClick={() => setPopup("style")}
            className="text-[#F4A261] text-[13px] font-medium cursor-pointer"
          >
            View All &gt;
          </button>
        </div>
        <div
          ref={styleScrollRef}
          className="flex overflow-x-auto scrollbar-hide pb-1 gap-3 snap-x snap-mandatory rounded-2xl px-2"
        >
          {styles.map((s) => (
            <button
              key={s.label}
              onClick={() => {
                setSelectedStyle(s.label);
                setSelectedStyleImage(s.image);
              }}
              className="flex flex-col items-center gap-1 cursor-pointer w-[88px] flex-none snap-start"
            >
              <div
                className={`w-20 h-20 rounded-2xl overflow-hidden transition border-2
               ${selectedStyle === s.label ? "border-[#F4A261] shadow-md" : "border-transparent"}`}
              >
                <Image
                  src={s.image}
                  alt={s.label}
                  width={80}
                  height={80}
                  className="object-containe w-full h-full"
                />
              </div>
              <span
                className={`text-[14px] font-medium transition-colors duration-300 ${selectedStyle === s.label ? "bg-clip-text text-transparent bg-gradient-to-r from-[#F4A261] to-[#E07A5F]" : "text-[#1E1E1E]"}`}
              >
                {s.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={!canGenerate}
        className={`w-full py-2.5 rounded-full font-semibold text-[24px] text-[#F3F3F3] transition mt-4 flex items-center justify-center gap-2
       ${canGenerate ? "bg-gradient-to-r from-[#F4A261] to-[#E07A5F] cursor-pointer " : "bg-gray-300 cursor-not-allowed"}`}
      >
        {loading ? (
          "Generating..."
        ) : (
          <>
            <Image
              src="/svgs/generate-icon.svg"
              alt="Generate"
              width={24}
              height={24}
              className="object-contain"
            />
            Generate
          </>
        )}
      </button>
      {popup === "style" && (
        <ViewAllPopup title="Select Style" onClose={() => setPopup(null)}>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {styles.map((s) => (
              <button
                key={s.label}
                onClick={() => {
                  setSelectedStyle(s.label);
                  setSelectedStyleImage(s.image);
                  setPopup(null);
                  scrollToSelected(styleScrollRef, s.label, styles);
                }}
                className="flex flex-col items-center gap-1 cursor-pointer"
              >
                <div
                  className={`w-20 h-20 rounded-2xl overflow-hidden transition border-2
                  ${selectedStyle === s.label ? "border-[#F4A261] shadow-md" : "border-transparent"}`}
                >
                  <Image
                    src={s.image}
                    alt={s.label}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span
                  className={`text-[14px] font-medium transition-colors duration-300 ${selectedStyle === s.label ? "bg-clip-text text-transparent bg-gradient-to-r from-[#F4A261] to-[#E07A5F]" : "text-[#1E1E1E]"}`}
                >
                  {s.label}
                </span>
              </button>
            ))}
          </div>
        </ViewAllPopup>
      )}
    </div>
  );
};

export default InteriorDesign;
