/* eslint-disable react-hooks/exhaustive-deps */
import {
    collection,
    doc,
    getDocs,
    limit,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { useParams } from "react-router-dom";
import { Box, Container, Grid, Typography, Slider } from "@mui/material";
import CategoryFeaturedArticle from "./CategoryFeaturedArticle";
import Tags from "../../components/common/Tags";
import CategoryBlogs from "./CategoryBlogs";
import Loader from "../../components/Loader";

const Category = () => {
    const [BlogData, setBlogData] = useState(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const blogRef = collection(db, "blogs");
                const q = query(
                    blogRef,
                    where(`blogData.category`, "==", params.categoryName),
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
                // console.log(BlogData);
                // console.log(querySnap.empty);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        fetchData();
    }, [params.categoryName]);

    return (
        <Container maxWidth="xl">

            {loading ? (
                <Loader />
            ) : BlogData && BlogData.length > 0 ? (
                <div>
                    <Tags />
                    <CategoryFeaturedArticle blogsData={BlogData} />
                    <CategoryBlogs category={params.categoryName} />
                </div>
            ) : (
                <p className=' text-center text-4xl font-bold'>
                   <Tags /><br/> No Article yet created
                </p>
            )}

        </Container>
    );
};

export default Category;
