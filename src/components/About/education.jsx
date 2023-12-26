import React from "react";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import kiit from "../../Asset/kiit.png";
import prayag from "../../Asset/prayag.png";
import dps from "../../Asset/dps.png";
import { Container, Row, Col } from "react-bootstrap";

import Tilt from "react-parallax-tilt";
function Education() {
  return (
    <Container>
    <Row className="ed-card">
    <Col md={2} className="ed-card">
        <Tilt>
          <img src={kiit}  style={{padding:"10%"}}className="img-fluid" alt="avatar" />
        </Tilt>
      </Col>
      <Col md={8} className="edex-card">
        <h3 style={{ textAlign: "left"}}>Bachelors in Computer Science and Engineering </h3>
        <h5 className="purple" style={{ textAlign: "left"}}>Kalinga Institute of Industrial Technology</h5>
        <p style={{ fontSize: "0.89em", textAlign: "left",paddingBottom: "20px",color:"black" }}>While undergoing this degree I gained a broad perspective in both software and hardware topics pertinent to computing systems. I minored in Fintech, with my final year project in blockchain and its impact on the Supply chain cycle for Vaccines.
      </p></Col>
      
    </Row><br/>
    <Row className="ed-card">
    <Col md={2} className="ed-card">
        <Tilt>
          <img src={dps} style={{padding:"10%"}} className="img-fluid" alt="avatar" />
        </Tilt>
      </Col>
      <Col md={8} className="edex-card">
        <h3 style={{ textAlign: "left"}}>Class 12th </h3>
        <h5 className="purple" style={{ textAlign: "left"}}>Delhi Public School Ranchi</h5>
        <p style={{ fontSize: "0.89em", textAlign: "left",paddingBottom: "20px",color:"black" }}>With my Major In science, I chose my fifth Subject Computer Science. I was awarded as the academic achiever by the Chief Secretary of Jharkhand for exemplary performance.
      </p></Col>
      
    </Row><br/>
    <Row className="ed-card">
    <Col md={2} className="ed-card">
        <Tilt>
          <img src={prayag} style={{padding:"10%"}} className="img-fluid" alt="avatar" />
        </Tilt>
      </Col>
      <Col md={8} className="edex-card">
        <h3 style={{ textAlign: "left"}}>Diploma in Indian Classical Music</h3>
        <h5 className="purple" style={{ textAlign: "left"}}>Kalinga Institute of Industrial Technology</h5>
        <p style={{ fontSize: "0.89em", textAlign: "left",paddingBottom: "20px",color:"black" }}>While undergoing this degree I gained a broad perspective in both software and hardware topics pertinent to computing systems. I minored in Fintech, with my final year project in blockchain and its impact on the Supply chain cycle for Vaccines.
      </p></Col>
      
    </Row><br/>
    
    
  </Container>

  );
}

export default Education;
