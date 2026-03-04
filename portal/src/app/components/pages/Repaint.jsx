"use client";
import { AppContext } from "@/context/Appcontext";
import Image from "next/image";
import { useState, useRef, useContext, useEffect } from "react";
import GeneratedResult from "./GeneratedResult";
import HomeAuraLoadingScreen from "../HomeAuraLoadingScreen";
const rooms = [
  { label: "Wall", icon: "/svgs/paint-svgs/choose-surface/Wall.svg" },
  { label: "Ceiling", icon: "/svgs/paint-svgs/choose-surface/Ceiling.svg" },
  { label: "Sofa", icon: "/svgs/paint-svgs/choose-surface/sofa.svg" },
  { label: "Floor", icon: "/svgs/paint-svgs/choose-surface/Floor.svg" },
  { label: "Door", icon: "/svgs/paint-svgs/choose-surface/Door.svg" },
  { label: "Window Frame", icon: "/svgs/paint-svgs/choose-surface/Window.svg" },
  { label: "Gate", icon: "/svgs/paint-svgs/choose-surface/Gate.svg" },
  { label: "Table", icon: "/svgs/paint-svgs/choose-surface/Table.svg" },
  { label: "Cabinet", icon: "/svgs/paint-svgs/choose-surface/Cabinet.svg" },
  { label: "Rugs", icon: "/svgs/paint-svgs/choose-surface/Rugs.svg" },
];

const colors = [
  {
    label: "Surprise Me",
    swatches: ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF"],
  },
  {
    label: "Pick Color",
    swatches: ["#FF00FF", "#FFFF00", "#00FFFF", "#FF0000"],
    isPicker: true,
  },

  {
    label: "Soft White",
    swatches: ["#F8F8F4"],
  },
  {
    label: "Sage Green",
    swatches: ["#A8BBA2"],
  },
  {
    label: "Terracotta",
    swatches: ["#D88C70"],
  },
  {
    label: "Sandstone",
    swatches: ["#DECBB7"],
  },
  {
    label: "Lavender",
    swatches: ["#C1B2D4"],
  },
  {
    label: "Blush Pink",
    swatches: ["#F4C6C6"],
  },
  {
    label: "Peach Fuzz",
    swatches: ["#FAD7AF"],
  },
  {
    label: "Sunset Coral",
    swatches: ["#F28B81"],
  },
  {
    label: "Pale Aqua",
    swatches: ["#BCE3D4"],
  },
  {
    label: "Charcoal Black",
    swatches: ["#1C1C1C"],
  },
  {
    label: "Navy Blue",
    swatches: ["#2C3E50"],
  },
  {
    label: "Mustard Yellow",
    swatches: ["#D9A441"],
  },
  {
    label: "Sky Blue",
    swatches: ["#B3D7E4"],
  },
  { label: "Emerald Green", swatches: ["#3E826C"] },
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
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedColorHex, setSelectedColorHex] = useState(null);
  const [popup, setPopup] = useState(null);
  const fileInputRef = useRef(null);
  const [pickedColor, setPickedColor] = useState("#1e1e1e");
  const [showResult, setShowResult] = useState(false);
  const colorInputRef = useRef(null);
  const roomScrollRef = useRef(null);
  const colorScrollRef = useRef(null);

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
      designType: "repaint",
      roomType: selectedRoom,
      color: selectedColor,
      uploadedImage: uploadedImage,
      roomTypeImage: selectedRoomImage,
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

  const canGenerate = uploadedFile && selectedRoom && selectedColor && !loading;
  if (loading) {
    return <HomeAuraLoadingScreen />;
  }
  if (showResult) {
    return (
      <GeneratedResult
        generatedImage={generatedImage}
        uploadedImage={uploadedImage}
        selectedRoom={selectedRoom}
        selectedColor={selectedColor}
        selectedRoomImage={selectedRoomImage}
        selectedColorImage={selectedColorHex} 
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
            Choose Surface
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
                className={`w-20 h-20 rounded-2xl flex items-center justify-center text-2xl transition
                ${selectedRoom === r.label ? "border-2 border-[#F4A261] bg-gradient-to-r from-[#F4A261]/25 to-[#E07A5F]/25" : "border-2 border-transparent bg-gradient-to-r from-[#F4A261]/25 to-[#E07A5F]/25"}`}
              >
                <Image
                  src={r.icon}
                  alt={r.label}
                  width={32}
                  height={32}
                  className="object-contain"
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
                if (c.isPicker) {
                  colorInputRef.current?.click();
                } else {
                  setSelectedColor(c.label);
                  setSelectedColorHex(c.swatches[0]);
                }
              }}
              className="flex flex-col items-center gap-1 cursor-pointer w-[88px] flex-none snap-start"
            >
              <div
                className={`w-20 h-20 rounded-2xl border-2 transition overflow-hidden
                ${selectedColor === c.label ? "border-[#F4A261] shadow-md" : "border-transparent"}`}
              >
                <div
                  className="w-full h-full"
                  style={{
                    background:
                      c.isPicker && selectedColor === "Pick Color"
                        ? pickedColor
                        : c.isPicker
                          ? `conic-gradient(${c.swatches.join(", ")})`
                          : c.swatches.length === 1
                            ? c.swatches[0]
                            : `conic-gradient(${c.swatches.join(", ")})`,
                  }}
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
      <input
        ref={colorInputRef}
        type="color"
        value={pickedColor}
        onChange={(e) => {
          setPickedColor(e.target.value);
          setSelectedColor("Pick Color");
          setSelectedColorHex(e.target.value); 
        }}
        style={{
          position: "fixed",
          top: "35%",
          left: "35%",
          transform: "translate(-50%, -50%)",
          opacity: 0,
          width: "1px",
          height: "1px",
          pointerEvents: "none",
        }}
      />

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
                  className={`w-20 h-20 rounded-2xl flex items-center justify-center text-2xl transition
                  ${selectedRoom === r.label ? "border-2 border-[#F4A261] bg-gradient-to-r from-[#F4A261]/25 to-[#E07A5F]/25" : "border-2 border-transparent bg-gradient-to-r from-[#F4A261]/25 to-[#E07A5F]/25"}`}
                >
                  <Image
                    src={r.icon}
                    alt={r.label}
                    width={32}
                    height={32}
                    className="object-contain"
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
      {popup === "color" && (
        <ViewAllPopup title="Select Color" onClose={() => setPopup(null)}>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {colors.map((c) => (
              <button
                key={c.label}
                onClick={() => {
                  if (c.isPicker) {
                    colorInputRef.current?.click();
                  } else {
                    setSelectedColor(c.label);
                    setPopup(null);
                    scrollToSelected(colorScrollRef, c.label, colors);
                  }
                }}
                className="flex flex-col items-center gap-1 cursor-pointer"
              >
                <div
                  className={`w-20 h-20 rounded-2xl border-2 transition overflow-hidden
                  ${selectedColor === c.label ? "border-[#F4A261] shadow-md" : "border-transparent"}`}
                >
                  <div
                    className="w-full h-full"
                    style={{
                      background:
                        c.swatches.length === 1
                          ? c.swatches[0]
                          : `conic-gradient(${c.swatches.join(", ")})`,
                    }}
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
