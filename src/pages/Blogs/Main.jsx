/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Box, Container, Grid, Typography, Slider } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";
import Tags from "../../components/common/Tags";
import FeaturedBlogCard from './Blogs';
import Loader from "../../components/Loader";
import FeaturedBlog from "./FeaturedBlog";
import Blogs from "./Blogs";
import "./blogs.css";

const ArticleMain = () => {
    const [blogsData, setBlogsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastBlog, setLastBlog] = useState(null);
    const [infiniteLoading, setInfiniteLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const blogRef = collection(db, "blogs");
                const q = query(blogRef, orderBy("timestamp", "desc"));
                const docSnap = await getDocs(q);
                const blogs = docSnap.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }));
                setBlogsData(blogs);
                setLoading(false);
            } catch (error) {
                console.error(error);
                toast.error("Unable to load articles");
            }
        };

        fetchBlogs();
        console.log("blogs from main", blogsData)
    }, []);

    

    return (
        <Container maxWidth="xl">
            {/* Tags/categories */}
            <Tags />
            <FeaturedBlog blogsData={blogsData} />
            <Blogs />
        </Container>
    );
};

export default ArticleMain;
