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
import BlogsHome from "./BlogsHome";
import YouTubeViewer from "../../components/YoutubeViewer/YoutubeViewer";

const MainHome = (props) => {
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
      <HomeCaraousel />
      <Tags />
      <BlogsHome />
      <YouTubeViewer channelName={"SonicSiblings"} videoId={"pbyWnPltku8"} />
      <Home2 />
    </div>
  );
};

export default MainHome;
