import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const Tags = () => {
  const styles = {
    categoryBtn: {
      color: "white",
      backgroundColor: "#34D399",
      "&:hover": {
        backgroundColor: "#10B981",
      },
      "&:focus": {
        outline: "none",
        ring: "4px",
        ringColor: "#34D399",
      },
      fontSize: "0.75rem",
      padding: "8px 16px",
      borderRadius: "999px",
      textAlign: "center",
      marginRight: "8px",
      marginBottom: "8px",
      dark: {
        backgroundColor: "#22C55E",
        "&:hover": {
          backgroundColor: "#14B16E",
        },
        "&:focus": {
          ringColor: "#22C55E",
        },
      },
    },
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "24px 0",
      overflowX: "auto",
    },
    mobileContainer: {
      flexDirection: "column",
      textAlign: "center",
    },
    mobileBtn: {
      marginBottom: "12px",
    },
  };

  return (
    <div style={styles.container}>
      <Button sx={styles.categoryBtn}>
        <Link to={"/category/entertainment"} style={{ textDecoration: "none", color: "inherit" }}>
          Entertainment
        </Link>
      </Button>

      <Button sx={styles.categoryBtn}>
        <Link to={"/category/knowledge"} style={{ textDecoration: "none", color: "inherit" }}>
          Knowledge
        </Link>
      </Button>

      <Button sx={styles.categoryBtn}>
        <Link to={"/category/programming"} style={{ textDecoration: "none", color: "inherit" }}>
          Programming
        </Link>
      </Button>

      <Button sx={styles.categoryBtn}>
        <Link to={"/category/productivity"} style={{ textDecoration: "none", color: "inherit" }}>
          Productivity
        </Link>
      </Button>

      <Button sx={styles.categoryBtn}>
        <Link to={"/category/lifestyle"} style={{ textDecoration: "none", color: "inherit" }}>
          Lifestyle
        </Link>
      </Button>

      <Button sx={styles.categoryBtn}>
        <Link to={"/category/desgin"} style={{ textDecoration: "none", color: "inherit" }}>
          Design
        </Link>
      </Button>

      <Button sx={styles.categoryBtn}>
        <Link to={"/category/travel"} style={{ textDecoration: "none", color: "inherit" }}>
          Travel
        </Link>
      </Button>
    </div>
  );
};

export default Tags;
