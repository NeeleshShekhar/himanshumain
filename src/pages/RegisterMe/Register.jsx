import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import imageregister from "../../Asset/CaraouselPicturesStatic/3.jpg";
import OAuth from "../../components/OAuth";

const defaultTheme = createTheme();

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    image: '',
  });

  const { firstName, lastName, email, password, image } = formData;

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // for image
    if (e.target.files) {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Your existing logic for storing image and registering user goes here...

    try {
      // Existing logic for creating user and storing image...

      toast.success("User registered successfully, Welcome!!");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '90vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${imageregister})`,
            backgroundRepeat: 'no-repeat',
            height:"90vh",
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register Yourself
            </Typography>
            <div style={{padding:"20px"}}>
            <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 1 }}>
              {/* Rest of the form elements */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                autoFocus
                onChange={onChangeHandler}
                value={firstName}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={onChangeHandler}
                value={lastName}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={onChangeHandler}
                value={email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={onChangeHandler}
                value={password}
              />

              {/* File/image */}
              <input
                onChange={onChangeHandler}
                type="file"
                id="file"
                style={{ display: "none" }}
                maxLength={1}
                accept=".jpg,.png,.jpeg"
              />
              <label
                htmlFor="file"
                style={{color:"black",textAlign:"center"}}
              >
                Add an avatar
              </label>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>

              <Grid container>
                <Grid item xs sx={{ textAlign: 'center' }}>
                  <Link href="/sign-in" variant="body2" sx={{ textAlign: 'center', textDecoration: "none" }}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
            </div>
            {/* Google authentication */}
            <OAuth />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Register;



/* try {
      const auth = getAuth();
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    updateProfile(auth.currentUser, {
      displayName: name,
    })
    const user = userCredentials.user;
    const formDataCopy = {...formData }
    delete formDataCopy.password;
    formDataCopy.timestamps = serverTimestamp();

    await setDoc(doc(db, "users", user.uid), formDataCopy);
    toast.success("You have succesrsfuly signed up, Welcome!!")

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong with the registration")
    }
     */
