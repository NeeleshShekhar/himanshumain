/* eslint-disable react-hooks/exhaustive-deps */
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { db } from "../config/firebase";
import Loader from "../components/Loader";
import { Balancer } from "react-wrap-balancer";
import parse from "html-react-parser";
import "react-quill/dist/quill.snow.css";
import CommentSection from "../components/commentsSection/CommentSection";
import { getAuth } from "firebase/auth";
import dayjs from "dayjs";
import LazyLoad from "../components/common/LazyLoad";
import { Button } from '@mui/material';
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from 'react-share';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const SingleArticle = () => {
  const auth = getAuth();
  const [blogData, setBlogData] = useState();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { categoryName, articleId } = params;
  const currentLocation = useLocation();
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
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const formattedDate = dayjs(blogData?.data?.timestamp?.toDate()).format(
    "YYYY-MM-DD"
  );

  if (loading) {
    return <Loader />;
  }

  const fallBackImage =
    "https://img.freepik.com/free-photo/digital-painting-mountain-with-colorful-tree-foreground_1340-25699.jpg?w=900&t=st=1686204841~exp=1686205441~hmac=16586e1f1340a9b9a774cd9538d3a9fc9fcd78acf00fbe2405160352f137faa4";

  const avatar =
    "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=900&t=st=1686289808~exp=1686290408~hmac=ddf129d05139e33a919318574cf3f69182bb731b65ebb03b265448b8aef9cf77";

  // Dynamically generate the current URL
  const currentUrl = window.location.href;
  const textToBeShared = "whatsapp://send?text=" + "Check out the article on " + blogData.data.blogData.category + "..... Read more on various other topics" + "%0a" + "https://www.neeleshshekhar.com" + currentLocation.pathname
  return (
    <div className=' mx-auto max-w-7xl text-gray-400 prose-h1:text-indigo-500 prose-h2:py-2 prose-h2:text-2xl prose-h2:text-emerald-500 prose-h3:text-zinc-500  prose-p:tracking-wide prose-a:text-blue-500 prose-a:underline prose-li:list-disc  prose-li:font-mono '>
      {blogData && (
        <>
          <div className='mx-auto mt-14 w-[90%] lg:w-[60%]'>
            <LazyLoad
              classes={""}
              image={
                blogData?.data?.imageUrl
                  ? blogData?.data?.imageUrl
                  : fallBackImage
              }
            // Set the width to 100%
            />


          </div>
          <div className="flex justify-between mt-4">

<a href="#comments">comment</a>
          </div>
          <div className='mx-4'>
            {/* <p className=' px-10 pt-10 text-white'>
              {" "}
              Tags:{" "}
              <span className='ml-3 rounded-xl  bg-emerald-600 px-4 py-2 text-white'>
                {blogData.data.blogData.category}
              </span>{" "}
            </p> */}
            <h1 className='mx-auto mt-12 w-full text-center ' style={{ color: "black" }}>
              <Balancer>{blogData.data.blogData.title}-</Balancer>
            </h1>
            <div className='mt-5 flex items-center justify-center'>
              <img
                className='author-avatar'
                src={avatar}
                alt='Rounded avatar'
              />
              <p>
                <i className='font-extralight text-gray-400'>
                  written by ~{" "}
                </i>{" "}
                <strong> {blogData.data.author.name} </strong> on{" "}
                <strong>{formattedDate}</strong>
              </p>
            </div>
            <div className='mt-5 flex items-center justify-center'>
              <a href={textToBeShared} style={{ textDecoration: "none", color: "black" }} ><WhatsAppIcon style={{ fontSize: "35px", color: 'green' }} />Share on Whatsapp</a>

            </div>
            <article className='space-y-3 hyphens-auto px-4 py-10  ' style={{ color: "grey" }}>
              <Balancer className='text-[18px] leading-7 md:text-[23px] md:leading-9 lg:leading-10 '>
                {parse(blogData?.data?.blogData?.content)}
              </Balancer>
            </article>
          </div>
        </>
      )}
      <div className='mx-auto mb-10 mt-3 w-[80%] lg:w-full lg:px-20' id="comments">
        <CommentSection />

        {/* Fetched Comments */}
        <div className='max-h-[30rem] space-y-4 overflow-y-scroll'>
          {blogData?.data?.comments &&
            blogData?.data?.comments?.map((comment, index) => {
              const formatDate = dayjs(comment.timestamp).format("DD-MM-YYYY");
              return (
                <div key={index} className='mt-6 rounded-md bg-zinc-800 p-2'>
                  <ul className='relative flex items-center pt-2 '>
                    <img
                      className='mr-3 h-10 w-10 rounded-full'
                      src={`${comment.userImage ? comment.userImage : avatar}`}
                      alt='Rounded avatar'
                    />
                    <span className='pl-1'>
                      <strong>
                        {!comment.userName ? "Anonymous" : comment.userName}
                      </strong>{" "}
                      <span className='pl-2 text-zinc-600'> {formatDate} </span>
                    </span>
                    <span className='absolute right-3 cursor-pointer active:scale-95'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='h-8 w-8'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                        />
                      </svg>
                    </span>
                  </ul>
                  <p className='ml-14 w-[80%] pt-2'>{comment.comment}</p>
                </div>
              );
            })}
        </div>
      </div>

      {/* Social Media Sharing Options */}

    </div>
  );
};

export default SingleArticle;
