import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import consulting from "../../Asset/consulting.png";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home3() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
      <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em",textAlign: "left" }}>
              As a <span className="purple" style={{ fontSize: "1em",textAlign: "left" }}> Management Consultant,1 </span> 
            </h1>
            <p className="home-about-body">
            Successfully led and delivered a project for a Leading Floral Business in the United States. Carried out designs to improve the AR Recievables by more than 30%. Integrated a payment platform for the Company to stream line the online payments process
<br/><br/>
Ideated and delivered strategies to improve payment processes for a leading Security provider in the United States.
<br/><br/>
Collaborated with a Leading Bank in US for multiple implementations.
           </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={consulting} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>Find Me at</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/neeleshshekhar"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://twitter.com/neelesh"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/neelesh-shekhar-59a038143//"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/neeleshshekhar_/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home3;
