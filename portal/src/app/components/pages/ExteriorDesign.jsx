"use client";
import { AppContext } from "@/context/Appcontext";
import Image from "next/image";
import { useState, useRef, useContext } from "react";
import GeneratedResult from "./GeneratedResult";
import HomeAuraLoadingScreen from "../HomeAuraLoadingScreen";
const rooms = [
  { label: "Home", icon: "/images/EXTERIOR/Building/Home.png" },
  { label: "Apartment", icon: "/images/EXTERIOR/Building/Apartment.png" },
  { label: "Office", icon: "/images/EXTERIOR/Building/Office.png" },
  { label: "Villa", icon: "/images/EXTERIOR/Building/Villa.png" },
  { label: "Farmhouse", icon: "/images/EXTERIOR/Building/Farmhouse.png" },
  { label: "Restaurant", icon: "/images/EXTERIOR/Building/Restaurant.png" },
  { label: "Shop", icon: "/images/EXTERIOR/Building/Shop.png" },
  {
    label: "Commercial Plaza",
    icon: "/images/EXTERIOR/Building/Commercial-Plaza.png",
  },
];

const styles = [
  { label: "Surprise Me", image: "/images/EXTERIOR/Style/Surprise-Me.png" },
  { label: "Modern", image: "/images/EXTERIOR/Style/Modern.png" },
  { label: "Mediterranean", image: "/images/EXTERIOR/Style/Mediterranean.png" },
  { label: "Minimalist", image: "/images/EXTERIOR/Style/Minimalist.png" },
  { label: "Rustic", image: "/images/EXTERIOR/Style/Rustic.png" },
  { label: "Scandinavian", image: "/images/EXTERIOR/Style/Scandinavian.png" },
  { label: "Industrial", image: "/images/EXTERIOR/Style/Industrial.png" },
  { label: "Colonial", image: "/images/EXTERIOR/Style/Colonial.png" },
  { label: "Contemporary", image: "/images/EXTERIOR/Style/Contemporary.png" },
  { label: "Tropical", image: "/images/EXTERIOR/Style/Tropical.png" },
  { label: "Japanese Zen", image: "/images/EXTERIOR/Style/Japanese-Zen.png" },
];

