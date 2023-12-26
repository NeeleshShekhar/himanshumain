import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "left" }}>
            Hi Everyone, I am <span className="purple">Neelesh </span>
            from <span className="purple"> Ranchi, India.</span>
            <br />I completed my Bachelors in Technology in Computer Science and Engineering at Kalinga Institute of Industrial Technology
            <br />
            
          </p>
         

          <p style={{ color: "rgb(155 126 172)" ,textAlign: "left"}}>
            "A Jack of all trades is a master of none, but oftentimes better than a master of one"{" "}
          </p>
         
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
