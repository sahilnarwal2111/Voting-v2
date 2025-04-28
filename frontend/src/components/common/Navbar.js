// import React, { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Navbar, Nav, Container, Button } from 'react-bootstrap';
// import { AuthContext } from '../../contexts/AuthContext';
// import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';


// const MainNavbar = () => {
//   const { isAuthenticated, currentUser, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const guestLinks = (
//     <>
//       <Nav.Link as={Link} to="/login">Login</Nav.Link>
//       <Nav.Link as={Link} to="/register">Register</Nav.Link>
//     </>
//   );

//   const authLinks = (
//     <>
//       <Nav.Link as={Link} to="/polls">All Polls</Nav.Link>
//       <Nav.Link as={Link} to="/dashboard">My Dashboard</Nav.Link>
//       {currentUser && currentUser.isAdmin && (
//         <>
//           <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
//           <Nav.Link as={Link} to="/create-poll">Create Poll</Nav.Link>
//         </>
//       )}
//       <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
//     </>
//   );

//   return (
//     <AppBar position="sticky">
//       <Toolbar>
//         <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
//           <MenuIcon />
//         </IconButton>
//         <Typography variant="h6" sx={{ flexGrow: 1 }}>
//           <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
//             Voting App
//           </Link>
//         </Typography>

//         <Box sx={{ display: { xs: 'block', md: 'none' } }}>
//           <Menu
//             anchorEl={anchorEl}
//             open={open}
//             onClose={handleMenuClose}
//             anchorOrigin={{
//               vertical: 'top',
//               horizontal: 'right',
//             }}
//             transformOrigin={{
//               vertical: 'top',
//               horizontal: 'right',
//             }}
//           >
//             {isAuthenticated ? authLinks : guestLinks}
//           </Menu>
//         </Box>

//         <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
//           {isAuthenticated ? authLinks : guestLinks}
//         </Box>
//       </Toolbar>
//     </AppBar>
//     // Without Material UI
//     // <Navbar bg="primary" variant="dark" expand="md">
//     //   <Container>
//     //     <Navbar.Brand as={Link} to="/">
//     //       Voting App
//     //     </Navbar.Brand>
//     //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
//     //     <Navbar.Collapse id="basic-navbar-nav">
//     //       <Nav className="me-auto">
//     //         <Nav.Link as={Link} to="/">Home</Nav.Link>
//     //         <Nav.Link as={Link} to="/polls">Polls</Nav.Link>
//     //       </Nav>
//     //       <Nav>
//     //         {isAuthenticated ? authLinks : guestLinks}
//     //       </Nav>
//     //     </Navbar.Collapse>
//     //   </Container>
//     // </Navbar>
//   );
// };

// export default MainNavbar;

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, Divider } from '@mui/material';
import { AuthContext } from '../../contexts/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';

const MainNavbar = () => {
  const { isAuthenticated, currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const guestLinks = (
    <>
      <MenuItem component={Link} to="/login">Login</MenuItem>
      <MenuItem component={Link} to="/register">Register</MenuItem>
    </>
  );

  const authLinks = (
    <>
      <MenuItem component={Link} to="/polls">All Polls</MenuItem>
      <MenuItem component={Link} to="/dashboard">My Dashboard</MenuItem>
      {currentUser && currentUser.isAdmin && (
        <>
          <MenuItem component={Link} to="/admin">Admin</MenuItem>
          <MenuItem component={Link} to="/create-poll">Create Poll</MenuItem>
        </>
      )}
      <Divider />
      <MenuItem>
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </MenuItem>
    </>
  );

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Voting App
          </Link>
        </Typography>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {isAuthenticated ? authLinks : guestLinks}
          </Menu>
        </Box>

        {/* Desktop Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit" component={Link} to="/" sx={{ marginRight: 2 }}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/polls" sx={{ marginRight: 2 }}>
            Polls
          </Button>
          {isAuthenticated ? authLinks : guestLinks}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavbar;
