import React, { useRef, useEffect } from 'react';
import LightGallery from 'lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
// import 'travel.css';

const ImageGallery = ({ textInputs }) => {
  const galleryRef = useRef(null);

  useEffect(() => {
    if (galleryRef.current) {
      LightGallery(galleryRef.current, {
        plugins: [lgThumbnail],
      });
    }
  }, [textInputs]);

  return (
    <div className="image-grid" ref={galleryRef}>
      {textInputs.map((imageUrl, index) => (
        <a key={index} href={imageUrl}>
          <img src={imageUrl} alt={`Image ${index + 1}`} />
        </a>
      ))}
    </div>
  );
};

export default ImageGallery;
