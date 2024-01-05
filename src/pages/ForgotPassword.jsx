import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Loader from '../components/Loader';
import OAuth from '../components/OAuth';
import image from '../Asset/CaraouselPicturesStatic/3.jpg';

const defaultTheme = createTheme();

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordResetEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      navigate('/sign-in');
      setLoading(false);
      toast.success('Email sent, check your mailbox!!');
    } catch (error) {
      console.log(error);
      toast.error(
        'Unable to send reset email. Please check your credentials!'
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

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
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
            height: '90vh',
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
              Forgot Password
            </Typography>
            <form onSubmit={passwordResetEmail} type="submit" style={{ width: '100%', mt: 1 }}>
              {/* Email input */}
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

              <Grid container>
                <Grid item xs sx={{ textAlign: 'center' }}>
                  <Typography
                    component="p"
                    sx={{ textAlign: 'center', pt: 3, color: 'text.primary' }}
                  >
                    Have an account?{' '}
                    <span
                      onClick={() => navigate('/sign-in')}
                      style={{
                        cursor: 'pointer',
                        backgroundImage: 'linear-gradient(to right, #FF6F61, #FF914D)',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                      }}
                    >
                      Login
                    </span>
                  </Typography>
                </Grid>
              </Grid>

              {/* Send reset email button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#3498db',
                }}
              >
                Send reset email
              </Button>

              <Grid container>
                <Grid item xs sx={{ textAlign: 'center' }}>
                  <Typography component="p" sx={{ textAlign: 'center', pt: 3, color: 'text.primary' }}>
                    OR
                  </Typography>
                </Grid>
              </Grid>
            </form>

            {/* Google authentication */}
            <OAuth />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ForgotPassword;
