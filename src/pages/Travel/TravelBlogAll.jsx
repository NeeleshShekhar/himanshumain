import React, { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import useMediaQuery from "@mui/material/useMediaQuery";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
const TravelBlogs = () => {
  const [images, setImages] = useState([]);
  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const galleryRef = collection(db, 'gallery');
        const q = query(galleryRef);
        const querySnapshot = await getDocs(q);
        const imageData = [];
        querySnapshot.forEach((doc) => {
          // Assuming your document has a field called "imageUrls" which is an array of image URLs
          const imageUrls = doc.data().imageUrls;
          imageUrls.forEach(url => {
            imageData.push({
              original: url,
              thumbnail: url, // You can use the same URL for thumbnail or specify a different one
              originalAlt: 'Image',
              thumbnailAlt: 'Thumbnail'
            });
          });
        });
        console.log('Image Data:', imageData); // Log image data
        setImages(imageData);
      } catch (error) {
        console.error('Error fetching images: ', error);
      }
    };
  
    fetchImages();
  }, []);

  return (
    <div>
      
      <ImageGallery items={images} />
    </div>
  );
};

export default TravelBlogs;
