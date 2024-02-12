/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import TravelCaraousel from "./TravelCaraousel";
import YouTubeViewer from "../../components/YoutubeViewer/YoutubeViewer";
import TravelBlogs from "./TravelBlogAll";


const TravelMain = (props) => {
  return (
    <div className='container'>
     <TravelCaraousel />
     <br />
     <TravelBlogs />
    </div>
  );
};

export default TravelMain;
