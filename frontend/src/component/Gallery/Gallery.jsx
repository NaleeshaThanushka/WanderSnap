import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Gallery.css';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const API_BASE = 'http://localhost:4000';

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/photos`);

      if (!response.ok) {
        throw new Error('Failed to fetch photos');
      }

      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error(error.message || 'Error fetching photos');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreviewUrl(e.target.result);
      reader.readAsDataURL(file);
    } else {
      toast.warning('Please select a valid image file (JPEG, PNG, etc.)');
      e.target.value = '';
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.warning('Please select a photo to upload.');
      return;
    }

    if (!caption.trim()) {
      toast.warning('Please enter a caption for your photo.');
      return;
    }

    if (!location.trim()) {
      toast.warning('Please enter a location for your photo.');
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append('photo', selectedFile);
      formData.append('caption', caption.trim());
      formData.append('location', location.trim());

      const response = await fetch(`${API_BASE}/api/photos/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Upload failed');
      }

      const newPhoto = await response.json();
      setPhotos([newPhoto, ...photos]);

      // Reset form
      setSelectedFile(null);
      setPreviewUrl(null);
      setCaption('');
      setLocation('');
      document.getElementById('photo-input').value = '';

      toast.success('Photo uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload photo. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="gallery-container">
      <ToastContainer position="top-right" autoClose={4000} pauseOnHover theme="colored" />

      <div className="gallery-header">
        <h1>Travel Photo Gallery</h1>
        <p>Share your travel memories with the world</p>
      </div>

      {isLoggedIn ? (
        <div className="upload-section">
          <h2>Upload New Photo</h2>
          <form onSubmit={handleUpload} className="upload-form">
            <div className="file-input-wrapper">
              <input
                type="file"
                id="photo-input"
                accept="image/*"
                onChange={handleFileSelect}
                className="file-input"
              />
              <label htmlFor="photo-input" className="file-input-label">
                Choose Photo
              </label>
            </div>

            {previewUrl && (
              <div className="preview-container">
                <img src={previewUrl} alt="Preview" className="preview-image" />
              </div>
            )}

            <div className="form-group">
              <input
                type="text"
                placeholder="Add a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="caption-input"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Location (required)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="location-input"
              />
            </div>

            <button
              type="submit"
              disabled={!selectedFile || uploading}
              className="upload-btn"
            >
              {uploading ? 'Uploading...' : 'Upload Photo'}
            </button>
          </form>
        </div>
      ) : (
        <div className="login-prompt">
          <h3>Please log in to upload photos and view uploaded photos</h3>
        </div>
      )}

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
            {photos.map((photo) => (
              <div key={photo._id} className="photo-card">
                <div className="photo-wrapper">
                  <img
                    src={`${API_BASE}${photo.url}`}
                    alt={photo.caption || 'Travel photo'}
                    className="photo-image"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/fallback.jpg';
                      toast.warning('Failed to load image, showing fallback.');
                    }}
                  />
                </div>
                <div className="photo-info">
                  {photo.caption && <p className="photo-caption">{photo.caption}</p>}
                  {photo.location && <p className="photo-location">📍 {photo.location}</p>}
                  <div className="photo-meta">
                    <span className="photo-author">By {photo.username || 'Anonymous'}</span>
                    <span className="photo-date">{formatDate(photo.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
