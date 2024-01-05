import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import MyBlogs from "./pages/MyBlogs";
import SignIn from "./pages/SignIn/SignIn";
import Register from "./pages/RegisterMe/Register";
import Logout from "./pages/Logout";
import ForgotPassword from "./pages/ForgotPassword";
import Articles from "./pages/Articles";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";
import WriteBlog from "./pages/WriteBlog";
import SingleArticle from "./pages/SingleArticle";
import Category from "./pages/Category";
import EditArticle from "./pages/EditArticle";
import About from './components/About/About';
import AccountPage from "./pages/Account";
import './App.css';
import Dashboard from "./pages/Dashboard/Dashboard";
import CarouselInformation from "./pages/CaraouselAddition";
import BlogPage from "./pages/AllArticle";
import AboutMe from "./pages/AboutMe/Aboutme";
import Footer from "./components/Footer";

const App = () => {
  /* 
  TODO -  Add image input in write blog component, add the image to cloud storage in firebase
  
   */

  return (
    <div>
      <Router>
        <Header />

        <Routes>
          <Route path='/' element={<Home />} />
          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path='/myBlogs/:userId' element={<MyBlogs />} />
            <Route path='/write' element={<WriteBlog />} />
          </Route>
          <Route path='/articles' element={<Articles />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path={`/category/:categoryName`} element={<Category />} />
          <Route
            path={`/category/:categoryName/:articleId`}
            element={<SingleArticle />}
          />
          <Route path={`/edit/:articleId`} element={<EditArticle />} />
          <Route path="/about" element={<About />} />
          <Route path="/aboutme" element={<AboutMe />} />
          <Route path='/sign-up' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/sign-out' element={<Logout />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/caraouseladdition" element={<CarouselInformation />} />
          <Route path="/newblogs" element={<BlogPage/>  } />
        </Routes>
      </Router>
      {/* <Footer/> */}

      <Toaster
        position='top-center'
        reverseOrder={false}
        gutter={8}
        containerClassName=''
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#333",
            // 363636
            color: "#fff",
            marginTop: "50px",
          },
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
            // Custom toast icon style
            iconTheme: {
              primary: "green",
              secondary: "#333",
            },
            ariaProps: {
              role: "status",
              "aria-live": "polite",
            },
            enter: "fade",
            exit: "fade",
          },
        }}
      />
    </div>
  );
};

export default App;
