import cloudinary from "./cloudinary.js";
import fetch from "node-fetch";

export const generateHomeAuraImage = async ({
  roomType,
  style,
  color,
  designType,
  uploadedImage,
}) => {
  try {
    const prompt = `Redesign this ${designType} space as a ${roomType}, styled in ${style} style with ${color} color palette. Photorealistic, high quality, professional design render, keep the same structure and layout.`;
    const response = await fetch(
      "https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.DASHSCOPE_API_KEY,
        },
        body: JSON.stringify({
          model: process.env.DASHSCOPE_MODEL,
          input: {
            messages: [
              {
                role: "user",
                content: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          },
          parameters: {
            negative_prompt: "",
            prompt_extend: true,
            watermark: false,
            n: 1,
            size: "1328*1328",
          },
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      throw new Error("Dashscope image generation failed");
    }

    const imageUrl = data?.output?.choices?.[0]?.message?.content?.[0]?.image;

    if (!imageUrl) {
      throw new Error("No image returned from Dashscope");
    }

    const uploadResponse = await cloudinary.uploader.upload(imageUrl, {
      folder: "soulmates",
    });

    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Image Generation Error:", error);
    throw new Error("Image generation failed");
  }
};
