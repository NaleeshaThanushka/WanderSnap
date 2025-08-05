// routes/photoRoute.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadPhoto, getPhotos } from '../controllers/photoController.js';

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // make sure uploads/ exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Routes
router.post('/upload', upload.single('photo'), uploadPhoto);
router.get('/', getPhotos);

export default router;
