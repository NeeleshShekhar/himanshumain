import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { v4 as uuidv4 } from "uuid";
import useImageUpload from "../hooks/useImageUpload";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  TextareaAutosize,
} from "@mui/material";

const CarouselInformation = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [carouselInfo, setCarouselInfo] = useState({
    title: "First",
    description: "",
    image: null,
  });
  const [carouselList, setCarouselList] = useState([]);
  const { image, title, description } = carouselInfo;
  const { storeImage } = useImageUpload(image);

  const onChangeHandler = (e) => {
    const { id, value, files } = e.target;

    setCarouselInfo((prevInfo) => ({
      ...prevInfo,
      [id]: id === "image" ? files[0] : value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await storeImage(carouselInfo.image);
      delete carouselInfo.image;

      const carouselRef = collection(db, "caraouselInformation");
      const newDoc = {
        id: uuidv4(),
        timestamp: serverTimestamp(),
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
        ...carouselInfo,
        imageUrl,
      };

      await addDoc(carouselRef, newDoc);

      setCarouselList((prevList) => [...prevList, newDoc]);
      setCarouselInfo({
        title: "First",
        description: "",
        image: null,
      });

      setLoading(false);
      toast.success("Carousel information added successfully");
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Unable to add carousel information");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={onChangeHandler}
        />
        <TextareaAutosize
          id="description"
          placeholder="Description"
          style={{ width: "100%", minHeight: "80px", marginTop: "10px" }}
          value={description}
          onChange={onChangeHandler}
        />
        <input
          onChange={onChangeHandler}
          type="file"
          accept=".jpg, .png, .jpeg"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
        >
          Add Carousel Information
        </Button>
      </form>

      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carouselList.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={{ width: "50px", height: "50px" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CarouselInformation;
