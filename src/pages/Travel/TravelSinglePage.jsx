/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { doc, getDoc,updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { db } from "../../config/firebase";
import Loader from "../../components/Loader";
import "react-quill/dist/quill.snow.css";
import { getAuth } from "firebase/auth";
import dayjs from "dayjs";
import "./travelsinglePage.css";
import { useSpeechSynthesis } from 'react-speech-kit';
import { CardHeader, Avatar, IconButton, Typography } from "@mui/material";
import red from "@mui/material/colors/red";
import parse from "html-react-parser";
import { Favorite, ThumbUp, Headphones, Share } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ShareIcon from "@mui/icons-material/Share";
import { Balancer } from "react-wrap-balancer";
import LazyLoad from "../../components/common/LazyLoad";
import { Carousel } from 'react-bootstrap';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import ImageGallery from './TravelGallery';
import MyGallery from './Gallery';

const TravelSinglePage = () => {

    const auth = getAuth();
    const [blogData, setBlogData] = useState();
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const { travelId } = params;
    const [open, setOpen] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const { speak, cancel } = useSpeechSynthesis();
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const blogRef = doc(db, "posts", travelId);
                const docSnap = await getDoc(blogRef);
                console.log("entered try block");
                if (docSnap.exists()) {
                    setBlogData({
                        id: docSnap.id,
                        data: docSnap.data(),
                    });
                }
                setLoading(false);
                console.log(blogData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
        console.log(blogData);
    }, []);

    const formattedDate = dayjs(blogData?.data?.timestamp?.toDate()).format(
        "YYYY-MM-DD"
    );

    if (loading) {
        return <Loader />;
    }

    const fallBackImage =
        "https://img.freepik.com/free-photo/digital-painting-mountain-with-colorful-tree-foreground_1340-25699.jpg?w=900&t=st=1686204841~exp=1686205441~hmac=16586e1f1340a9b9a774cd9538d3a9fc9fcd78acf00fbe2405160352f137faa4";

    const handleLike = async () => {
        try {
            // Get the reference to the document in Firebase
            const blogRef = doc(db, "posts", travelId);
            
            // Update the "likes" field in the document
            await updateDoc(blogRef, {
                likes: (blogData.data.likes || 0) + 1,
            });

            // Update the local state to reflect the change
            setLiked(true);
        } catch (error) {
            console.error("Error updating likes:", error);
        }
    };
    return (
        <div className='container' >
            {/* <pre>{JSON.stringify(blogData.data, null, 2)}</pre> */}

            {blogData && (
                <>
                    <div className='single-article-container' >
                        <div style={{ fontFamily: "PopinsExtraBold", fontSize: "2rem" }}>{blogData.data.blogData.title}</div>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    {parse(blogData.data.author?.name.substring(0, 1))}
                                </Avatar>
                            }
                            title={blogData.data.author.name}
                            subheader={formattedDate}
                            className="author-details"
                        />
                        {/* Add the new component here */}
                        <div className="article-actions">
                            {/* Left side icons */}
                            <div>
                                <IconButton onClick={handleLike} disabled={liked}>
                                    <ThumbUp /><div style={{fontSize:"20px",marginLeft:"5px"}}>{blogData.data.likes}</div> 
                                </IconButton>
                                <a href="#comments">
                                    <IconButton>
                                        <CommentIcon />
                                    </IconButton>
                                </a>
                            </div>
                            {/* Right side buttons */}
                            <div className="article-buttons">
                                <IconButton>
                                    <Favorite />
                                </IconButton>

                                <IconButton>
                                    <Share />
                                </IconButton>
                            </div>
                        </div>
                        <LazyLoad classes="article-image" image={blogData?.data?.imageUrl ? blogData?.data?.imageUrl : fallBackImage} />
                        <div>
                            {/* Add Material-UI components here */}
                            <div className="article-content">
                                <Balancer className="text-[18px] leading-7 md:text-[23px] md:leading-9 lg:leading-10">
                                    {parse(blogData?.data?.blogData?.content)}
                                </Balancer>
                            </div>
                        </div>
                        {/* <ImageGallery textInputs={blogData.data.textInputs} /> */}
                        <MyGallery textInputs={blogData.data.textInputs} />
                    </div>



                </>
            )}
        </div>
    );
};

export default TravelSinglePage;
