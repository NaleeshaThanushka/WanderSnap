// controllers/photoController.js
import Photo from '../models/photo.js';

export const uploadPhoto = async (req, res) => {
  try {
    const { caption, location } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No photo uploaded' });
    }

    const photoUrl = `/uploads/${req.file.filename}`;

    const newPhoto = new Photo({
      url: photoUrl,
      caption,
      location
    });

    await newPhoto.save();

    res.status(201).json(newPhoto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Photo upload failed' });
  }
};

export const getPhotos = async (req, res) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 });
    res.json(photos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
};
