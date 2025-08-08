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

import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CustomBox from "./CustomBox";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { SxProps, Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const MINI_WIDTH = 56;
const FULL_WIDTH = 180;

export const DrawerMini = [{ width: MINI_WIDTH }];
export const DrawerFull = [{ width: FULL_WIDTH }];

type DrawerItem = {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
};

type CustomDrawerProps = {
  open: boolean;
  onClose: () => void;
  onOpen?: () => void;
  items?: DrawerItem[];
  sx?: SxProps<Theme>;
  styleArray?: SxProps<Theme>[];
  children?: React.ReactNode;
  variant: "persistent" | "permanent" | "temporary";
};

const CustomDrawer: React.FC<CustomDrawerProps> = ({
  open,
  onClose,
  onOpen,
  variant,
  items = [],
  sx = [],
  styleArray = [],
  children,
  ...props
}) => (
  <Drawer
    variant={variant}
    open={open}
    sx={[
      ...(open ? DrawerFull : DrawerMini),
      ...styleArray,
      ...(Array.isArray(sx) ? sx : [sx]),
      {
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        "& .MuiDrawer-paper": {
          width: open ? FULL_WIDTH : MINI_WIDTH,
          transition: "width 0.3s",
          overflowX: "hidden",
        },
      },
    ]}
  >
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>

      <CustomBox sx={{ display: "flex", justifyContent: open ? "flex-end" : "center", p: 1 }}>
        <IconButton
          onClick={open ? onClose : onOpen}
          size="small"
          aria-label={open ? "Close drawer" : "Open drawer"}
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
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            {item.icon && (
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : "auto",
                  justifyContent: "center",
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
    </Box>
  </Drawer>
);

export default CustomDrawer;