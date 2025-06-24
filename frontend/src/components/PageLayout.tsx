// PageLayout.tsx
// Layout component that provides a persistent AppBar (NavBar) and an optional Drawer (sidebar).
// Use this to wrap pages that need a consistent top nav and/or a side drawer menu.

import React, { useState } from "react"; // Import React and useState hook
import CustomBox from "./materialui/CustomBox"; // Import your custom Box component
import CustomButton from "./materialui/CustomButton"; // Import your custom Button component
import CustomDrawer from "./materialui/CustomDrawer"; // Import your custom Drawer component
import NavBar from "./Nav"; // Import your custom NavBar (AppBar) component

type PageLayoutProps = {
  children: React.ReactNode; // Main content to render inside the layout
  showDrawer?: boolean; // Whether to show the Drawer (sidebar)
  drawerItems?: { label: string; onClick?: () => void }[]; // Items for the Drawer menu
  drawerWidth?: number; // Optional custom width for the Drawer
};

const DEFAULT_DRAWER_WIDTH = 240; // Default width for the Drawer

const PageLayout: React.FC<PageLayoutProps> = ({
  children, // Main content
  showDrawer = false, // Whether to show the Drawer (default: false)
  drawerItems = [], // Drawer menu items (default: empty)
  drawerWidth = DEFAULT_DRAWER_WIDTH, // Drawer width (default: 240)
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false); // State to control if the Drawer is open

  return (
    // Outer flex container, column direction, fills viewport height
    <CustomBox styleArray={[{ display: "flex", minHeight: "100vh", flexDirection: "column" }]}>
      <NavBar /> // Always show the top navigation bar
      {/* Inner flex container for Drawer and main content */}
      <CustomBox styleArray={[{ display: "flex", flex: 1 }]}>
        {/* Conditionally render the Drawer if showDrawer is true */}
        {showDrawer && (
          <CustomDrawer
            open={drawerOpen} // Control open/close state
            onClose={() => setDrawerOpen(false)} // Close Drawer handler
            anchor="left" // Drawer slides in from the left
            items={drawerItems} // Drawer menu items
            styleArray={[{ width: drawerWidth }]} // Set Drawer width
            variant="persistent" // Drawer stays open until closed
            sx={{ zIndex: 1100 }} // Set Drawer z-index
          />
        )}
        {/* Main content area, grows to fill space, with padding */}
        <CustomBox component="main" styleArray={[{ flexGrow: 1, p: 3 }]}>
          {/* Optional button to open/close the Drawer */}
          {showDrawer && (
            <CustomButton onClick={() => setDrawerOpen((o) => !o)}>
              {drawerOpen ? "Close" : "Open"} Drawer
            </CustomButton>
          )}
          {children} // Render the page's main content
        </CustomBox>
      </CustomBox>
    </CustomBox>
  );
};

export default PageLayout; // Export the layout component