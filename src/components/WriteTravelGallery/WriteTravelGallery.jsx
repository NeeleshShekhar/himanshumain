import React, { useState } from 'react';
import { db } from '../../config/firebase';
import { TextField, Button, InputLabel, FormControl, Grid, IconButton, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { getAuth } from "firebase/auth";

import { toast } from "react-hot-toast";

const WriteTravelGallery = () => {
  const auth = getAuth();
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [featureImage, setFeatureImage] = useState(null);
  const [textInputs, setTextInputs] = useState(['']);
  const [loading, setLoading] = useState(false);
   
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFeatureImage(file);
  };

  const handleTextInputChange = (index, value) => {
    const newTextInputs = [...textInputs];
    newTextInputs[index] = value;
    setTextInputs(newTextInputs);
  };

  const handleAddTextInput = () => {
    setTextInputs([...textInputs, '']);
  };

  const handlePostData = async (e) => {
    setLoading(true);

    e.preventDefault();
    try {
      const blogRef = collection(db, "posts");
      const data = await addDoc(blogRef, {
        uuid: uuidv4(),
        timestamp: serverTimestamp(),
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
        state,
        country,
        featureImage,
        textInputs,
      });
      console.log(data);
      navigate(`/travel/`);
      setLoading(false);
      toast.success("Gallery published");
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Unable to publish post");
    }


  };

  return (
    <div className='container'>

      <Paper container style={{ marginTop: "50px", padding: "50px" }} >
        <Grid container spacing={2}>
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
          <Grid item xs={12}>
            <FormControl fullWidth>
              <br />
              <div>Feature Image:</div>
              <input type="file" onChange={handleImageChange} />

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
          <Grid item xs={12}>
            <Button variant="contained" onClick={handlePostData}>
              Post Data to Firebase
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default WriteTravelGallery;
