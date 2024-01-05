// Import necessary React and Material-UI components
import React from 'react';
import { Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// Define styles for the component
const styles = {
  categoryBtn: {
    margin: '8px',
  },
  card: {
    marginBottom: '16px',
  },
};

// Sample data for blog posts
const blogPosts = [
  {
    title: 'Title 1',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    category: 'programming',
  },
  {
    title: 'Title 2',
    content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'entertainment',
  },
  // Add more sample blog posts as needed
];

// Component definition
const BlogPage = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {/* Big Blog Cards */}
          {blogPosts.map((post, index) => (
            <Card key={index} sx={styles.card}>
              <CardContent>
                <Typography variant="h5">{post.title}</Typography>
                <Typography variant="body1">{post.content}</Typography>
                <Link to={`/category/${post.category}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Button sx={styles.categoryBtn}>{post.category}</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          {/* Tags */}
          <Typography variant="h6">Tags</Typography>
          <Button sx={styles.categoryBtn}>
            <Link to="/category/entertainment" style={{ textDecoration: 'none', color: 'inherit' }}>
              Entertainment
            </Link>
          </Button>
          {/* Add more tags as needed */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlogPage;
