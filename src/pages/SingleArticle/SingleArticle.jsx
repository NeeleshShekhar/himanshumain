/* eslint-disable react-hooks/exhaustive-deps */
import { doc, getDoc,updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { db } from "../../config/firebase";
import Loader from "../../components/Loader";
import { Balancer } from "react-wrap-balancer";
import parse from "html-react-parser";
import "react-quill/dist/quill.snow.css";
import CommentSection from "../../components/commentsSection/CommentSection";
import { getAuth } from "firebase/auth";
import dayjs from "dayjs";
import LazyLoad from "../../components/common/LazyLoad";
import { Button } from '@mui/material';
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from 'react-share';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import "./SingleArticle.css";

import { CardHeader, Avatar, IconButton, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import red from "@mui/material/colors/red";

import { Favorite, ThumbUp, Headphones, Share } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ShareIcon from "@mui/icons-material/Share";
import Card from '@mui/material/Card';
import { PauseCircle } from "@mui/icons-material";
import { useSpeechSynthesis } from 'react-speech-kit';
import RedditIcon from '@mui/icons-material/Reddit';

const SingleArticle = () => {
  const auth = getAuth();
  const [blogData, setBlogData] = useState();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { categoryName, articleId } = params;
  const currentLocation = useLocation();
  const [speaking, setSpeaking] = useState(false);
  const [liked, setLiked] = useState(false);
  const { speak, cancel } = useSpeechSynthesis();
  const [nooflikes, setNooflikes] = useState(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogRef = doc(db, "blogs", articleId);
        const docSnap = await getDoc(blogRef);
        if (docSnap.exists()) {
          setBlogData({
            id: docSnap.id,
            data: docSnap.data(),
          });
        }
        setLoading(false);
        setNooflikes(blogData.data.likes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    console.log(blogData);
  }, []);

  const toggleSpeech = () => {
    if (speaking) {
      cancel();
    } else {
      speak({ text: blogData?.data?.blogData?.content });
    }
    setSpeaking(!speaking);
  };
 
  const formattedDate = dayjs(blogData?.data?.timestamp?.toDate()).format(
    "YYYY-MM-DD"
  );

  if (loading) {
    return <Loader />;
  }

  const fallBackImage =
    "https://img.freepik.com/free-photo/digital-painting-mountain-with-colorful-tree-foreground_1340-25699.jpg?w=900&t=st=1686204841~exp=1686205441~hmac=16586e1f1340a9b9a774cd9538d3a9fc9fcd78acf00fbe2405160352f137faa4";

  // const avatar =
  //   "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=900&t=st=1686289808~exp=1686290408~hmac=ddf129d05139e33a919318574cf3f69182bb731b65ebb03b265448b8aef9cf77";

  // Dynamically generate the current URL
  const currentUrl = window.location.href;
  const textToBeShared = "whatsapp://send?text=" + "Check out the article on " + blogData.data.blogData.category + "..... Read more on various other topics" + "%0a" + "https://www.neeleshshekhar.com" + currentLocation.pathname
  
  const handleLike = async () => {
    try {
      // Get the reference to the document in Firebase
      const blogRef = doc(db, "blogs", articleId);
      setNooflikes(blogData.data.likes+1);
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
    <div className="single-article-container">
      {blogData && (
        <>
          <div>
            {/* Add Material-UI components here */}
            {/* <LazyLoad classes="article-image" image={blogData?.data?.imageUrl ? blogData?.data?.imageUrl : fallBackImage} /> */}
          </div>
          <div className="article-header">
            {/* Add Material-UI components here */}
            <div>
              <h1 >
                {blogData.data.blogData.title}
              </h1>
              <div >
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
                        <CommentIcon /> <div style={{fontSize:"20px",marginLeft:"5px"}}>{blogData.data.comments.length}</div> 
                      </IconButton>
                    </a>
                  </div>
                  {/* Right side buttons */}
                  <div className="article-buttons">
                    <IconButton>
                      <Favorite />
                    </IconButton>
                    <IconButton onClick={toggleSpeech}>
                      {speaking ? <PauseCircle /> : <Headphones />}
                    </IconButton>
                    <IconButton href={textToBeShared}>
                      <WhatsAppIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {/* Add Material-UI components here */}
            <div className="article-content">
              <Balancer className="">
                {parse(blogData?.data?.blogData?.content)}
              </Balancer>
            </div>
          </div>
        </>
      )}

      <LazyLoad classes="article-image" image={blogData?.data?.imageUrl ? blogData?.data?.imageUrl : fallBackImage} />
      <div className="" id="comments">
        {/* Add Material-UI components for comments section */}
        <Typography variant="h4" className="comment-section-title">
          Comments
        </Typography>
        <div className="fetched-comments">
          {blogData?.data?.comments &&
            blogData?.data?.comments?.map((comment, index) => {
              const formatDate = dayjs(comment.timestamp).format("DD-MM-YYYY");
              return (
                <Card key={index} className="comment-box" elevation={0}>
                  <CardHeader
                    avatar={
                      <Avatar alt="Avatar" src={`${comment.userImage ? comment.userImage : avatar}`} />
                    }
                    title={!comment.userName ? "Anonymous" : comment.userName}
                    subheader={formatDate}
                  />
                  <p className="comment-text">{comment.comment}</p>
                </Card>
              );
            })
          }
        </div>
        <CommentSection />
      </div>
    </div>
  );
};

export default SingleArticle;
