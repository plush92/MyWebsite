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

import Drawer, { DrawerProps } from '@mui/material/Drawer'; // Import MUI Drawer and its props type
import List from '@mui/material/List'; // Import MUI List for menu items
import ListItemButton from '@mui/material/ListItemButton'; // Import clickable list item
import ListItemText from '@mui/material/ListItemText'; // Import text for list item
import { SxProps, Theme } from '@mui/material/styles'; // Import style types from MUI
import React from 'react'; // Import React

const sizingProps = { width: 150 }; // Default sizing for Drawer (can be overridden)
const paddingProps = { p: 2 }; // Default padding for Drawer content

export const DrawerSizing = [sizingProps]; // Export sizing for reuse
export const DrawerPadding = [paddingProps]; // Export padding for reuse

// Define the props for CustomDrawer, extending MUI DrawerProps
type CustomDrawerProps = DrawerProps & {
  sx?: SxProps<Theme>; // Optional custom styles
  styleArray?: SxProps<Theme>[]; // Optional array of custom styles
  items?: { label: string; onClick?: () => void }[]; // Optional array of menu items
  children?: React.ReactNode; // Optional children (additional content)
};

// Functional component for CustomDrawer
const CustomDrawer: React.FC<CustomDrawerProps> = ({
  sx = [], // Custom styles, default to empty array
  styleArray = [], // Style array, default to empty array
  items, // Menu items
  children, // Additional content
  ...props // All other Drawer props
}) => (
  <Drawer
    {...props} // Spread all Drawer props (open, onClose, anchor, etc.)
    sx={[
      ...styleArray, // Apply styleArray first
      ...(Array.isArray(sx) ? sx : [sx]), // Then apply sx (ensure it's always an array)
      // Note: You may want to add { '& .MuiDrawer-paper': { width: ... } } here for width control
    ]}
  >
    <List>
      {/* Map over items and render a ListItemButton for each */}
      {items?.map((item, idx) => (
        <ListItemButton key={item.label + idx} onClick={item.onClick}>
          <ListItemText primary={item.label} />
        </ListItemButton>
      ))}
    </List>
    {children /* Render any additional children passed to the Drawer */}
  </Drawer>
);

export default CustomDrawer; // Export the CustomDrawer component