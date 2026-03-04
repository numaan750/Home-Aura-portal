import GenerationModel from "../models/Generation.model.js";
import loginSchema from "../models/login.js";
import { generateHomeAuraImage } from "../utils/imageGenerator.js";

export const generateImage = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await loginSchema.findById(userId);
    if (!user.isPremium && user.credits <= 0) {
      return res.status(403).json({
        status: "error",
        needsPremium: true,
        message: "No credits left. Please upgrade to premium.",
      });
    }
    const {
      roomType,
      style,
      color,
      designType,
      uploadedImage,
      roomTypeImage,
      styleImage,
      colorImage,
    } = req.body;
    const imageUrl = await generateHomeAuraImage({
      roomType,
      style,
      color,
      designType,
      uploadedImage: uploadedImage || null,
    });
    await GenerationModel.create({
      userId,
      imageUrl,
      uploadedImage: uploadedImage || null,
      designType,
      roomType,
      style,
      color,
      roomTypeImage: roomTypeImage || null,
      styleImage: styleImage || null,
      colorImage: colorImage || null,
    });
    if (!user.isPremium) {
      await loginSchema.findByIdAndUpdate(userId, {
        $inc: { credits: -1 },
      });
    }

    res.status(200).json({
      status: "success",
      imageUrl,
      creditsLeft: user.isPremium ? "unlimited" : user.credits - 1,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
