import express from "express";
import { upload } from "../middleware/uploads.js";
import { uploadPhoto, getPhotos } from "../controllers/photoController.js";

const router = express.Router();

router.post("/uploads", upload.single("photo"), uploadPhoto);
router.get("/", getPhotos);

export default router;
