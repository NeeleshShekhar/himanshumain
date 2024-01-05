/* eslint-disable react-hooks/exhaustive-deps */
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { getAuth } from "firebase/auth";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import Loader from "../components/Loader";
import Card from "../components/Card";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import CardSkeleton from "../components/skeleton/CardSkeleton";

const MyBlogs = () => {
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const [userBlog, setUserBlog] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const blogRef = collection(db, "blogs");
      const q = query(
        blogRef,
        where(`author.id`, "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );

      const docSnap = await getDocs(q);
      let blogs = [];
      docSnap.forEach((doc) => {
        blogs.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setUserBlog(blogs);
      setLoading(false);
    };
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    const showConfirmation = () => {
      return Swal.fire({
        title: "Confirm Delete?",
        text: "Are you sure you want to delete this post?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "Cancel",
      });
    };

    const result = await showConfirmation();
    if (auth.currentUser && result.isConfirmed) {
      try {
        const ref = doc(db, "blogs", id);
        await deleteDoc(ref);
        setUserBlog(userBlog.filter((blog) => blog?.id !== id));
        toast.success("Post deleted");
      } catch (error) {
        console.log(error.message);
        toast.error("Post not deleted");
      }
    }
  };

  return (
    <div style={{ margin: "auto", marginTop: "80px", width: "80%" }}>
      

      <Grid container spacing={2}>
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Grid item key={index} xs={12} md={6} lg={4}>
              <CardSkeleton />
            </Grid>
          ))
        ) : userBlog && userBlog.length > 0 ? (
          userBlog.map((blog, index) => (
            <Grid item key={index} xs={12} md={6} lg={4}>
              <Card
                id={blog?.id}
                blog={blog?.data}
                deleteHandler={deleteHandler}
              />
            </Grid>
          ))
        ) : (
          <Typography
            style={{
              marginTop: "120px",
              textAlign: "center",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            You have not posted any article yet!!
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default MyBlogs;