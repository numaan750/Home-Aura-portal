import Generation from "../models/Generation.model.js";

export const getGallery = async (req, res) => {
  try {
    const generations = await Generation.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      status: "success",
      generations,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
