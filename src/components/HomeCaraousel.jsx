// Import necessary dependencies
import React from 'react';
import { Carousel } from 'react-bootstrap';
import firstSlideImage from '../Asset/CaraouselPicturesStatic/1.jpg'; // Replace with the actual path and filename
import secondSlideImage from '../Asset/CaraouselPicturesStatic/2.jpg'; // Replace with the actual path and filename

// Sample data for carousel items
const carouselItems = [
  {
    id: 1,
    title: 'Neelesh Shekhar',
    description: 'An Individual with a Computer Science background with an excellent analytical perspective towards solving problems. I have experience in the Digital transformation of organizations by analyzing real data sets.    ',
    image: secondSlideImage, // Replace with your image URL
  },
  {
    id: 2,
    title: 'Neelesh Shekhar',
    description: 'An Individual with a Computer Science background with an excellent analytical perspective towards solving problems. I have experience in the Digital transformation of organizations by analyzing real data sets.    ',
    image: firstSlideImage, // Replace with your image URL
  },
  {
    id: 3,
    title: 'Neelesh Shekhar',
    description: 'An Individual with a Computer Science background with an excellent analytical perspective towards solving problems. I have experience in the Digital transformation of organizations by analyzing real data sets.    ',
    image: secondSlideImage, // Replace with your image URL
  },
  {
    id: 4,
    title: 'Neelesh Shekhar',
    description: 'An Individual with a Computer Science background with an excellent analytical perspective towards solving problems. I have experience in the Digital transformation of organizations by analyzing real data sets.    ',
    image: firstSlideImage, // Replace with your image URL
  },
  
  // Add more items as needed
];

// Create the Carousel component
const HomeCaraousel = () => {
    return (
        <div className='caraouselCheck'>
        <Carousel style={{ maxHeight: '500px' }} interval={3000}>
          {carouselItems.map((item) => (
            <Carousel.Item key={item.id}>
              <img
                className="d-block w-100"
                src={item.image}
                alt={item.title}
                style={{ maxHeight: '500px', objectFit: 'cover' }}
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
