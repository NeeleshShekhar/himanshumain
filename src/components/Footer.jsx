import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <div style={{bottom: 0, width: '100%', background: 'rgb(2, 141, 222)' }}>
      <Toolbar style={{ justifyContent: 'center' }}>
        <Typography variant="body1" color="inherit">
          Your Footer Content Here
        </Typography>
      </Toolbar>
    </div>
  );
};

export default Footer;