/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
    where
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-hot-toast";
import Loader from "../../components/Loader";
import Tags from "../../components/common/Tags";
import InfiniteScroll from "react-infinite-scroll-component";
import { Container, Grid, CardActionArea, Card, CardContent, Typography, CardMedia, Divider } from "@mui/material";
import CardSkeleton from "../../components/skeleton/CardSkeleton";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import parse from "html-react-parser";
import useMediaQuery from "@mui/material/useMediaQuery";


const CategoryBlogs = ({ category }) => {
    const [blogsData, setBlogsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastBlog, setLastBlog] = useState(null);
    const [infiniteLoading, setInfiniteLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    const isSmallScreen = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const blogRef = collection(db, "blogs");
                const q = query(
                    blogRef,
                    where(`blogData.category`, "==", category),
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
                setBlogsData(blogs);
                setLoading(false);
                // console.log(BlogData);
                // console.log(querySnap.empty);
            } catch (error) {
                console.error(error);
                toast.error("Unable to load articles");
            }
        };

        fetchBlogs();
        console.log("blog from sub blogs", blogsData)
    }, []);

    const fetchMoreBlogs = async () => {
        if (!hasMore) return;

        setInfiniteLoading(true);
        try {
            const blogRef = collection(db, "blogs");
            const q = query(
                blogRef,
                orderBy("timestamp", "desc"),
                startAfter(lastBlog),
                limit(4)
            );
            const docSnap = await getDocs(q);
            const lastVisible = docSnap.docs[docSnap.docs.length - 1];

            if (docSnap.empty) {
                setHasMore(false);
                toast.success("All blogs fetched!!");
            }

            setLastBlog(lastVisible);
            const blogs = docSnap.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }));
            setBlogsData((prevBlogs) => [...prevBlogs, ...blogs]);
        } catch (error) {
            console.error(error);
            toast.error("Could not fetch more blogs !!");
        } finally {
            setInfiniteLoading(false);
        }
    };

    const formattedDate = dayjs(blogsData?.data?.timestamp?.toDate()).format(
        "YYYY-MM-DD"
    );

    if (isSmallScreen) {
        // Render accordion for small screens
        return (
            <div >

                {!loading ? (
                    <InfiniteScroll
                        dataLength={blogsData.length}
                        next={fetchMoreBlogs}
                        hasMore={hasMore}
                        className=""
                        loader={<Loader />}
                    >
                        <Grid spacing={1} xs={12} md={8}>

                            {blogsData.map((blog) => (
                                <Grid item key={blog.id} xs={12} style={{ marginTop: "10px" }}>
                                    <Divider />

                                    <CardActionArea component="a" >
                                        <div >
                                            <Card sx={{ display: 'flex' }} onClick={() => navigate(`/category/${blog.data.blogData.category}/${blog.id}`)}>
                                                <CardMedia
                                                    component="img"
                                                    sx={{ width: 80, display: { xs: '', sm: 'block' } }}
                                                    image={blog.data.imageUrl}
                                                    alt={blog.data.imageUrl}
                                                />
                                                <CardContent sx={{ flex: 1 }}>
                                                    <Typography style={{ fontSize: "15px", fontWeight: "600" }}>
                                                        {blog.data.blogData?.title} {/* Assuming 'title' is the field in your blog data */}
                                                    </Typography>
                                                    {/* <Typography style={{fontSize:"10px",fontWeight:"600"}}>
                            {formattedDate}
                        </Typography> */}
                                                    {/* <Typography style={{fontSize:"10px",fontWeight:"300"}}>
                            {parse(blog.data.blogData.content.substring(0, 50))}
                        </Typography>
                        <Typography variant="subtitle1" color="primary">
                            Continue reading...
                        </Typography> */}
                                                </CardContent>

                                            </Card>
                                        </div>
                                    </CardActionArea>
                                </Grid>
                            ))}
                        </Grid>
                    </InfiniteScroll>
                ) : (
                    <Grid container spacing={3}>
                        <Loader />
                    </Grid>
                )}
            </div>
        );
    }


    return (
        <Container maxWidth="xl">

            {!loading ? (
                <InfiniteScroll
                    dataLength={blogsData.length}
                    next={fetchMoreBlogs}
                    hasMore={hasMore}
                    className="mx-auto mt-12"
                    loader={<Loader />}
                >
                    <Grid container spacing={1} xs={12} md={8}>
                        {blogsData.map((blog) => (
                            <Grid item key={blog.id} xs={12} >
                                <CardActionArea component="a" >
                                    <div >
                                        <Card sx={{ display: 'flex' }} onClick={() => navigate(`/category/${blog.blogsData.category}/${blog.id}`)}>
                                            <CardMedia
                                                component="img"
                                                sx={{ width: 160, display: { xs: '', sm: 'block' } }}
                                                image={blog.data.imageUrl}
                                                alt={blog.data.imageUrl}
                                            />
                                            <CardContent sx={{ flex: 1 }}>
                                                <Typography component="h2" variant="h5">
                                                    {blog.data.blogData?.title} {/* Assuming 'title' is the field in your blog data */}
                                                </Typography>
                                                
                                                <Typography variant="subtitle1" paragraph>
                                                    {parse(blog.data.blogData?.content.substring(0, 200))}
                                                </Typography>
                                                <Typography variant="subtitle1" color="primary">
                                                    Continue reading...
                                                </Typography>
                                            </CardContent>

                                        </Card>
                                    </div>
                                </CardActionArea>
                            </Grid>
                        ))}
                    </Grid>
                </InfiniteScroll>
            ) : (
                <Grid container spacing={3}>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Grid item key={index} xs={12} md={4}>
                            <CardSkeleton />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default CategoryBlogs;
