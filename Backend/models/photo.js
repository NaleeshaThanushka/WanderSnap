// models/photo.js
import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema(
  {
    url: String,
    caption: String,
    location: String
  },
  { timestamps: true }
);

const Photo = mongoose.model('Photo', photoSchema);

export default Photo;
