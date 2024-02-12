import React, { useEffect, useState } from "react";
import { Grid, Paper, Box, Typography, Link } from "@mui/material";
import Carousel from "react-bootstrap/Carousel";
import dayjs from "dayjs";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";

const CategoryFeaturedArticle = ({ blogsData }) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(false);
    }, [blogsData]);

    const formattedDate = (timestamp) => dayjs(timestamp.toDate()).format("YYYY-MM-DD");

    return (
        <Grid container>
            {loading && <p>Loading...</p>}
            {!loading && blogsData && (
                <div>
                    <Carousel>
                        {blogsData
                            .filter((blog) => blog.data.featured === true)
                            .map((blog) => (
                                <Carousel.Item key={blog.id}>
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
                                            backgroundImage: `url(${blog.data.imageUrl})`,
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
                                                        {blog.data.blogData.title}
                                                    </Typography>
                                                    <Typography variant="p" color="inherit" paragraph>
                                                        {parse(blog.data.blogData.content.substring(0, 200))}
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
                                </Carousel.Item>
                            ))}
                    </Carousel>
                </div>
            )}
        </Grid>
    );
};

export default CategoryFeaturedArticle;
