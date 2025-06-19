// // Behavior
// open: boolean; // Controls whether the drawer is shown
// onClose?: (event: object, reason: 'backdropClick' | 'escapeKeyDown') => void;

// // Content & Layout
// anchor?: 'left' | 'right' | 'top' | 'bottom'; // Side the drawer slides from (default: 'left')
// variant?: 'temporary' | 'persistent' | 'permanent'; // Drawer mode
// children?: React.ReactNode; // Drawer content
// elevation?: number; // Shadow depth (default: 16)

// // Interaction
// hideBackdrop?: boolean; // Remove backdrop overlay
// transitionDuration?: number | { appear?: number; enter?: number; exit?: number };

// // Customization
// sx?: SxProps<Theme>; // MUI custom styling
// PaperProps?: object; // Props applied to the Paper (container)
// ModalProps?: object; // Props forwarded to the Modal (if temporary)
// SlideProps?: object; // Props for the Slide transition (deprecated)
// component?: React.ElementType; // Custom root component
// classes?: Partial<DrawerClasses>; // Override classes for targeted styling

// // Advanced Slot API
// slotProps?: {
//   root?: object;
//   backdrop?: object;
//   docked?: object;
//   paper?: object;
//   transition?: object;

// slots?: {
//   root?: React.ElementType;
//   backdrop?: React.ElementType;
//   docked?: React.ElementType;
//   paper?: React.ElementType;
//   transition?: React.ElementType;

// // CSS Class Names
// .MuiDrawer-root                     // Root element
// .MuiDrawer-modal                    // When used as Modal (temporary)
// .MuiDrawer-docked                   // For persistent/permanent variants
// .MuiDrawer-paper                    // Main Drawer container

// // Anchors
// .MuiDrawer-anchorLeft               // anchor="left"
// .MuiDrawer-anchorRight              // anchor="right"
// .MuiDrawer-anchorTop                // anchor="top"
// .MuiDrawer-anchorBottom             // anchor="bottom"

import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { SxProps, Theme } from '@mui/material/styles';
import React from 'react';

const sizingProps = { width: 150 };
const paddingProps = { p: 2 };

export const DrawerSizing = [sizingProps];
export const DrawerPadding = [paddingProps];

type CustomDrawerProps = DrawerProps & {
  sx?: SxProps<Theme>;
  styleArray?: SxProps<Theme>[];
  items?: { label: string; onClick?: () => void }[];
  children?: React.ReactNode;
};

const CustomDrawer: React.FC<CustomDrawerProps> = ({
  sx = [],
  styleArray = [],
  items,
  children,
  ...props
}) => (
  <Drawer
    {...props}
    sx={[
      ...styleArray,
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    <List>
      {items?.map((item, idx) => (
        <ListItemButton key={item.label + idx} onClick={item.onClick}>
          <ListItemText primary={item.label} />
        </ListItemButton>
      ))}
    </List>
    {children}
  </Drawer>
);

export default CustomDrawer;