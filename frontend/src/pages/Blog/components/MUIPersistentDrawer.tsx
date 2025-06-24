import * as React from 'react'; // Import React
import { styled, useTheme } from '@mui/material/styles'; // Import styled and useTheme from MUI
import Box from '@mui/material/Box'; // Import Box layout component
import Drawer from '@mui/material/Drawer'; // Import Drawer component
import CssBaseline from '@mui/material/CssBaseline'; // Import CssBaseline for consistent styling
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'; // Import AppBar and its props
import Toolbar from '@mui/material/Toolbar'; // Import Toolbar for AppBar content
import List from '@mui/material/List'; // Import List for Drawer content
import Typography from '@mui/material/Typography'; // Import Typography for text
import Divider from '@mui/material/Divider'; // Import Divider for visual separation
import IconButton from '@mui/material/IconButton'; // Import IconButton for clickable icons
import MenuIcon from '@mui/icons-material/Menu'; // Import Menu icon
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'; // Import left chevron icon
import ChevronRightIcon from '@mui/icons-material/ChevronRight'; // Import right chevron icon
import ListItem from '@mui/material/ListItem'; // Import ListItem for list rows
import ListItemButton from '@mui/material/ListItemButton'; // Import ListItemButton for clickable list items
import ListItemIcon from '@mui/material/ListItemIcon'; // Import ListItemIcon for icons in list
import ListItemText from '@mui/material/ListItemText'; // Import ListItemText for text in list
import InboxIcon from '@mui/icons-material/MoveToInbox'; // Import Inbox icon
import MailIcon from '@mui/icons-material/Mail'; // Import Mail icon

const drawerWidth = 240; // Set the width of the drawer

// Styled main content area, shifts right when drawer is open
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1, // Take up remaining space
  padding: theme.spacing(3), // Add padding
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`, // Hide content behind drawer when closed
  variants: [
    {
      props: ({ open }) => open, // If open is true
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0, // Move content right when drawer is open
      },
    },
  ],
}));

// Extend AppBar props to include open state
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

// Styled AppBar that shrinks when drawer is open
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open, // If open is true
      style: {
        width: `calc(100% - ${drawerWidth}px)`, // Shrink width when drawer is open
        marginLeft: `${drawerWidth}px`, // Move AppBar right
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

// Drawer header for spacing and close button
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex', // Flex layout
  alignItems: 'center', // Center items vertically
  padding: theme.spacing(0, 1), // Horizontal padding
  // necessary for content to be below app bar
  ...theme.mixins.toolbar, // Use AppBar height for spacing
  justifyContent: 'flex-end', // Align close button to right
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme(); // Get current theme
  const [open, setOpen] = React.useState(false); // Drawer open state

  const handleDrawerOpen = () => {
    setOpen(true); // Open drawer
  };

  const handleDrawerClose = () => {
    setOpen(false); // Close drawer
  };

  return (
    <Box sx={{ display: 'flex' }}> {/* Main flex container */}
      <CssBaseline /> {/* Normalize CSS */}
      <AppBar position="fixed" open={open}> {/* Top AppBar, shifts when drawer is open */}
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2, // Margin right
              },
              open && { display: 'none' }, // Hide button if drawer is open
            ]}
          >
            <MenuIcon /> {/* Hamburger menu icon */}
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer {/* App title */}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth, // Drawer width
          flexShrink: 0, // Don't shrink
          '& .MuiDrawer-paper': {
            width: drawerWidth, // Paper width
            boxSizing: 'border-box', // Use border-box sizing
          },
        }}
        variant="persistent" // Drawer stays open until closed
        anchor="left" // Drawer slides from left
        open={open} // Controlled open state
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {/* Show left or right chevron based on theme direction */}
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider /> {/* Horizontal line */}
        <List>
          {/* First list of items */}
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {/* Alternate icons */}
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider /> {/* Another horizontal line */}
        <List>
          {/* Second list of items */}
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {/* Alternate icons */}
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}> {/* Main content area, shifts when drawer is open */}
        <DrawerHeader /> {/* Spacer for AppBar */}
        <Typography sx={{ marginBottom: 2 }}>
          {/* Sample content */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          {/* More sample content */}
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Main>
    </Box>
  );
}