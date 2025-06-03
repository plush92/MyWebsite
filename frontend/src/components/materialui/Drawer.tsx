import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const CustomDrawer = ({ open, onClose }: { open: boolean; onClose: () => void }) => (
  <Drawer anchor="left" open={open} onClose={onClose}>
    <List>
      <ListItem button>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Projects" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Contact" />
      </ListItem>
    </List>
  </Drawer>
);

export default CustomDrawer;