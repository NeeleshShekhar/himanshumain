/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Search from "../../components/Search";
import { Container, Carousel, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import Card from "../../components/Card";
import Hero from "../../components/Hero";
import { Balancer } from "react-wrap-balancer";
import Tags from "../../components/common/Tags";
import Loader from "../../components/Loader";
import CardSkeleton from "../../components/skeleton/CardSkeleton";
import Home2 from "./Home2";
import Home3 from "./Home3";
import HomeCaraousel from "../../components/HomeCaraousel";
import { Grid } from "@mui/material";

const BlogsHome = (props) => {
  const [latestBlogs, setLatestBlogs] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLatestArticles = async () => {
      setLoading(true);
      const blogRef = collection(db, "blogs");
      const q = query(blogRef, where("isPublished", "==", "true"), orderBy("timestamp", "desc"), limit(6));
      const docSnap = await getDocs(q);
      let blogs = [];
      docSnap.forEach((doc) => {
        blogs.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setLatestBlogs(blogs);
      setLoading(false);
    };
    fetchLatestArticles();
  }, []);

  const renderCardsInGroup = (group) => (
    <Row>
      {group.map((blog, index) => (
        <Col md={4} key={index}>
          <Card id={blog.id} blog={blog.data} />
        </Col>
      ))}
    </Row>
  );

  return (
    <div className=''>

      {/* Articles Carousel */}
      <Container fluid className="mx-auto max-w-7xl transition-all duration-300 ease-in-out">
        <Carousel className="mt-4">
          {loading ? (
           Array.from({ length: 1 }).map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <CardSkeleton />
            </Grid>
          
            ))
          ) : latestBlogs && latestBlogs.length > 0 ? (
            Array.from({ length: Math.ceil(latestBlogs.length / 3) }).map((_, index) => (
              <Carousel.Item key={index}>
                {renderCardsInGroup(latestBlogs.slice(index * 3, (index + 1) * 3))}
              </Carousel.Item>
            ))
          ) : (
            <Carousel.Item>
              <p className='mt-24 text-center text-4xl font-extrabold'>
                No Article found
              </p>
            </Carousel.Item>
          )}
        </Carousel>
      </Container>

      
    </div>
  );
};

export default BlogsHome;
