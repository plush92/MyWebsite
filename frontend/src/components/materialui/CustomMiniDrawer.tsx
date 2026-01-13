import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import CustomBox from './CustomBox';
import { SxProps, Theme } from '@mui/material/styles';

const MINI_WIDTH = 56;
const FULL_WIDTH = 180;

type DrawerItem = {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
};

type CustomMiniDrawerProps = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  items: DrawerItem[];
  sx?: SxProps<Theme>;
  children?: React.ReactNode;
};

const CustomMiniDrawer: React.FC<CustomMiniDrawerProps> = ({
  open,
  onOpen,
  onClose,
  items,
  sx = [],
  children,
}) => (
  <Drawer
    variant="permanent"
    open={open}
    sx={[
      {
        width: open ? FULL_WIDTH : MINI_WIDTH,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        '& .MuiDrawer-paper': {
          width: open ? FULL_WIDTH : MINI_WIDTH,
          transition: 'width 0.3s',
          overflowX: 'hidden',
        },
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    <CustomBox
      sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <CustomBox
        sx={{
          display: 'flex',
          justifyContent: open ? 'flex-end' : 'center',
          p: 1,
        }}
      >
        <IconButton
          onClick={open ? onClose : onOpen}
          size="small"
          aria-label={open ? 'Close drawer' : 'Open drawer'}
        >
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </CustomBox>
      <List>
        {items.map((item, idx) => (
          <ListItemButton
            key={item.label + idx}
            onClick={item.onClick}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            {item.icon && (
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
            )}
            {open && <ListItemText primary={item.label} />}
          </ListItemButton>
        ))}
      </List>
      {children}
    </CustomBox>
  </Drawer>
);

export default CustomMiniDrawer;
