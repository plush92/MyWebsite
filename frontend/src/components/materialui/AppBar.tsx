import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';
import React from 'react';

type CustomAppBarProps = {
  title?: string; // Optional title for the AppBar
  sx?: SxProps<Theme>; // Optional custom styles
  children?: React.ReactNode; // Optional children (e.g., buttons, nav links)
};

const CustomAppBar: React.FC<CustomAppBarProps> = ({
  title = "My Portfolio",
  sx = [],
  children,
}) => (
  <AppBar position="static" sx={sx}>
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {title}
      </Typography>
      {children}
    </Toolbar>
  </AppBar>
);

export default CustomAppBar;