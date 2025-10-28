import * as React from "react";
import PropTypes, { shape } from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AuthContext } from "./Provider/AuthProvider/authContext";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  ArrowRightFromLine,
  Book,
  FileText,
  ListCheck,
  ListStart,
  LogOutIcon,
  Pen,
  School,
  User,
  User2,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";
const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const { user, reload } = React.useContext(AuthContext);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("user");
    toast.success("Log Out Successfully!");
    navigate("/login");
  };

  const [isAdmin, setIsAdmin] = React.useState(false);
  const [isStudent, setIsStudent] = React.useState(false);
  React.useEffect(() => {
    setIsAdmin(user.role == "admin");
    setIsStudent(user.role == "student");
  }, [reload]);

  const menuItems = [
    {
      text: "Profile",
      path: "/studentProfile",
      show: isStudent,
      IconComponent: User2,
    },
    {
      text: "Overview",
      path: "/adminProfile",
      show: isAdmin,
      IconComponent: ListStart,
    },
    {
      text: "All Course",
      path: "/allCourse",
      show: isAdmin || isStudent,
      IconComponent: Book,
    },
    {
      text: "Course Wise Student List",
      path: "/courseWiseStudent",
      show: isAdmin,
      IconComponent: ListCheck,
    },
    {
      text: "All Student",
      path: "/allStudents",
      show: isAdmin,
      IconComponent: Users,
    },
    {
      text: "Add Course",
      path: "/addCourse",
      show: isAdmin,
      IconComponent: FileText,
    },
    {
      text: "Add advisors",
      path: "/addAdvisors",
      show: isAdmin,
      IconComponent: User,
    },
    {
      text: "Add Department",
      path: "/addDept",
      show: isAdmin,
      IconComponent: FileText,
    },
    {
      text: "Registration",
      path: "/registration",
      show: isStudent,
      IconComponent: ArrowRightFromLine,
    },
    {
      text: "All Registrations",
      path: "/courseRegistrations",
      show: isAdmin,
      IconComponent: Pen,
    },
    {
      text:"All Dept.",
      path:"/allDept",
      show: isAdmin,
      IconComponent: School
    }
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuItems
          .filter((item) => item.show)
          .map((item) => {
            const Icon = item.IconComponent;
            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? "#1976d2" : "transparent",
                    color: isActive ? "#fff" : "inherit",
                  })}
                >
                  <ListItemIcon style={{ color: "#aaa" }}>
                    <Icon size={20} />
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
      <Divider />

      <ListItem disablePadding>
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <LogOutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </ListItem>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Uniroll Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          slotProps={{
            root: {
              keepMounted: true,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        className="mt-16"
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {/* <Toolbar /> */}
        <Outlet />
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
