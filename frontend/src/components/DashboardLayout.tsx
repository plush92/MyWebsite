import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';

const drawerWidth = 280;

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: 'margin-left 0.3s',
          ml: open ? `${drawerWidth}px` : 0,
        }}
      >
        <IconButton
          onClick={() => setOpen(prev => !prev)}
          sx={{
            position: 'absolute',
            top: 16,
            left: open ? `${drawerWidth + 16}px` : 16,
            zIndex: 1201, // above drawer
          }}
        >
          <MenuIcon />
        </IconButton>
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
