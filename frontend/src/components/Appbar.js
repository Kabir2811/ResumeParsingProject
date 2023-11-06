import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link } from 'react-router-dom';
import logoImage from './NCS-logo.png';
export default function Appbar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-haspopup="true"
            onClick={handleMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <a href={"/"}><div style={{backgroundColor:"white"}}>
          <img src={logoImage} alt="Logo" style={{ maxWidth: '125px' }} /></div></a>
          <div  style={{
            textDecoration: 'none',
            color: 'inherit',
            padding: '1%',
            paddingLeft: '37%',
            textAlign: 'center !important', // Add !important to ensure it takes precedence
          }}>
            <h4>TalentLinker</h4>

          </div>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={Link} to="/" onClick={handleClose}>
              Resume Upload
            </MenuItem>
            <MenuItem component={Link} to="/resume-list" onClick={handleClose}>
              Resume List
            </MenuItem>
            <MenuItem component={Link} to="/jdupload" onClick={handleClose}>
              Upload JD
            </MenuItem>
            <MenuItem component={Link} to="/jdlist" onClick={handleClose}>
              JD List
            </MenuItem>
            {/* Add more menu items as needed */}
          </Menu>


        </Toolbar>
      </AppBar>
    </Box>
  );
}
