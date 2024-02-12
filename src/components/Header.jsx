import React, { useEffect, useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  IconButton,
  Link,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import Logo from "../assets/Neele.png";


const Header = () => {
  const auth = getAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const checkStatus = () => {
      onAuthStateChanged(auth, (user) => {
        setAuthenticated(!!user);
      });
    };
    checkStatus();
  }, [auth]);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
      customClass: {
        container: "bg-gray-800",
        title: "text-white",
        content: "text-gray-300",
        confirmButton: "bg-blue-500 hover:bg-blue-700 text-white",
        cancelButton: "bg-green-500 hover:bg-red-700 text-white",
      },
    });

    if (result.isConfirmed) {
      try {
        await signOut(auth);
        navigate("/");
        toast.success("Logged Out", "You have been logged out successfully");
      } catch (error) {
        console.error(error);
        toast.error("Error", "An error occurred while logging out. Please try again");
      }
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAccountClick = () => {
    handleMenuClose();
    navigate("/account");
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Articles", to: "/articles" },
    { label: "Travel", to: "/travel" },
    { label: "About Me", to: "/aboutme" },

    // authenticated && { label: "My Blogs", to: `/myblogs/${auth.currentUser.uid}` },
    !authenticated && { label: "Sign In", to: "/sign-in" },
  ].filter(Boolean);

  const renderLinks = () => (
    <Box sx={{ display: { xs: "none", md: "block" } }}>
      {navLinks.map((link) => (
        <Link
          key={link.to}
          component={RouterLink}
          to={link.to}
          color="inherit"  // Set link color to black
          sx={{ mx: 2, textDecoration: "none" }}
          className={location.pathname === link.to && "highlight"}
        >
          {link.label}
        </Link>
      ))}
    </Box>
  );

  return (
    <div style={{background:"white"}}>
      <div className="container">
        <AppBar position="sticky" style={{ background: "white", color: "black" }} elevation={0}>
          <Toolbar>
            <a href="/"><img loading="lazy" src={Logo} alt="" width="200px" /></a>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              onClick={() => setShowDrawer(true)}
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            {authenticated ? (
              <>
                {renderLinks()}
                <IconButton
                  color="inherit"
                  onClick={handleMenuOpen}
                  sx={{ textDecoration: "none" }}
                >
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  id="user-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleAccountClick}>Dashboard</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              renderLinks()
            )}
          </Toolbar>
        </AppBar>
        <Drawer anchor="right" open={showDrawer} onClose={() => setShowDrawer(false)}>
          <List>
            {navLinks.map((link) => (
              <ListItem
                key={link.to}
                button
                component={RouterLink}
                to={link.to}
                onClick={() => setShowDrawer(false)}
                sx={{ textDecoration: "none" }}
                className={location.pathname === link.to && "highlight"}
              >
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
            {authenticated && (
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            )}
          </List>
        </Drawer>
      </div>
    </div>
  );
};

export default Header;
