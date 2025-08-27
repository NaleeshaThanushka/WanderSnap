import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },   // will store FULL URL, not just filename
    caption: { type: String, default: "" },
    location: { type: String, default: "" }
  },
  { timestamps: true }
);

const Photo = mongoose.model('Photo', photoSchema);
export default Photo;
