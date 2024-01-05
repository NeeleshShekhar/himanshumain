import React from 'react';
import { Container, Grid } from '@mui/material';
import InstagramEmbed from 'react-instagram-embed';

const SocialMediaComponent = () => {
  return (
    <Container>
      <Grid container justifyContent="center" spacing={2}>
        
        <Grid item xs={12} md={6}>
          {/* Twitter Embed */}
          <a
            className="twitter-timeline"
            href="https://twitter.com/adityashuklaIIS"
            data-chrome="noheader nofooter noborders transparent"
            data-theme="light"
          >
            Tweets by YourTwitterHandle
          </a>
        </Grid>

        <Grid item xs={12} md={6}>
          {/* Twitter Embed */}
          <a
            className="twitter-timeline"
            href="https://twitter.com/adityashuklaIIS"
            data-chrome="noheader nofooter noborders transparent"
            data-theme="light"
          >
            Tweets by YourTwitterHandle
          </a>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SocialMediaComponent;
