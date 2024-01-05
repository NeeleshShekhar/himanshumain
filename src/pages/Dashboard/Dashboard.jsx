import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import '../Pages.css'; // Import the CSS file
import { Link } from "react-router-dom";
import AccountPage from '../Account';

const drawerWidth = 240;



const Dashboard = () => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (

    <div className="container">
      <main className="content">
        <div className="toolbar" />
        {/* Your main content goes here */}
        
        {/* Button to navigate to "/write" */}
        

        
      </main>

    </div>

  );
};

export default Dashboard;
