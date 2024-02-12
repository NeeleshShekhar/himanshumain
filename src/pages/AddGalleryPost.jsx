import { useState } from "react";
import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { db } from "../config/firebase";
import { toast } from "react-hot-toast";
import { TextField, Button, InputLabel, FormControl, Grid, IconButton, Paper } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { v4 as uuidv4 } from "uuid";
import BlogEditor from "../components/BlogEditor";
import { Balancer } from "react-wrap-balancer";
import Dropdown from "../components/Dropdown";
import useImageUpload from "../hooks/useImageUpload";
import AddIcon from '@mui/icons-material/Add';

const AddGalleryPost = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const { image, title } = blogData;
  const { storeImage } = useImageUpload(image);
  const [textInputs, setTextInputs] = useState(['']);
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  // To get category


  // Add details to blogData state
  const onChangeHandler = (e) => {
    if (e.target.id === "title") {
      setBlogData({
        ...blogData,
        title: e.target.value,
      });
    }
    console.log(blogData);
    if (e.target.files) {
      setBlogData({
        ...blogData,
        image: e.target.files[0],
      });
    }
    // console.log(blogData);
  };

  // Submit details to firebase
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (blogData.content && blogData.title) {
      try {
        const imageUrl = await storeImage(blogData.image);
        delete blogData.image;
        const blogRef = collection(db, "posts");
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
          imageUrl,
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
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please fill all the fields");
      setLoading(false);
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
        <input
          onChange={onChangeHandler}
          type='file'
          maxLength={1}
          accept='.jpg,.png,.jpeg'
          className='mt-5 w-full rounded-md border border-zinc-800 py-3 pl-3 text-zinc-700'
        />

        <Grid item xs={12}>
          <FormControl fullWidth>
            <div>State:</div>
            <TextField type="text" value={state} onChange={(e) => setState(e.target.value)} fullWidth />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <div>Country:</div>
            <TextField type="text" value={country} onChange={(e) => setCountry(e.target.value)} fullWidth />
          </FormControl>
        </Grid>
        {textInputs.map((text, index) => (
          <Grid item xs={12} key={index}>
            <FormControl fullWidth>
              <div>{`Text Input ${index + 1}:`}</div>
              <TextField type="text" value={text} onChange={(e) => handleTextInputChange(index, e.target.value)} fullWidth />
            </FormControl>
          </Grid>
        ))}
        <Grid item xs={12}>
          <IconButton onClick={handleAddTextInput}>
            <AddIcon />
          </IconButton>
        </Grid>
        <BlogEditor blogData={blogData} setBlogData={setBlogData} />
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
