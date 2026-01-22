// PageLayout.tsx
// Layout component that provides a persistent AppBar (NavBar) and an optional Drawer (sidebar).
// Use this to wrap pages that need a consistent top nav and/or a side drawer menu.

import React, { useState } from 'react'; // Import React and useState hook
import CustomBox from './materialui/CustomBox'; // Import your custom Box component
import CustomButton from './materialui/CustomButton'; // Import your custom Button component
import CustomDrawer from './materialui/CustomDrawer'; // Import your custom Drawer component
import CustomMiniDrawer from './materialui/CustomMiniDrawer';
import NavBar from './Nav'; // Import your custom NavBar (AppBar) component

type PageLayoutProps = {
  children: React.ReactNode; // Main content to render inside the layout
  showDrawer?: boolean; // Whether to show the Drawer (sidebar)
  drawerItems?: { label: string; onClick?: () => void }[]; // Items for the Drawer menu
  drawerWidth?: number; // Optional custom width for the Drawer
  mode: 'light' | 'dark';
  toggleMode: () => void;
};

const DEFAULT_DRAWER_WIDTH = 240; // Default width for the Drawer

const PageLayout: React.FC<PageLayoutProps> = ({
  children, // Main content
  showDrawer = false, // Whether to show the Drawer (default: false)
  drawerItems = [], // Drawer menu items (default: empty)
  drawerWidth = DEFAULT_DRAWER_WIDTH, // Drawer width (default: 240)
  mode,
  toggleMode,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false); // State to control if the Drawer is open

  return (
    // Outer flex container, column direction, fills viewport height
    <CustomBox
      styleArray={[
        { display: 'flex', minHeight: '100vh', flexDirection: 'column' },
      ]}
    >
      <NavBar
        drawerOpen={drawerOpen}
        drawerWidth={drawerWidth}
        mode={mode}
        toggleMode={toggleMode}
      />
      {/* Inner flex container for Drawer and main content */}
      <CustomBox styleArray={[{ display: 'flex', flex: 1 }]}>
        {/* Conditionally render the Drawer if showDrawer is true */}
        {showDrawer && (
          <CustomMiniDrawer
            open={drawerOpen} // Control open/close state
            onOpen={() => setDrawerOpen(true)}
            onClose={() => setDrawerOpen(false)} // Close Drawer handler
            items={drawerItems} // Drawer menu items
            // styleArray={[{ width: drawerWidth }]} // Set Drawer width
            // variant="persistent" // Drawer stays open until closed
            // ModalProps={{ disablePortal: true }}
            sx={{ zIndex: 1100 }} // Set Drawer z-index
          />
        )}
        {/* Main content area, grows to fill space, with padding and top margin for fixed header */}
        <CustomBox component="main" styleArray={[{ flexGrow: 1, p: 3, mt: 8 }]}>
          {children}
        </CustomBox>
      </CustomBox>
    </CustomBox>
  );
};

export default PageLayout; // Export the layout component
