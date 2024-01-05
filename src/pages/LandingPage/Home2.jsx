import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import Tilt from "react-parallax-tilt";
import { GitHub, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

import myImg from "../../Asset/avatar.svg";

function Home2() {
  return (
    <Container maxWidth="lg" className="home-about-section" id="about">
      <Grid container spacing={3}>
        <Grid item md={8} className="home-about-description">
          <Typography variant="h3" style={{ textAlign: "left" }}>
            I am an <span className="purple"> Entreprenuer </span>
          </Typography>
          <Typography variant="body1" className="home-about-body">
            Built www.skilwil.com, an immersive ed-art-tech platform to engage students to bridge the gap between creativity and education
            <br />
            <br /> Currently building www.thefusionmonkey.com, an online entertainment cum fashion brand that connects to the ambitious youth.
            <br />
            <br /> Currently Building Bahurangi, a platform for the Terracotta artisans to gain digital exposure.
          </Typography>
        </Grid>
        <Grid item md={4} className="myAvtar">
          <Tilt>
            <img src={myImg} className="imagewave" alt="avatar" />
          </Tilt>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home2;
