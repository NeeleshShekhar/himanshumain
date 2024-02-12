import React, { useState } from 'react';
import Gallery from 'react-photo-gallery';

const MyGallery = ({ textInputs }) => {
  const photos = textInputs.map((image, index) => ({
    src: image,
    width: 4,
    height: 3,
    alt: `Gallery ${index + 1}`
  }));

  const [currentImage, setCurrentImage] = React.useState(0);
  const [viewerIsOpen, setViewerIsOpen] = React.useState(false);

  const openLightbox = (index) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };


  return (
    <div className="gallery-container">
      <Gallery photos={photos} onClick={(_, { index }) => openLightbox(index)} />

      
    </div>
  );
};

export default MyGallery;
