// Import necessary dependencies
import React from 'react';
import { Carousel } from 'react-bootstrap';
import firstSlideImage from '../../Asset/TravelCaraousel/1.jpg'; // Replace with the actual path and filename
import secondSlideImage from '../../Asset/TravelCaraousel/2.jpg';
import thirdSlideImage from '../../Asset/TravelCaraousel/3.jpg'; // Replace with the actual path and filename
import "./travel.css";
// Sample data for carousel items
const carouselItems = [
  {
    id: 1,
    title: 'Embark on a Journey Beyond Borders',
    description: `Join me on a compact adventure through captivating destinations. Discover hidden gems, embrace new cultures, and savor the joy of exploration. Travel light, stay curious, and let's make every moment count together.`,
    image: secondSlideImage, // Replace with your image URL
  },
  {
    id: 2,
    title: 'Embark on a Journey Beyond Borders',
    description: `Join me on a compact adventure through captivating destinations. Discover hidden gems, embrace new cultures, and savor the joy of exploration. Travel light, stay curious, and let's make every moment count together.`,
    image: firstSlideImage, // Replace with your image URL
  },
  {
    id: 3,
    title: 'Embark on a Journey Beyond Borders',
    description: `Join me on a compact adventure through captivating destinations. Discover hidden gems, embrace new cultures, and savor the joy of exploration. Travel light, stay curious, and let's make every moment count together.`,
    image: thirdSlideImage, // Replace with your image URL
  },
  {
    id: 4,
    title: 'Embark on a Journey Beyond Borders',
    description: `Join me on a compact adventure through captivating destinations. Discover hidden gems, embrace new cultures, and savor the joy of exploration. Travel light, stay curious, and let's make every moment count together.`,
    image: firstSlideImage, // Replace with your image URL
  },

  // Add more items as needed
];

// Create the Carousel component
const TravelCaraousel = () => {
  return (
    <div className='carousel-container'>
      <Carousel className='caraousel-main' interval={3000}>
        {carouselItems.map((item) => (
          <Carousel.Item key={item.id}>
            <img
              className="d-block w-100 caraousel-img"
              src={item.image}
              alt={item.title}
              style={{ objectFit: 'cover' }}
            />
            <Carousel.Caption className="carousel-caption">
              <div className='carousel-title'>{item.title}</div>
              <br/>
              <div className='carousel-desc'>{item.description}</div>
              
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      
    </div>
  );
};

export default TravelCaraousel;
