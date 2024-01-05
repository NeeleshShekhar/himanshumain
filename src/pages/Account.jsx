import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, collection, where, query, getDocs } from "firebase/firestore";
import {
  Typography, CircularProgress, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper,
  Card,
  CardContent,

} from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from '@mui/material';
import Dashboard from "./Dashboard/Dashboard";
import { Link } from "react-router-dom";
import userImage from "../Asset/user.png";
import MyBlogs from "./MyBlogs";

const AccountInfoTable = ({ email, name, numberOfBlogs, superUser }) => {
  return (
    <TableContainer component={Paper} style={{ marginTop: 20 }}>
      <Table>
        <TableBody>
          <TableRow>
            {/* <TableCell rowSpan={3}>
              <img src={userImage} alt="User" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
            </TableCell> */}
            <TableCell>Email</TableCell>
            <TableCell>{email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>{name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Number of Blogs</TableCell>
            <TableCell>{numberOfBlogs}</TableCell>
          </TableRow>
          <TableRow rowSpan={2}>
            <TableCell>{superUser && <Button component={Link} to="/write" variant="contained" color="primary">
              Go to Write
            </Button>}</TableCell>

          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const BlogCard = ({ blog }) => {
  return (
    <Card style={{ margin: "10px", maxWidth: 400 }}>
      <CardContent>
        <Typography variant="h6">{blog.blogData.title}</Typography>
        <Typography variant="subtitle1">
          Category: {blog.blogData.category}
        </Typography>
        <Typography variant="subtitle1">
          Published: {blog.isPublished ? "Yes" : "No"}
        </Typography>
        <Typography variant="subtitle2">
          Timestamp: {blog.timestamp && blog.timestamp.toDate().toString()}
        </Typography>
        <Button
          component={Link}
          to={`/blog/${blog.uuid}`}
          variant="contained"
          color="primary"
        >
          Read More
        </Button>
      </CardContent>
    </Card>
  );
};

const BlogTable = ({ blogs }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {blogs.map((blog) => (
        <BlogCard key={blog.uuid} blog={blog} />
      ))}
    </div>
  );
};

const AccountPage = () => {
  const auth = getAuth();
  const firestore = getFirestore();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user);
        fetchUserBlogs(user);
      } else {
        console.error("Current user is null.");
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  const fetchUserData = async (user) => {
    try {
      const userDocRef = doc(firestore, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        setUserData(userDocSnap.data());
      } else {
        setError("User data not found");
      }
    } catch (error) {
      setError("Error fetching user data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBlogs = async (user) => {
    try {
      const blogsQuery = query(collection(firestore, "blogs"), where("author.id", "==", user.uid));
      const blogsSnapshot = await getDocs(blogsQuery);
      const userBlogs = [];

      blogsSnapshot.forEach((blogDoc) => {
        userBlogs.push(blogDoc.data());
      });

      setBlogs(userBlogs);
    } catch (error) {
      console.error("Error fetching user blogs: ", error.message);
    }
  };

  return (
    <div className="">
      <Container className="mt-5">
        <Row>
          <Col xs={12} md={8}>
            {loading && <CircularProgress />}
            {error && <Typography color="error">Error: {error}</Typography>}
            {userData && (
              <div>
                <AccountInfoTable email={userData.email} name={userData.name} numberOfBlogs={blogs.length} superUser={userData.superUser} />

              </div>
            )}
          </Col>
          <Col xs={12} md={4} className="">
          {/* {blogs.length > 0 && <BlogTable blogs={blogs} />} */}
          </Col>
        </Row>
      </Container>

      {userData?.superUser && <MyBlogs />}

    </div>
  );
};

export default AccountPage;
