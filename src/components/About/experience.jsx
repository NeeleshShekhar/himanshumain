import React from "react";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import hrc from "../../Asset/hrc.png";
import prayag from "../../Asset/prayag.png";
import jhar from "../../Asset/jhar.png";
import ey from "../../Asset/ey.png";
import { Container, Row, Col } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';

import Tilt from "react-parallax-tilt";
function Experience() {
  return (

    
    <Container>
    
    <Row className="ed-card">
    <Col md={2} >
        <Tilt>
          <img src={ey} className="img-fluid" style={{padding:"10%"}} alt="avatar" />
        </Tilt>
      </Col>
      <Col md={8} className="edex-card">
        <h3 style={{ textAlign: "left"}}>Associate Software Engineer</h3>
        <h5 className="purple" style={{ textAlign: "left"}}>Ernst and Young</h5>
        <p style={{ fontSize: "0.89em", textAlign: "left",paddingBottom: "20px" ,color:"black"}}>A Cloud Engineer with DotNet and GCP Experience.
      </p></Col>
      
    </Row>
    <br/>
    <Row className="ed-card">
    <Col md={2} >
        <Tilt>
          <img src={hrc} className="img-fluid" style={{padding:"10%",paddingTop:"30%"}} alt="avatar" />
        </Tilt>
      </Col>
      <Col md={8} className="edex-card" >
        <h3 style={{ textAlign: "left"}}>Digital Transformation Consultant</h3>
        <h5 className="purple" style={{ textAlign: "left"}}>Highradius</h5>
        <p style={{ fontSize: "0.89em", textAlign: "left",paddingBottom: "20px" ,color:"black"}}> <ul>
        <li>Analyzed Client's live data using Analytical and Visualization tools to improve the Client’s AR Process.</li> 
        
        <li>Created Design, Fit-Gap documents to identify the gaps between Client requirement and the available Product Scope for Fortune 500 Clients.</li> 
        
        <li>Conducted User Acceptance Testing (UAT) and Collaborated to
build successful client relationships.</li>


        </ul></p></Col>
      
    </Row>
    <br/>
    <Row className="ed-card">
    <Col md={2} >
        <Tilt>
          <img src={jhar} className="img-fluid" style={{padding:"10%"}} alt="avatar" />
        </Tilt>
      </Col>
      <Col md={8} className="edex-card">
        <h3 style={{ textAlign: "left"}}>SDE, Intern</h3>
        <h5 className="purple" style={{ textAlign: "left"}}>Jharkhand Government</h5>
        <p style={{ fontSize: "0.89em", textAlign: "left",paddingBottom: "20px" ,color:"black"}}>Created a DotNet Web App to cater to the Village Level Entreprenuers.
      </p></Col>
      
    </Row>
    <br/>
    
    
  </Container>

  );
}

export default Experience;
