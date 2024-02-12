import React, { useState } from "react";
import CommentTextArea from "./CommentTextArea";
import { getAuth } from "firebase/auth";
import Loader from "../Loader";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import "./commentSection.css"; // Import the custom CSS file

const CommentSection = () => {
  const auth = getAuth();
  const { articleId } = useParams();
  const [loading, setLoading] = useState(false);
  const [inputText, setinputText] = useState("");

  const onChangeHandler = (e) => {
    setinputText(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (auth) {
        const blogRef = doc(db, "blogs", articleId);
        const commentData = {
          comment: inputText.trim(),
          userId: auth.currentUser.uid,
          userName: auth.currentUser.displayName,
          userImage: auth.currentUser.photoURL,
          timestamp: new Date().toISOString(),
          uuid: uuidv4(),
        };

        const blogSnapshot = await getDoc(blogRef);
        const blogData = blogSnapshot.data();

        if (!blogData.comments) {
          await setDoc(blogRef, { ...blogData, comments: [commentData] });
        } else {
          await updateDoc(blogRef, {
            comments: [...blogData.comments, commentData],
          });
        }

        setinputText("");
        toast.success("Comment Posted!!");
        console.log("Try finished");
        window.location.reload();
      }
    } catch (error) {
      if (!auth.currentUser) {
        Swal.fire("You need to be logged in to post a comment.");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="">
      {/* <Typography variant="h4" className="comment-section-title">
        Comments
      </Typography> */}
      <form onSubmit={onSubmitHandler} className="comment-form">
        <CommentTextArea
          inputText={inputText}
          onChangeHandler={onChangeHandler}
          auth={auth}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="post-comment-button"
        >
          Post comment
        </Button>
      </form>
    </div>
  );
};

export default CommentSection;
