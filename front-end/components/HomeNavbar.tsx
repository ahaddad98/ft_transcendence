import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Link from 'next/link';
import { CssBaseline } from '@mui/material';
import MediaQuery from "react-responsive";

const HomeNavbar = (props) => {
    return (
        <div className="abnf">
            <ul className="menu-bar">
                <li> Watch Now</li>
	            <li> Movies</li>
	            <li> TV Shows</li>
	            <li> Sports</li>
	            <li> Kids</li>
	            <li> Library</li>
            </ul>
        </div>
  );
};
export default HomeNavbar;
