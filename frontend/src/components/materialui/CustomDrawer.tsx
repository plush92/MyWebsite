import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const CustomDrawer = ({ open, onClose }: { open: boolean; onClose: () => void }) => (
  <Drawer anchor="left" open={open} onClose={onClose}>
    <List>
      <ListItemButton>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary="Projects" />
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary="Contact" />
      </ListItemButton>
    </List>
  </Drawer>
);

export default CustomDrawer;