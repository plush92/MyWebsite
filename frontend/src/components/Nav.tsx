import CustomAppBar from "./materialui/AppBar";
import CustomBox from "./materialui/CustomBox";
import CustomButton from "./materialui/CustomButton";
import ThemeToggle from "./ThemeToggle";
import { Link as RouterLink } from "react-router-dom";

type NavBarProps = {
  drawerOpen?: boolean;
  drawerWidth?: number;
  mode: "light" | "dark";
  toggleMode: () => void;
};

const NavBar: React.FC<NavBarProps> = ({
  drawerOpen = false,
  drawerWidth = 240,
  mode,
  toggleMode,
}) => {
  return (
    <CustomAppBar
      sx={{
        transition: (theme) =>
          theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        ...(drawerOpen && {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: `${drawerWidth}px`,
          transition: (theme) =>
            theme.transitions.create(["margin", "width"], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
        }),
      }}
    >
      <CustomBox styleArray={[{ display: "flex", alignItems: "center", width: "100%" }]}>
        <CustomBox styleArray={[{ flexGrow: 1 }]}>
          <CustomButton component={RouterLink} to="/" color="inherit">
            Home
          </CustomButton>
          <CustomButton component={RouterLink} to="/projects" color="inherit">
            Projects
          </CustomButton>
          <CustomButton component={RouterLink} to="/contact" color="inherit">
            Contact
          </CustomButton>
          <CustomButton component={RouterLink} to="/blog" color="inherit">
            Blog
          </CustomButton>
        </CustomBox>
        <ThemeToggle mode={mode} toggleMode={toggleMode} />
      </CustomBox>
    </CustomAppBar>
  );
};

export default NavBar;