import React, { useState } from 'react';
import { storage, db } from '../config/firebase'; // Assuming you have Firebase initialized and imported

const MultipleImageUpload = () => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const uploadImages = async () => {
    setUploading(true);
    try {
      const uploadPromises = images.map(async (image) => {
        const storageRef = storage.ref(`images/${image.name}`);
        const snapshot = await storageRef.put(image);
        const downloadURL = await snapshot.ref.getDownloadURL();
        return { id: snapshot.metadata.name, downloadURL };
      });

      const uploadedImages = await Promise.all(uploadPromises);

      // Save image IDs to the 'post' collection
      uploadedImages.forEach(async (image) => {
        await db.collection('post').add({ imageId: image.id });
      });

      console.log('Images uploaded successfully');
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={uploadImages} disabled={uploading || images.length === 0}>
        {uploading ? 'Uploading...' : 'Upload Images'}
      </button>
    </div>
  );
};

export default MultipleImageUpload;
