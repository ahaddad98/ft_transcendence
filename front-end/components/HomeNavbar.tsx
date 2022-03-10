import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const HomeNavbar = () => {
//   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
//   const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

//   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

  return (
    <div className="homenavbar">
        <header id="nav-wrapper">
    <nav id="nav">
      <div className="nav left">
        <span className="gradient skew"><h1 className="logo un-skew"><a href="#home">Logo Here</a></h1></span>
        <button id="menu" className="btn-nav"><span className="fas fa-bars"></span></button>
      </div>
      <div className="nav right">
        <a href="#home" className="nav-link active"><span className="nav-link-span"><span className="u-nav">Home</span></span></a>
        <a href="#about" className="nav-link"><span className="nav-link-span"><span className="u-nav">About</span></span></a>
        <a href="#work" className="nav-link"><span className="nav-link-span"><span className="u-nav">Work</span></span></a>
        <a href="#contact" className="nav-link"><span className="nav-link-span"><span className="u-nav">Contact</span></span></a>
      </div>
    </nav>
  </header>
    {/* <section id="home">

    </section>
    <section id="about">

    </section>
    <section id="work">

    </section>
    <section id="contact">

    </section> */}
        {/* <div className="firstpart">
            <div className="avatar">
            <img id="av" src="/avatar.svg" />
            </div>
            <div className="username">
                <p>
                username
                </p>
            </div>
        </div>
        <div className="secpart">
            <div className="stream">
                <p className="test">
                Stream
                </p>
            </div>
            <div className="game">
                <p>
                Game
                </p>
            </div>
            <div className="friend">
                <p>
                Friends
                </p>
            </div>
        </div>
        <div className="thirtpart">
            Settings
        </div> */}
    </div>
  );
    // <AppBar position="static">
    //   <Container maxWidth="xl">
    //     <Toolbar disableGutters>
    //       <Typography
    //         variant="h6"
    //         noWrap
    //         component="div"
    //         sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
    //       >
    //         LOGO
    //       </Typography>

    //       <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
    //         <IconButton
    //           size="large"
    //           aria-label="account of current user"
    //           aria-controls="menu-appbar"
    //           aria-haspopup="true"
    //           onClick={handleOpenNavMenu}
    //           color="inherit"
    //         >
    //           <MenuIcon />
    //         </IconButton>
    //         <Menu
    //           id="menu-appbar"
    //           anchorEl={anchorElNav}
    //           anchorOrigin={{
    //             vertical: 'bottom',
    //             horizontal: 'left',
    //           }}
    //           keepMounted
    //           transformOrigin={{
    //             vertical: 'top',
    //             horizontal: 'left',
    //           }}
    //           open={Boolean(anchorElNav)}
    //           onClose={handleCloseNavMenu}
    //           sx={{
    //             display: { xs: 'block', md: 'none' },
    //           }}
    //         >
    //           {pages.map((page) => (
    //             <MenuItem key={page} onClick={handleCloseNavMenu}>
    //               <Typography textAlign="center">{page}</Typography>
    //             </MenuItem>
    //           ))}
    //         </Menu>
    //       </Box>
    //       <Typography
    //         variant="h6"
    //         noWrap
    //         component="div"
    //         sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
    //       >
    //         LOGO
    //       </Typography>
    //       <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
    //         {pages.map((page) => (
    //           <Button
    //             key={page}
    //             onClick={handleCloseNavMenu}
    //             sx={{ my: 2, color: 'white', display: 'block' }}
    //           >
    //             {page}
    //           </Button>
    //         ))}
    //       </Box>

    //       <Box sx={{ flexGrow: 0 }}>
    //         <Tooltip title="Open settings">
    //           <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
    //             <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
    //           </IconButton>
    //         </Tooltip>
    //         <Menu
    //           sx={{ mt: '45px' }}
    //           id="menu-appbar"
    //           anchorEl={anchorElUser}
    //           anchorOrigin={{
    //             vertical: 'top',
    //             horizontal: 'right',
    //           }}
    //           keepMounted
    //           transformOrigin={{
    //             vertical: 'top',
    //             horizontal: 'right',
    //           }}
    //           open={Boolean(anchorElUser)}
    //           onClose={handleCloseUserMenu}
    //         >
    //           {settings.map((setting) => (
    //             <MenuItem key={setting} onClick={handleCloseUserMenu}>
    //               <Typography textAlign="center">{setting}</Typography>
    //             </MenuItem>
    //           ))}
    //         </Menu>
    //       </Box>
    //     </Toolbar>
    //   </Container>
    // </AppBar>
//   );
};
export default HomeNavbar;

// import React from "react";

// const HomeNavbar = () => {
//     return (
//         <div className="homenavbar">
//             <div className="homenavmembre">
//                 Username
//             </div>
//             <div  className="homenavmid">
//                 <div className="homenavmembre">
//                     Stream
//                 </div>
//                 <div className="homenavmembre">
//                     Game
//                 </div>
//                 <div className="homenavmembre">
//                     Channels
//                 </div>
//             </div>
//             <div className="homenavmembre">
//                 settings
//             </div>
//         </div>
//     )
// }
// export default HomeNavbar;