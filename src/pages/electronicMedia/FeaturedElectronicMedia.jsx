import React, { useEffect, useState } from "react";
import { Grid, Paper, Box, Typography, Link } from "@mui/material";
import Carousel from "react-bootstrap/Carousel";
import dayjs from "dayjs";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

const FeaturedBlog = () => {
    const [blogsData, setBlogsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ElectronicMedia"));
        const blogs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBlogsData(blogs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        // Handle error gracefully, e.g., show error message to the user
      }
    };

    fetchBlogs();
  }, []);

    return (
        <Grid container>
            {loading && <p>Loading...</p>}
            {!loading && blogsData && (
                <div >

                    <Carousel >
                        {blogsData
                            .filter((blog) => blog.featured === true)
                            .map((blog) => (
                                <Carousel.Item key={blog.id}>
                                    <Card >
                                        <Paper
                                            sx={{
                                                position: "relative",
                                                backgroundColor: "grey.800",
                                                color: "#fff",
                                                mb: 4,
                                                height: "100%",
                                                backgroundSize: "cover",
                                                backgroundRepeat: "no-repeat",
                                                backgroundPosition: "center",
                                                
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    top: 0,
                                                    bottom: 0,
                                                    right: 0,
                                                    left: 0,
                                                    backgroundColor: "rgba(0,0,0,.3)",
                                                    height: "500px",
                                                }}
                                            />
                                            <Grid container>
                                                <Grid item md={6}>
                                                    <Box
                                                        sx={{
                                                            position: "relative",
                                                            p: { xs: 3, md: 6 },
                                                            pr: { md: 0 },
                                                            height: "500px",
                                                        }}
                                                    >
                                                        <Typography
                                                            component="h4"
                                                            variant="h4"
                                                            color="inherit"
                                                            gutterBottom
                                                        >
                                                            {blog.title}
                                                        </Typography>
                                                        
                                                        <Link
                                                            variant="subtitle1"
                                                            style={{ color: "white" }}
                                                            onClick={() =>
                                                                navigate(`/category/${blog.data.blogData.category}/${blog.id}`)
                                                            }
                                                        >
                                                            Continue reading...
                                                        </Link>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Card>
                                </Carousel.Item>
                            ))}
                    </Carousel>
                </div>
            )}
        </Grid>
    );
};

export default FeaturedBlog;
