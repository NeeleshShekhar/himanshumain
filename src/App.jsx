import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import MainHome from "./pages/LandingPage/Main";
import MyBlogs from "./pages/MyBlogs";
import SignIn from "./pages/SignIn/SignIn";
import Register from "./pages/RegisterMe/Register";
import Logout from "./pages/Logout";
import ForgotPassword from "./pages/ForgotPassword";
import Articles from "./pages/Articles";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";
import WriteBlog from "./pages/WriteBlog";
import SingleArticle from "./pages/SingleArticle/SingleArticle";
import Category from "./pages/Category/Category";
import EditArticle from "./pages/EditArticle";
import About from './components/About/About';
import AccountPage from "./pages/Account";
import './App.css';
import Dashboard from "./pages/Dashboard/Dashboard";
import CarouselInformation from "./pages/CaraouselAddition";
import BlogPage from "./pages/AllArticle";
import AboutMe from "./pages/AboutMe/Aboutme";
import Footer from "./components/Footer";
import ArticleMain from "./pages/Blogs/Main";
import TravelMain from "./pages/Travel/TravelMain";
import AddGalleryPost from "./pages/AddGalleryPost";
import TravelSinglePage from "./pages/Travel/TravelSinglePage";
import PrintMain from "./pages/PrintMedia/Main";
import AddPrintMedia from "./pages/PrintMedia/AddPrintMedia";
import ElectronicMain from "./pages/electronicMedia/Main";
import AddElectronicMedia from "./pages/electronicMedia/AddElectronicMedia";
import MultipleImageUpload from "./pages/AddPhotos";
// import WriteTravelGallery from "./components/WriteTravelGallery/WriteTravelGallery";

const App = () => {
 
  return (
    <div className="">
      <Router>
        <Header />

        <Routes>

          <Route path='/' element={<SignIn />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path='/home' element={<MainHome />} />
            <Route path='/myBlogs/:userId' element={<MyBlogs />} />
            <Route path='/write' element={<WriteBlog />} />
            <Route path='/WriteTravelGallery' element={<AddGalleryPost />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path='/articles' element={<ArticleMain />} />

            <Route path={`/category/:categoryName`} element={<Category />} />
            <Route
              path={`/category/:categoryName/:articleId`}
              element={<SingleArticle />}
            />
            <Route path={`/edit/:articleId`} element={<EditArticle />} />
            <Route path="/about" element={<About />} />
            <Route path="/aboutme" element={<AboutMe />} />

            <Route path='/sign-out' element={<Logout />} />
            <Route path="/account" element={<AccountPage />} />

            <Route path="/caraouseladdition" element={<CarouselInformation />} />
            <Route path="/newblogs" element={<ArticleMain />} />
            <Route path="/travel" element={<TravelMain />} />
            <Route path="/travel/:travelId" element={<TravelSinglePage />} />
            <Route path="/printMedia" element={<PrintMain />} />
            <Route path="/addprintMedia" element={<AddPrintMedia />} />
            <Route path="/electronicMedia" element={<ElectronicMain />} />
            <Route path="/addelectronicMedia" element={<AddElectronicMedia />} />
            <Route path="/addphotos" element={<MultipleImageUpload />} />
            
          </Route>


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
