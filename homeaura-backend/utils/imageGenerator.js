import cloudinary from "./cloudinary.js";
import fetch from "node-fetch";

const DASH_SCOPE_API_URL = process.env.CURL_lOCATION;

export const generateHomeAuraImage = async ({
  roomType,
  style,
  color,
  designType,
  uploadedImage,
}) => {
  try {
    const prompt = `Redesign this ${designType} space as a ${roomType}, styled in ${style} style with ${color} color palette. Photorealistic, high quality, professional design render, keep the same structure and layout.`;

    const body = {
      model: process.env.DASHSCOPE_MODEL,
      input: {
        messages: [
          {
            role: "user",
            content: [
              { text: prompt },
              ...(uploadedImage ? [{ image: uploadedImage }] : []),
            ],
          },
        ],
      },
      parameters: {
        negative_prompt: "",
        watermark: false,
        width: uploadedImage?.width || 512,
        height: uploadedImage?.height || 512,
      },
    };

    const response = await fetch(DASH_SCOPE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.DASHSCOPE_API_KEY,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API Error:", data);
      throw new Error("Image generation failed");
    }

    const imageUrl = data?.output?.choices?.[0]?.message?.content?.[0]?.image;
    if (!imageUrl) throw new Error("No image returned from API");
    const uploadResponse = await cloudinary.uploader.upload(imageUrl, {
      folder: "soulmates",
    });

    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Image Generation Error:", error);
    throw error;
  }
};
