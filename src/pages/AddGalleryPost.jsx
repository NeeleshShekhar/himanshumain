import { useState } from "react";
import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-hot-toast";
import { TextField, Button, InputLabel, FormControl, Grid, IconButton, Paper } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { v4 as uuidv4 } from "uuid";
import BlogEditor from "../components/BlogEditor";
import { Balancer } from "react-wrap-balancer";
import Dropdown from "../components/Dropdown";
import useImageUpload from "../hooks/usePhotoImageUpload";
import AddIcon from '@mui/icons-material/Add';

const AddGalleryPost = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    // Remove image field from blogData
  });
  const { title } = blogData;
  const { storeImage } = useImageUpload(); // No need to pass image here
  const [textInputs, setTextInputs] = useState(['']);
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [images, setImages] = useState([]); // State to store selected images

  // Add details to blogData state
  const onChangeHandler = (e) => {
    if (e.target.id === "title") {
      setBlogData({
        ...blogData,
        title: e.target.value,
      });
    }
    // Store all selected files in an array
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages(selectedFiles);
    }
  };

  // Submit details to firebase
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload all selected images and get their URLs
      const imageUrls = await Promise.all(images.map(image => storeImage(image)));
      const blogRef = collection(db, "gallery");
      await addDoc(blogRef, {
        uuid: uuidv4(),
        timestamp: serverTimestamp(),
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
        blogData,
        state,
        country,
        imageUrls, // Store array of image URLs
        comments: [],
        isPublished: "false",
        textInputs,
      });
      navigate(`/travel/`);
      setLoading(false);
      toast.success("Gallery published");
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Unable to publish Gallery Post");
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (loading) {
    return <Loader />;
  }

  const handleTextInputChange = (index, value) => {
    const newTextInputs = [...textInputs];
    newTextInputs[index] = value;
    setTextInputs(newTextInputs);
  };

  const handleAddTextInput = () => {
    setTextInputs([...textInputs, '']);
  };

  return (
    <div className='h-full '>
      <h1 className='bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text py-4 pt-14 text-center font-raleway text-4xl font-extrabold text-transparent md:text-5xl'>
        <Balancer>Create a new Gallery post</Balancer>
      </h1>
      <form
        onSubmit={onSubmitHandler}
        className='mx-auto mt-[60px] w-[90%] max-w-3xl md:w-full lg:max-w-4xl'
      >
        {/* Categories */}

        <input
          onChange={onChangeHandler}
          type='text'
          className='mt-5 h-12 w-full rounded-md border-zinc-800 pl-3 text-zinc-700'
          value={title}
          id='title'
          placeholder='Enter title here...'
        />
        {/* Allow multiple file selection */}
        <input
          onChange={onChangeHandler}
          type='file'
          maxLength={1}
          multiple
          accept='.jpg,.png,.jpeg'
          className='mt-5 w-full rounded-md border border-zinc-800 py-3 pl-3 text-zinc-700'
        />

        
        <div className='mx-auto my-8 w-full max-w-[50%] lg:max-w-[40%] '>
          <button
            type='submit'
            className='mt-20 w-full cursor-pointer rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 py-3 font-semibold text-white transition duration-200 ease-in-out active:scale-90 md:mt-8'
          >
            Publish post
          </button>
        </div>
      </form>
      <div></div>
    </div>
  );
};

export default AddGalleryPost;
