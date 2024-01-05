import React from "react";
import image from "../../Asset/CaraouselPicturesStatic/2.jpg";
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
            <h2 className="aboutparagraph" style={{fontWeight:400}}>
              Neelesh Shekhar
              <div style={{ display: 'flex', gap: '10px', float: "right",color:"blue" }}>
                {/* Material-UI icons for Instagram, LinkedIn, Twitter, and GitHub */}
                <IconButton href="https://www.instagram.com/neeleshshekhar_" target="_blank" rel="noopener noreferrer">
                  <Instagram />
                </IconButton>
                <IconButton href="https://www.linkedin.com/neeleshshekhar" target="_blank" rel="noopener noreferrer">
                  <LinkedIn />
                </IconButton>
                <IconButton href="https://twitter.com/neeleshshekhar" target="_blank" rel="noopener noreferrer">
                  <Twitter />
                </IconButton>
                <IconButton href="https://github.com/neeleshshekhar" target="_blank" rel="noopener noreferrer">
                  <GitHub />
                </IconButton>
              </div>
            </h2>


            <div className="aboutparagraph" style={{ textAlign: 'justify' }}>
            <br />
              Step into the vibrant world of Neelesh Shekhar, a seasoned Computer Science professional whose journey is marked by innovation, academic excellence, and a relentless pursuit of excellence. With a Bachelor's degree in Computer Science from KIIT, where I graduated with an outstanding 9.2 GPA, my commitment to pushing the boundaries of technology is evident.
              <br /><br />
              I am the Co-Founder of Skilwil.com, an online quizzing platform dedicated to mathematics, where I led a dynamic team in organizing educational events across India. This venture not only showcased my entrepreneurial spirit but also underscored my dedication to making a positive impact in the field of education.
              <br /><br />
              During my tenure as the Secretary of the ACM chapter, I seamlessly integrated my technological prowess with a passion for music, garnering accolades in both realms. This dual expertise reflects my diverse skill set and the ability to navigate various domains with ease.
              <br /><br />
              As an Associate Consultant at HighRadius, I played a pivotal role in optimizing Order to Cash processes for Fortune 500 clients, leaving an indelible mark on their financial workflows. Now, as a Platform Engineer at Ernst and Young, I leverage my expertise in AWS and Azure to craft a cutting-edge Developer Experience Platform using backstage.io. My role involves creating a seamless environment for developers, ushering in a new era of efficiency and innovation.
              <br /><br />
              Beyond the confines of technology, I hold a diploma in Indian classical music, a testament to my multifaceted interests and a commitment to continuous learning. I am not just a professional; I am a problem solver, an entrepreneur, and a value creator. Whether diving into the intricacies of cloud computing or pursuing entrepreneurial ambitions, I thrive on setting new standards and creating meaningful impact.
              <br /><br />
              If you're ready to embark on a journey of innovation, collaboration, and success, I invite you to connect. Together, we can shape a future where possibilities are limitless, and accomplishments know no bounds.
            </div>
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
