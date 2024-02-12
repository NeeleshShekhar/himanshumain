import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import ChannelImage from '../../Asset/Sonic.png'

const YouTubeViewer = ({ channelName, videoId }) => {
    const channelUrl = `https://www.youtube.com/@${channelName}`;
    const channel = `https://www.youtube.com/embed/?listType=user_uploads&list=${channelName}`
    const videoUrl = `https://www.youtube.com/embed/${videoId}`;
    console.log(channelUrl);

    return (
        <div style={{ background: "#013b4a" }}>
            <Container style={{ padding: "40px", marginTop: "20px" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} style={{ display: 'flex', alignItems: 'center' }}>
                        <div>
                            <img src={ChannelImage} height="200px" alt="Channel Logo" />
                        </div>
                    </Grid>

                    <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div className='shaddowyoutube'>
                           
                            <iframe
                                width="100%"
                                height="315"
                                src={videoUrl}
                                title="YouTube Video"
                                frameBorder="0"
                                allowFullScreen
                                style={{ boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)' }}
                            
                            ></iframe>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default YouTubeViewer;
