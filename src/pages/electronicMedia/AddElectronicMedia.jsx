import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";

const AddElectronicMedia = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [featured, setFeatured] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "ElectronicMedia"), {
        title,
        link,
        featured,
      });
      console.log("Document written with ID: ", docRef.id);
      // Optionally, show a success message or redirect the user
      // Clear the form after successful submission
      setTitle("");
      setLink("");
      setFeatured(false);
      alert("Item Created");
    } catch (error) {
      console.error("Error adding document: ", error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div className="container">
        <br />
      <h2>Add New Electronic Media</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          label="Link"
          variant="outlined"
          fullWidth
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              color="primary"
            />
          }
          label="Featured"
        />
        <br />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddElectronicMedia;
