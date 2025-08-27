import Photo from '../models/photo.js';

export const uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No photo uploaded" });
    }

    // Build full URL dynamically
    const photoUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const newPhoto = new Photo({
      url: photoUrl,
      caption: req.body.caption || "",
      location: req.body.location || ""
    });

    await newPhoto.save();

    res.status(201).json({
      message: "Photo uploaded successfully",
      photo: newPhoto,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

export const getPhotos = async (req, res) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 });
    res.json(photos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch photos" });
  }
};
