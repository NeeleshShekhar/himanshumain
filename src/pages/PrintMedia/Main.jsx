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
import FeaturedBlogCard from './PrintArticle';
import Loader from "../../components/Loader";
import FeaturedBlog from "./FeaturedPrintArticle";
import Blogs from "./PrintArticle";
import "./PrintMedia.css";

const PrintMain = () => {
    

    

    return (
        <div className="container">
            {/* Tags/categories */}
        {/* <Typography component="h2" variant="h3">Print Media</Typography> */}
            {/* <FeaturedBlog blogsData={blogsData} /> */}<br />
            <Blogs />
        </div>
    );
};

export default PrintMain;
