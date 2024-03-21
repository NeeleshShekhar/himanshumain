import React from "react";
import image from "../../Asset/CaraouselImage/4.jpg";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  IconButton,
  Paper
} from '@mui/material';
import {
  Instagram,
  LinkedIn,
  Twitter,
  GitHub,
} from '@mui/icons-material';
import "./aboutme.css"


function MainComponent() {
  return (
    <div >
      <img
        className="d-block w-100"
        src={image}
        alt="home"
        style={{ maxHeight: '600px', objectFit: 'cover' }}
      />

      <div className="check">
        <div className="news-detail-content">
          <div className="title-area">
            <h2 className="aboutparagraph" style={{ fontWeight: 400 }}>
              Himanshu Shekhar Choudhary
              <div style={{ display: 'flex', gap: '10px', float: "right", color: "blue" }}>
                {/* Material-UI icons for Instagram, LinkedIn, Twitter, and GitHub */}
                <IconButton href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                  <Instagram />
                </IconButton>
                <IconButton href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                  <LinkedIn />
                </IconButton>
                <IconButton href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                  <Twitter />
                </IconButton>
                <IconButton href="https://github.com/" target="_blank" rel="noopener noreferrer">
                  <GitHub />
                </IconButton>
              </div>
            </h2>


            <div className="aboutparagraph" style={{ textAlign: 'justify' }}>
              Himanshu Shekhar Chaudhary will assume the responsibility of the new chairman of the Jharkhand State Food Commission on Friday. Along with being the press advisor to Chief Minister Hemant Soren, he has also been responsible for overseeing the duties of the state's Deputy Chief Information Commissioner. He stated that he would fulfill the responsibilities of the chairman of the Food Commission with utmost seriousness. Strengthening the public distribution system in the state and ensuring that every beneficiary receives food grains is a significant responsibility. Its importance in the welfare state is paramount. Monitoring the implementation of the mid-day meal program in schools is also essential. It is raising awareness among people about nutrition along with education. Distributing nutritious food is also a priority for the state government. It is necessary to reach it to every needy person. As the chairman of the Food Commission, he will ensure that all welfare schemes reach the grassroots level. In addition, the commission plays a crucial role in policy matters related to food. Establishing better coordination and bringing all food-related schemes to the forefront is the goal of the commission.</div>
          </div>
        </div>
      </div>
    </div>
  );
}


function AboutMe() {
  return (
    <div>
      <MainComponent />
      {/* <HomeCaraousel /> */}

    </div>
  );
}

export default AboutMe;
