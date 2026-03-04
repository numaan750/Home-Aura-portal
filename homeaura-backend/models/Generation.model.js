import mongoose from "mongoose";

const generationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Login",
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    uploadedImage: {
      type: String,
      default: null,
    },
    designType: { type: String, default: null },
    roomType: { type: String, default: null },
    style: { type: String, default: null },
    color: { type: String, default: null },
    roomTypeImage: { type: String, default: null },
    styleImage: { type: String, default: null },
    colorImage: { type: String, default: null },
  },
  { timestamps: true },
);

export default mongoose.model("Generation", generationSchema);
