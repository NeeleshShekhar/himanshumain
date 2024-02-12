import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./common.css"; // Import the CSS file

const Tags = () => {
  const categories = [
    { title: "Entertainment", url: "/category/entertainment" },
    { title: "Knowledge", url: "/category/knowledge" },
    { title: "Programming", url: "/category/programming" },
    { title: "Productivity", url: "/category/productivity" },
    { title: "Lifestyle", url: "/category/lifestyle" },
    { title: "Design", url: "/category/design" },
    { title: "Travel", url: "/category/travel" },
  ];

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  if (isSmallScreen) {
    // Render accordion for small screens
    return (
      <Accordion elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="categories-content"
          id="categories-header"
          
        >
          <Typography style={{ textAlign: "center",fontFamily:"PopinsMedium",color:"#00589c" }}  >Explore Categories</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="accordion-container">
            {categories.map((category) => (
              <Button
                key={category.title}
                className="categoryBtn"
                component={Link}
                to={category.url}
                style={{fontFamily:"PopinsMedium",color:"#00589c"}}
              >
                {category.title}
              </Button>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    );
  }

  // Render normal toolbar for larger screens
  return (
    <Toolbar
      component="nav"
      variant="dense"
      sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      className="tagtoolbar"
    >
      {categories.map((category, index) => (
        <React.Fragment key={category.title}>
          <Button
            className="categoryBtn"
            component={Link}
            to={category.url}
          >
          <div style={{fontFamily:"PopinsMedium",color:"#00589c"}}>{category.title}</div>
          </Button>
          {index < categories.length - 1 && <Divider orientation="vertical" flexItem />}
        </React.Fragment>
      ))}
    </Toolbar>
  );
};

export default Tags;
