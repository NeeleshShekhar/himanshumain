import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Grid, CardActionArea, Card, CardContent, Typography, CardMedia, Divider, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import Loader from "../../components/Loader";
import CardSkeleton from "../../components/skeleton/CardSkeleton";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CardHeader } from "react-bootstrap";

const Blogs = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [blogsData, setBlogsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ElectronicMedia"));
        const blogs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBlogsData(blogs);
        console.log("data is", blogsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        // Handle error gracefully, e.g., show error message to the user
      }
    };

    fetchBlogs();
  }, []);

  const handleView = (blog) => {
    setSelectedBlog(blog);
    setOpenModal(true);
  };

  const getYoutubeEmbedLink = (link) => {
    const videoId = link?.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedBlog(null);
  };

  if (isSmallScreen) {
    return (
      <div>
        {!loading ? (
          <Grid container spacing={2}>
            {blogsData.map((blog) => (
              <Grid item key={blog.id} xs={12}>
                <Card elevation={0}>
                  <CardHeader
                    title={blog.title}></CardHeader>

                  <iframe
                    width="100%"
                    height="315"
                    src={getYoutubeEmbedLink(blog.link)}
                    title="YouTube Video"
                    frameBorder="0"
                    allowFullScreen
                    style={{ boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)' }}

                  ></iframe>


                  <CardActionArea >

                    <IconButton
                      aria-label="view"

                      onClick={() => handleView(blog)}
                    >
                      <Visibility />
                    </IconButton>
                  </CardActionArea>
                </Card>
                <Divider />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Loader />
        )}
        <Dialog open={openModal} onClose={handleCloseModal} height="600px" maxWidth="md" fullWidth>
          <DialogTitle>{selectedBlog?.title}</DialogTitle>
          <DialogContent height="600px">
            <iframe
              width="100%"
              height="600px"
              src={getYoutubeEmbedLink(blog.link)}
              title="YouTube Video"
              frameBorder="0"
              allowFullScreen
              style={{ boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)' }}

            ></iframe>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div>
      {!loading ? (
        <Grid container spacing={2}>
          {blogsData.map((blog) => (
            <Grid item key={blog.id} xs={12} sm={6} md={4} lg={4}>
              <Card elevation={0}>
                <CardHeader
                  title={blog.title}>

                </CardHeader>

                <iframe
                  width="100%"
                  height="315"
                  src={getYoutubeEmbedLink(blog.link)}
                  title="YouTube Video"
                  frameBorder="0"
                  allowFullScreen
                  style={{ boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)' }}

                ></iframe>

                <CardActionArea   >

                  <IconButton
                    aria-label="view"

                    onClick={() => handleView(blog)}
                  >
                    <Visibility />
                  </IconButton>

                  <IconButton
                    aria-label="view"
                    target="_blank"
                    href={blog.link}
                  >
                    View Link
                  </IconButton>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Loader />
      )}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle>{selectedBlog?.title}</DialogTitle>
        <DialogContent>
          <iframe
            width="100%"
            height="315"
            src={getYoutubeEmbedLink(selectedBlog?.link)}
            title="YouTube Video"
            frameBorder="0"
            allowFullScreen
            style={{ boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)' }}

          ></iframe>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Blogs;
