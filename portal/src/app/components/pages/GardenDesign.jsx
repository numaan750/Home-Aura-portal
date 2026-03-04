"use client";
import { AppContext } from "@/context/Appcontext";
import Image from "next/image";
import { useState, useRef, useContext } from "react";
import GeneratedResult from "./GeneratedResult";
import HomeAuraLoadingScreen from "../HomeAuraLoadingScreen";
const rooms = [
  { label: "Backyard ", icon: "/images/Garden/choose-garden/Backyard.png" },
  { label: "Front Yard", icon: "/images/Garden/choose-garden/Front-Yard.png" },
  { label: "Terrace", icon: "/images/Garden/choose-garden/Terrace.png" },
  { label: "Courtyard", icon: "/images/Garden/choose-garden/Courtyard.png" },
  { label: "Pathway", icon: "/images/Garden/choose-garden/Pathway-garden.png" },
  {
    label: "Play Ground",
    icon: "/images/Garden/choose-garden/Play-Ground.png",
  },
];

const styles = [
  { label: "Surprise Me", image: "/images/Garden/style/surprise-me.png" },
  { label: "Modern", image: "/images/Garden/Style/modern.png" },
  { label: "Contemporary", image: "/images/Garden/Style/contemporary.png" },
  { label: "Minimalist", image: "/images/Garden/Style/minimalist.png" },
  { label: "Traditional", image: "/images/Garden/Style/traditional.png" },
  { label: "Transitional", image: "/images/Garden/Style/Transitiona.png" },
  { label: "Scandinavian", image: "/images/Garden/Style/scandinavian.png" },
  { label: "Industrial", image: "/images/Garden/Style/industrial.png" },
  { label: "Bohemian", image: "/images/Garden/Style/bohemian.png" },
  { label: "Rustic", image: "/images/Garden/Style/rustic.png" },
  { label: "Coastal", image: "/images/Garden/Style/coastal.png" },
  { label: "Eclectic", image: "/images/Garden/Style/eclectic.png" },
  { label: "Art Deco", image: "/images/Garden/Style/art-deco.png" },
  { label: "Japandi", image: "/images/Garden/Style/japandi.png" },
  { label: "Urban", image: "/images/Garden/Style/urban.png" },
  { label: "Luxury / Glam", image: "/images/Garden/Style/Glam.png" },
];

// const colors = [
//   {
//     label: "Surprise Me",
//     swatches: ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF"],
//   },
//   {
//     label: "Millennial Gray",
//     swatches: ["#9E9E9E", "#BDBDBD", "#757575", "#424242"],
//   },
//   {
//     label: "Forest Hues",
//     swatches: ["#2D6A4F", "#74C69D", "#B7E4C7", "#1B4332"],
//   },
//   {
//     label: "Neon Sunset",
//     swatches: ["#FF006E", "#FB5607", "#FFBE0B", "#8338EC"],
//   },
//   {
//     label: "Terracotta Mirage",
//     swatches: ["#C97D4E", "#E9C46A", "#F4A261", "#E76F51"],
//   },
//   {
//     label: "Peach Orchard",
//     swatches: ["#FFDDD2", "#FFBBA6", "#FF8C61", "#E05D2B"],
//   },
//   {
//     label: "Urban Slate",
//     swatches: ["#2B2D42", "#8D99AE", "#EDF2F4", "#EF233C"],
//   },
//   {
//     label: "Fuschia Blossom",
//     swatches: ["#FF00FF", "#DA00FF", "#A100FF", "#FF6FFF"],
//   },
//   {
//     label: "Emerald Gem",
//     swatches: ["#004E64", "#00A5CF", "#9FFFCB", "#25A18E"],
//   },
//   {
//     label: "Pastel Breeze",
//     swatches: ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF"],
//   },
//   {
//     label: "Coastal Calm",
//     swatches: ["#C2B280", "#E8D8B0", "#A0906D", "#7A6950"],
//   },
//   {
//     label: "Modern Rustic",
//     swatches: ["#E6CCFF", "#C89FE0", "#9B59B6", "#6C3483"],
//   },
//   {
//     label: "Bronze Harmony",
//     swatches: ["#0077B6", "#00B4D8", "#90E0EF", "#CAF0F8"],
//   },
//   {
//     label: "Tech Frost",
//     swatches: ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF"],
//   },
//   {
//     label: "Mocha Mood",
//     swatches: ["#FFD700", "#FFA500", "#FF4500", "#FF0000"],
//   },
//   { label: "Aloe Zen", swatches: ["#1E1E1E", "#2B2B2B", "#3C3C3C", "#4D4D4D"] },
//   {
//     label: "Sunset Clay",
//     swatches: ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF"],
//   },
//   {
//     label: "Golden Hour",
//     swatches: ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF"],
//   },
//   {
//     label: "Lavender Fields",
//     swatches: ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF"],
//   },
//   {
//     label: "Nordic Minimal",
//     swatches: ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF"],
//   },
// ];

