import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { db } from '../../config/firebase';
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

const TravelBlogs = () => {
  const [blogsData, setBlogsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogRef = collection(db, "posts");
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
  }, []);


  if (isSmallScreen) {
    return (
      <div className='container'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Grid container spacing={3}>
            {blogsData.map((blog) => (
              <Grid item key={blog.id} xs={12} sm={6} md={4} style={{height:200, marginBottom:"10px"}} elevation={0}>

                <Card style={{ position: 'relative', height:200 }} onClick={() => navigate(`/travel/${blog.id}`)}>
                  <CardMedia
                    component="div"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      height:200,
                      backgroundImage: `url(${blog.data.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <CardContent style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                      <Typography variant="h6" component="div" style={{ color: 'white' }}>
                        {blog.data.blogData.title}
                      </Typography>
                      <Typography color="textSecondary" style={{ color: 'white' }}>
                        {blog.data.author.name}, {blog.data.country}
                      </Typography>
                     
                    </CardContent>
                  </CardMedia>
                </Card>

              </Grid>
            ))}
          </Grid>
        )}
      </div>
    );
  }


  return (
    <div className='container'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Grid container spacing={3}>
          {blogsData.map((blog) => (
            <Grid item key={blog.id} xs={12} sm={6} md={4}>

              <Card style={{ position: 'relative', paddingBottom: '100%' }} onClick={() => navigate(`/travel/${blog.id}`)}>
                <CardMedia
                  component="div"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,

                    backgroundImage: `url(${blog.data.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <CardContent style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                    <Typography variant="h6" component="div" style={{ color: 'white' }}>
                      {blog.data.blogData.title}
                    </Typography>
                    <Typography color="textSecondary" style={{ color: 'white' }}>
                      {blog.data.author.name}, {blog.data.country}
                    </Typography>
                    <Typography className='texttravelblogal'>
                      hello
                    </Typography>
                  </CardContent>
                </CardMedia>
              </Card>

            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default TravelBlogs;
