import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Asset/about.png";
import Toolstack from "./Toolstack";
import Education from "./education";
import Experience from "./experience";

function About() {
  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        {/* <Row style={{  padding: "10px" }}>
          <Col
            md={7}
            style={{
              
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "3em", textAlign: "left",paddingBottom: "20px" }}>
              Experience and <strong className="purple">Education   </strong>
            </h1>
            
            
          </Col>
          <Col
            md={5}
            style={{ paddingTop: "120px", paddingBottom: "50px" }}
            className="about-img"
          >
            <img  style={{ maxWidth: "100%",  maxHeight: "100%"} }src={laptopImg}alt="about" className="img-fluid" />
          </Col>
        </Row> */}



      <h1 className="project-heading" style={{ fontSize: "5em", textAlign: "left",paddingBottom: "20px" }}>
          Expe<strong className="purple">rience </strong>
        </h1>
        <Experience/>
      

    
      <h1 className="project-heading" style={{ fontSize: "5em", textAlign: "left",paddingBottom: "20px" }}>
          Edu<strong className="purple">cation </strong>
        </h1>
        <Education/>
      
       
       
        {/* <Techstack /> */}

        {/* <h1 className="project-heading">
          <strong className="purple">Tools</strong> I use
        </h1> */}
       
        {/* <Toolstack />

        <Github /> */}
      </Container>
    </Container>
  );
}

export default About;
