import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Gallery.css";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");

  const fileInputRef = useRef(null);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const API_BASE = "http://localhost:4000";

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/photos`);
      if (!response.ok) throw new Error("Failed to fetch photos");
      const data = await response.json();
      setPhotos(data || []);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error fetching photos");
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.warning("Please select a valid image file (JPEG, PNG, etc.)");
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (ev) => setPreviewUrl(ev.target.result);
    reader.readAsDataURL(file);
  };

const handleUpload = async (e) => {
  e.preventDefault();

  if (!selectedFile) return toast.warning("Please select a photo to upload.");
  if (!caption.trim()) return toast.warning("Please enter a caption.");
  if (!location.trim()) return toast.warning("Please enter a location.");

  try {
    setUploading(true);

    const formData = new FormData();
    formData.append("photo", selectedFile);
    formData.append("caption", caption.trim());
    formData.append("location", location.trim());

    const response = await fetch(`${API_BASE}/api/photos/uploads`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.message || "Upload failed");
    }

    toast.success("Photo uploaded successfully!");
    console.log("✅ Uploaded:", data);

  } catch (err) {
    console.error("Upload error:", err);
    toast.error(err.message);
  } finally {
    setUploading(false);
  }
};


  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
  <div className="gallery-container">
    <ToastContainer position="top-right" autoClose={4000} pauseOnHover theme="colored" />

    {/* Header */}
    <div className="gallery-header">
      <h1>Travel Photo Gallery</h1>
      <p>Share your travel memories with the world</p>
    </div>

    {/* Upload section (only if logged in) */}
    {isLoggedIn ? (
      <div className="upload-section">
        <h2>Upload New Photo</h2>
        <form onSubmit={handleUpload} className="upload-form">
          {/* File input */}
          <div className="file-input-wrapper">
            <input
              type="file"
              id="photo-input"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileSelect}
              className="file-input"
            />
            <label htmlFor="photo-input" className="file-input-label">
              Choose Photo
            </label>
          </div>

          {/* Preview */}
          {previewUrl && (
            <div className="preview-container">
              <img src={previewUrl} alt="Preview" className="preview-image" />
            </div>
          )}

          {/* Caption */}
          <div className="form-group">
            <input
              type="text"
              placeholder="Add a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="caption-input"
            />
          </div>

          {/* Location */}
          <div className="form-group">
            <input
              type="text"
              placeholder="Location (required)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="location-input"
            />
          </div>

          <button type="submit" className="upload-btn" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Photo"}
          </button>
        </form>
      </div>
    ) : (
      <div className="login-prompt">
        <h3>Please log in to upload and view photos</h3>
      </div>
    )}

    {/* Recent photos */}
    <div className="photos-section">
      <h2>Recent Photos</h2>

      {loading ? (
        <div className="loading">Loading photos...</div>
      ) : photos.length === 0 ? (
        <div className="no-photos">
          <p>No photos uploaded yet. Be the first to share your travels!</p>
        </div>
      ) : (
        <div className="photos-grid">
          {photos.map((photo, index) => {
            // FIX: ensure correct image URL
            const imgUrl = photo.url;

            return (
              <div key={photo._id || index} className="photo-card">
                <div className="photo-wrapper">
                  <img
                    src={imgUrl}
                    alt={photo.caption || "Travel photo"}
                    className="photo-image"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "/fallback.jpg";
                      console.warn(`Image failed: ${imgUrl}`);
                      toast.warning("Failed to load image, showing fallback.");
                    }}
                  />
                </div>
                <div className="photo-info">
                  {photo.caption && <p className="photo-caption">{photo.caption}</p>}
                  {photo.location && <p className="photo-location">📍 {photo.location}</p>}
                  <div className="photo-meta">
                    <span className="photo-author">By {photo.username || "Anonymous"}</span>
                    <span className="photo-date">{formatDate(photo.createdAt)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  </div>
);

};

export default Gallery;