const colors = [
  { label: "Surprise Me", image: "/images/interior/colours/Surprise-Me.png" },
  {
    label: "Millennial Gray",
    image: "/images/interior/colours/Millennial-Gray.png",
  },
  { label: "Forest Hues", image: "/images/interior/colours/Forest-Hues.png" },
  { label: "Neon Sunset", image: "/images/interior/colours/Neon-Sunset.png" },
  {
    label: "Terracotta Mirage",
    image: "/images/interior/colours/Terracotta-Mirage.png",
  },
  {
    label: "Peach Orchard",
    image: "/images/interior/colours/Peach-Orchard.png",
  },
  { label: "Urban Slate", image: "/images/interior/colours/Urban-Slate.png" },
  {
    label: "Fuschia Blossom",
    image: "/images/interior/colours/Fuschia-Blossom.png",
  },
  { label: "Emerald Gem", image: "/images/interior/colours/Emerald-Gem.png" },
  {
    label: "Pastel Breeze",
    image: "/images/interior/colours/Pastel-Breeze.png",
  },
  { label: "Coastal Calm", image: "/images/interior/colours/Coastal-Calm.png" },
  {
    label: "Modern Rustic",
    image: "/images/interior/colours/Modern-Rustic.png",
  },
  {
    label: "Bronze Harmony",
    image: "/images/interior/colours/Bronze-Harmony.png",
  },
  { label: "Tech Frost", image: "/images/interior/colours/Tech-Frost.png" },
  { label: "Mocha Mood", image: "/images/interior/colours/Mocha-Mood.png" },
  { label: "Aloe Zen", image: "/images/interior/colours/Aloe-Zen.png" },
  { label: "Sunset Clay", image: "/images/interior/colours/Sunset-Clay.png" },
  { label: "Golden Hour", image: "/images/interior/colours/Golden-Hour.png" },
  {
    label: "Lavender Fields",
    image: "/images/interior/colours/Lavender-Fields.png",
  },
  {
    label: "Nordic Minimal",
    image: "/images/interior/colours/Nordic-Minimal.png",
  },
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
  const [selectedRoomImage, setSelectedRoomImage] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedStyleImage, setSelectedStyleImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedColorImage, setSelectedColorImage] = useState(null);
  const [popup, setPopup] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const fileInputRef = useRef(null);
  const roomScrollRef = useRef(null);
  const styleScrollRef = useRef(null);
  const colorScrollRef = useRef(null);
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

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setUploadedFile(null);
    setGeneratedImage(null);
  };

  const scrollToSelected = (ref, selectedLabel, items) => {
    if (!ref.current) return;
    const index = items.findIndex((item) => item.label === selectedLabel);
    if (index === -1) return;
    const container = ref.current;
    const selectedEl = container.children[index];
    if (selectedEl) {
      setTimeout(() => {
        selectedEl.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }, 100);
    }
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
      designType: "exterior",
      roomType: selectedRoom,
      style: selectedStyle,
      color: selectedColor,
      uploadedImage: uploadedImage,
      roomTypeImage: selectedRoomImage,
      styleImage: selectedStyleImage,
      colorImage: selectedColorImage,
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

  const canGenerate =
    uploadedFile && selectedRoom && selectedStyle && selectedColor && !loading;
  if (loading) {
    return <HomeAuraLoadingScreen />;
  }

  if (showResult) {
    return (
      <GeneratedResult
        generatedImage={generatedImage}
        uploadedImage={uploadedImage}
        selectedRoom={selectedRoom}
        selectedRoomImage={selectedRoomImage}
        selectedStyle={selectedStyle}
        selectedStyleImage={selectedStyleImage}
        selectedColor={selectedColor}
        selectedColorImage={selectedColorImage}
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
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-[16px] font-semibold text-[#1E1E1E]">
            Choose Building
          </h4>
          <button
            onClick={() => setPopup("room")}
            className="text-[#F4A261] text-[13px] font-medium cursor-pointer"
          >
            View All &gt;
          </button>
        </div>
        <div
          ref={roomScrollRef}
          className="flex overflow-x-auto scrollbar-hide pb-1 gap-3 snap-x snap-mandatory rounded-2xl px-2"
        >
          {rooms.map((r) => (
            <button
              key={r.label}
              onClick={() => {
                setSelectedRoom(r.label);
                setSelectedRoomImage(r.icon);
              }}
              className="flex flex-col items-center gap-1 cursor-pointer w-[88px] flex-none snap-start"
            >
              <div
                className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition
                ${selectedRoom === r.label ? "border-[#F4A261] shadow-md" : "border-transparent"}`}
              >
                <Image
                  src={r.icon}
                  alt={r.label}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
              <span
                className={`text-[14px] font-medium whitespace-nowrap transition-colors duration-300 ${
                  selectedRoom === r.label
                    ? "bg-clip-text text-transparent bg-gradient-to-r from-[#F4A261] to-[#E07A5F]"
                    : "text-[#1E1E1E]"
                }`}
              >
                {" "}
                {r.label}
              </span>
            </button>
          ))}
        </div>
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
                className={`text-[14px] font-medium whitespace-nowrap transition-colors duration-300 ${
                  selectedStyle === s.label
                    ? "bg-clip-text text-transparent bg-gradient-to-r from-[#F4A261] to-[#E07A5F]"
                    : "text-[#1E1E1E]"
                }`}
              >
                {" "}
                {s.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between  mb-4">
          <h4 className="text-[16px] font-semibold text-[#1E1E1E]">
            Select Color
          </h4>
          <button
            onClick={() => setPopup("color")}
            className="text-[#F4A261] text-[13px] font-medium cursor-pointer"
          >
            View All &gt;
          </button>
        </div>
        <div
          ref={colorScrollRef}
          className="flex overflow-x-auto scrollbar-hide pb-1 gap-3 snap-x snap-mandatory rounded-2xl px-2"
        >
          {colors.map((c) => (
            <button
              key={c.label}
              onClick={() => {
                setSelectedColor(c.label);
                setSelectedColorImage(c.image);
              }}
              className="flex flex-col items-center gap-1 cursor-pointer w-[88px] flex-none snap-start"
            >
              <div
                className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition
                ${selectedColor === c.label ? "border-[#F4A261] shadow-md" : "border-transparent"}`}
              >
                <Image
                  src={c.image}
                  alt={c.label}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
              <span
                className={`text-[14px] font-medium text-center leading-tight max-w-[64px] transition-colors duration-300 ${
                  selectedColor === c.label
                    ? "bg-clip-text text-transparent bg-gradient-to-r from-[#F4A261] to-[#E07A5F]"
                    : "text-[#1E1E1E]"
                }`}
              >
                {" "}
                {c.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={!canGenerate}
        className={`w-full py-2.5 rounded-full font-semibold text-[24px] text-[#F3F3F3] transition mt-4 flex items-center justify-center gap-2
         ${canGenerate ? "bg-gradient-to-r from-[#F4A261] to-[#E07A5F] cursor-pointer" : "bg-gray-300 cursor-not-allowed"}`}
      >
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
      </button>

      {popup === "room" && (
        <ViewAllPopup title="Choose Room" onClose={() => setPopup(null)}>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {rooms.map((r) => (
              <button
                key={r.label}
                onClick={() => {
                  setSelectedRoom(r.label);
                  setSelectedRoomImage(r.icon);
                  setPopup(null);
                  scrollToSelected(roomScrollRef, r.label, rooms);
                }}
                className="flex flex-col items-center gap-1 cursor-pointer"
              >
                <div
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition
                  ${selectedRoom === r.label ? "border-[#F4A261] shadow-md" : "border-transparent"}`}
                >
                  <Image
                    src={r.icon}
                    alt={r.label}
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span
                  className={`text-[14px] font-medium whitespace-nowrap transition-colors duration-300 ${
                    selectedRoom === r.label
                      ? "bg-clip-text text-transparent bg-gradient-to-r from-[#F4A261] to-[#E07A5F]"
                      : "text-[#1E1E1E]"
                  }`}
                >
                  {" "}
                  {r.label}
                </span>
              </button>
            ))}
          </div>
        </ViewAllPopup>
      )}

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
                  className={`text-[14px] font-medium whitespace-nowrap transition-colors duration-300 ${
                    selectedStyle === s.label
                      ? "bg-clip-text text-transparent bg-gradient-to-r from-[#F4A261] to-[#E07A5F]"
                      : "text-[#1E1E1E]"
                  }`}
                >
                  {" "}
                  {s.label}
                </span>
              </button>
            ))}
          </div>
        </ViewAllPopup>
      )}

      {popup === "color" && (
        <ViewAllPopup title="Select Color" onClose={() => setPopup(null)}>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {colors.map((c) => (
              <button
                key={c.label}
                onClick={() => {
                  setSelectedColor(c.label);
                  setSelectedColorImage(c.image);
                  setPopup(null);
                  scrollToSelected(colorScrollRef, c.label, colors);
                }}
                className="flex flex-col items-center gap-1 cursor-pointer"
              >
                <div
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition
                 ${selectedColor === c.label ? "border-[#F4A261] shadow-md" : "border-transparent"}`}
                >
                  <Image
                    src={c.image}
                    alt={c.label}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span
                  className={`text-[14px] font-medium text-center leading-tight max-w-[64px] transition-colors duration-300 ${
                    selectedColor === c.label
                      ? "bg-clip-text text-transparent bg-gradient-to-r from-[#F4A261] to-[#E07A5F]"
                      : "text-[#1E1E1E]"
                  }`}
                >
                  {" "}
                  {c.label}
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