const colors = [
  { label: "Surprise Me", image: "/images/interior/colours/surprise-me.png" },
  {
    label: "Millennial Gray",
    image: "/images/interior/colours/millennial-gray.png",
  },
  { label: "Forest Hues", image: "/images/interior/colours/forest-hues.png" },
  { label: "Neon Sunset", image: "/images/interior/colours/neon-sunset.png" },
  {
    label: "Terracotta Mirage",
    image: "/images/interior/colours/terracotta-mirage.png",
  },
  {
    label: "Peach Orchard",
    image: "/images/interior/colours/peach-orchard.png",
  },
  { label: "Urban Slate", image: "/images/interior/colours/urban-slate.png" },
  {
    label: "Fuschia Blossom",
    image: "/images/interior/colours/fuschia-blossom.png",
  },
  { label: "Emerald Gem", image: "/images/interior/colours/emerald-gem.png" },
  {
    label: "Pastel Breeze",
    image: "/images/interior/colours/pastel-breeze.png",
  },
  { label: "Coastal Calm", image: "/images/interior/colours/coastal-calm.png" },
  {
    label: "Modern Rustic",
    image: "/images/interior/colours/modern-rustic.png",
  },
  {
    label: "Bronze Harmony",
    image: "/images/interior/colours/bronze-harmony.png",
  },
  { label: "Tech Frost", image: "/images/interior/colours/tech-frost.png" },
  { label: "Mocha Mood", image: "/images/interior/colours/mocha-mood.png" },
  { label: "Aloe Zen", image: "/images/interior/colours/aloe-zen.png" },
  { label: "Sunset Clay", image: "/images/interior/colours/sunset-clay.png" },
  { label: "Golden Hour", image: "/images/interior/colours/golden-hour.png" },
  {
    label: "Lavender Fields",
    image: "/images/interior/colours/lavender-fields.png",
  },
  {
    label: "Nordic Minimal",
    image: "/images/interior/colours/nordic-minimal.png",
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
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [popup, setPopup] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const fileInputRef = useRef(null);
  const roomScrollRef = useRef(null);
  const styleScrollRef = useRef(null);
  const colorScrollRef = useRef(null);
  const [selectedRoomImage, setSelectedRoomImage] = useState(null);
  const [selectedStyleImage, setSelectedStyleImage] = useState(null);
  const [selectedColorImage, setSelectedColorImage] = useState(null);

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

  // Replace old handleGenerate with:
  const handleGenerate = async () => {
    if (!uploadedFile) return;

    if (!isPremium && credits <= 0) {
      onMessageSent?.();
      return;
    }

    setLoading(true);

    const result = await generateDesign({
      designType: "garden",
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
        selectedStyle={selectedStyle}
        selectedColor={selectedColor}
        selectedRoomImage={selectedRoomImage}
        selectedStyleImage={selectedStyleImage}
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
            Choose Garden
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
                className={`text-[14px] font-medium whitespace-nowrap transition-colors duration-300 ${selectedRoom === r.label ? "bg-clip-text text-transparent bg-gradient-to-r from-[#F4A261] to-[#E07A5F]" : "text-[#1E1E1E]"}`}
              >
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
                className={`text-[14px] font-medium whitespace-nowrap transition-colors duration-300 ${selectedStyle === s.label ? "bg-clip-text text-transparent bg-gradient-to-r from-[#F4A261] to-[#E07A5F]" : "text-[#1E1E1E]"}`}
              >
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
                className={`text-[14px] font-medium text-center leading-tight max-w-[64px] transition-colors duration-300 ${selectedColor === c.label ? "bg-clip-text text-transparent bg-gradient-to-r from-[#F4A261] to-[#E07A5F]" : "text-[#1E1E1E]"}`}
              >
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
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span
                  className={`text-[14px] font-medium whitespace-nowrap transition-colors duration-300 ${selectedRoom === r.label ? "bg-clip-text text-transparent bg-gradient-to-r from-[#F4A261] to-[#E07A5F]" : "text-[#1E1E1E]"}`}
                >
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
                  className={`text-[14px] font-medium whitespace-nowrap transition-colors duration-300 ${selectedStyle === s.label ? "bg-clip-text text-transparent bg-gradient-to-r from-[#F4A261] to-[#E07A5F]" : "text-[#1E1E1E]"}`}
                >
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
                  className={`text-[14px] font-medium text-center leading-tight max-w-[64px] transition-colors duration-300 ${selectedColor === c.label ? "bg-clip-text text-transparent bg-gradient-to-r from-[#F4A261] to-[#E07A5F]" : "text-[#1E1E1E]"}`}
                >
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
