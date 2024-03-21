// Import necessary dependencies
import React from 'react';
import { Carousel } from 'react-bootstrap';
import firstSlideImage from '../Asset/CaraouselPicturesStatic/1.jpg'; // Replace with the actual path and filename
import secondSlideImage from '../Asset/CaraouselPicturesStatic/2.jpg'; // Replace with the actual path and filename
import Image1 from '../Asset/CaraouselImage/1.jpg'
import Image2 from '../Asset/CaraouselImage/2.jpg'
import Image3 from '../Asset/CaraouselImage/3.jpg'
import Image4 from '../Asset/CaraouselImage/4.jpg'
import Image5 from '../Asset/CaraouselImage/5.jpg'
// Sample data for carousel items
const carouselItems = [
  {
    id: 1,
     
    image: Image1, // Replace with your image URL
  },
  {
    id: 2,
     
    image: Image2, // Replace with your image URL
  },
  {
    id: 3,
     
    image: Image3, // Replace with your image URL
  },
  {
    id: 4,
     
    image: Image4, // Replace with your image URL
  },
  {
    id: 4,
     
    image: Image5, // Replace with your image URL
  },
  
  // Add more items as needed
];

// Create the Carousel component
const HomeCaraousel = () => {
    return (
        <div className='caraouselCheck'>
        <Carousel style={{ maxHeight: '750px' }} interval={3000}>
          {carouselItems.map((item) => (
            <Carousel.Item key={item.id}>
              <img
                className="d-block w-100"
                src={item.image}
                alt={item.title}
                style={{ maxHeight: '750px', objectFit: 'cover' }}
              />
              <Carousel.Caption>
                <h1>{item.title}</h1>
                <h6>{item.description}</h6>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel></div>
      );
};

export default HomeCaraousel;
