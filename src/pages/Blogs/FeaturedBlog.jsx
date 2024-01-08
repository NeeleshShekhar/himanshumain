import React, { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import Carousel from 'react-bootstrap/Carousel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import parse from "html-react-parser";
import { db } from "../../config/firebase";

const FeaturedBlog = () => {
    const [blogData, setBlogData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const blogRef = collection(db, "blogs");
                const q = query(
                    blogRef,
                    where(`featured`, "==", true),
                    orderBy("timestamp", "desc"),
                    limit(6)
                );
                const querySnap = await getDocs(q);
                const blogs = [];
                querySnap.forEach((query) => {
                    blogs.push({
                        id: query.id,
                        data: query.data(),
                    });
                });
                setBlogData(blogs);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const formattedDate = (timestamp) => dayjs(timestamp.toDate()).format("YYYY-MM-DD");

    return (
        <Grid container>
            {loading && <p>Loading...</p>}
            {!loading && blogData && (
                <div > {/* Adjust the height value as needed */}
                    <Carousel >
                        {blogData.map((blog) => (
                            <Carousel.Item key={blog.id}>
                                <Paper
                                    sx={{
                                        position: 'relative',
                                        backgroundColor: 'grey.800',
                                        color: '#fff',
                                        mb: 4,
                                        height: "100%",
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        backgroundImage: `url(${blog.data.imageUrl})`,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            bottom: 0,
                                            right: 0,
                                            left: 0,
                                            backgroundColor: 'rgba(0,0,0,.3)',
                                            height:"500px"
                                        }}
                                    />
                                    <Grid container>
                                        <Grid item md={6}>
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    p: { xs: 3, md: 6 },
                                                    pr: { md: 0 },
                                                    height:"500px"
                                                }}
                                            >
                                                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                                    {blog.data.blogData.title}
                                                </Typography>
                                                <Typography variant="h5" color="inherit" paragraph>
                                                    {parse(blog.data.blogData.content.substring(0, 200))}
                                                </Typography>
                                                <Link variant="subtitle1" onClick={() => navigate(`/category/${blog.data.blogData.category}/${blog.id}`)}>
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

export default FeaturedBlog;
