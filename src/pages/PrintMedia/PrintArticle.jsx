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
        const querySnapshot = await getDocs(collection(db, "printmedia"));
        const blogs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBlogsData(blogs);
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

                  <CardMedia
                    component="iframe"
                    src={blog.link}
                    title={blog.title}
                    style={{ height: 300, position: "relative" }}
                  />


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
        <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
          <DialogTitle>{selectedBlog?.title}</DialogTitle>
          <DialogContent>
            <CardMedia
              component="iframe"
              src={selectedBlog?.link}
              title={selectedBlog?.title}
              style={{ height: 600 }}
            />
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

                <CardMedia
                  component="iframe"
                  src={blog.link}
                  title={blog.title}
                  style={{ height: 300, position: "relative" }}
                />


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
          <CardMedia
            component="iframe"
            src={selectedBlog?.link}
            title={selectedBlog?.title}
            style={{ height: 600 }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Blogs;
