// @ts-nocheck
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MuiDrawer from '@mui/material/Drawer';
import { styled, useTheme, } from '@mui/material/styles';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { Box, Typography, Tooltip } from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Avatar from '@mui/material/Avatar';
import { useNavigate, useLocation } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import DirectionsWalkOutlinedIcon from '@mui/icons-material/DirectionsWalkOutlined';
import PresentToAllOutlinedIcon from '@mui/icons-material/PresentToAllOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import PlaylistAddCheckCircleOutlinedIcon from '@mui/icons-material/PlaylistAddCheckCircleOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
const Array1 = [
  { "text": "Acceuil", "icon": <HomeOutlinedIcon />, "path": "/AcceuilF" },
  { "text": "Compte", "icon": <PermIdentityOutlinedIcon />, "path": "/CompteF" },
  { "text": "Ajoute Conference", "icon": <PostAddOutlinedIcon />, "path": "/AjoutConference" },
  { "text": "Etat Conference", "icon": <AnalyticsOutlinedIcon />, "path": "/Etatconference" },


];
const Array2 = [
  { "text": "Acceuil", "icon": <HomeOutlinedIcon />, "path": "/Acceuil" },
  { "text": "Compte", "icon": <PermIdentityOutlinedIcon />, "path": "/CompteA" },
  { "text": "Demande Conference", "icon": <PresentToAllOutlinedIcon />, "path": "/Dconference" },
  { "text": "Demande formateur", "icon": <DirectionsWalkOutlinedIcon />, "path": "/Dformateur" },
  { "text": "Liste Conferences", "icon": <FactCheckOutlinedIcon />, "path": "/Lconferences" },
  { "text": "Liste Utilisateurs", "icon": <Groups2OutlinedIcon />, "path": "/Lutilisateurs" },
  { "text": "Liste Formateurs", "icon": <PlaylistAddCheckCircleOutlinedIcon />, "path": "/Lformateurs" }

];
const Array4 = [
  { "text": "Acceuil", "icon": <HomeOutlinedIcon />, "path": "/AcceuilU" },
  { "text": "Compte", "icon": <PermIdentityOutlinedIcon />, "path": "/CompteU" },
  { "text": "Historique", "icon": <HistoryOutlinedIcon />, "path": "/HistoriqueU" },
  { "text": "Inscrit", "icon": <AssignmentOutlinedIcon />, "path": "/Inscrit" },
  { "text": "Proposition", "icon": <AddTaskOutlinedIcon />, "path": "/Proposition" }
];
const Array3 = [
  { "text": "Logout", "icon": <LogoutOutlinedIcon />, "path": "/logout" }
];
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  // @ts-ignore
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);




// eslint-disable-next-line react/prop-types
const SideBar = ({ open, handleDrawerClose }) => {
  const theme = useTheme();
  let location = useLocation();
  const navigate = useNavigate();
  

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Avatar
        sx={{ mx: "auto", width: open ? 88 : 44, height: open ? 88 : 44, my: 1, border: "2px solid grey", transition: "0.25s" }}
        alt="Remy Sharp"
        src={localStorage.getItem("image")}
        />

<Typography align='center' sx={{ fontSize: open ? 17 : 0, transition: "0.25s", fontFamily: "Comic Sans MS" }}>
{localStorage.getItem("prenom") }  {localStorage.getItem("nom") }    
      </Typography>{localStorage.getItem("role") === "ROLE_ADMIN" && (
        <Typography
          align='center'
          sx={{
            fontSize: open ? 14 : 0,
            transition: "0.25s",
            color: theme.palette.info.light,
            fontFamily: "Comic Sans MS"
          }}
        >
          Admin
        </Typography>
      )}
      {localStorage.getItem("role") === "ROLE_FORMATEUR" && (
        <Typography
          align='center'
          sx={{
            fontSize: open ? 14 : 0,
            transition: "0.25s",
            color: theme.palette.info.light,
            fontFamily: "Comic Sans MS"
          }}
        >
          Formateur
        </Typography>
      )}
      {localStorage.getItem("role") === "ROLE_USER" && (
        <Typography
          align='center'
          sx={{
            fontSize: open ? 14 : 0,
            transition: "0.25s",
            color: theme.palette.info.light,
            fontFamily: "Comic Sans MS"
          }}
        >
          User
        </Typography>
      )}


      <Divider />

      {localStorage.getItem("role") === "ROLE_ADMIN" && (
        <List>
          {Array2.map((item) => (
            <ListItem key={item.path} disablePadding sx={{ display: 'block',/*visibility:"hidden" */ }}>
              <Tooltip title={!open ? item.text : null} placement="left">
                <ListItemButton onClick={() => {
                  navigate(item.path);
                }}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    bgcolor: location.pathname === item.path ? localStorage.getItem('currentMode') === "dark" ? grey[800] : grey[400] : null
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </Tooltip>

            </ListItem>
          ))}
        </List>)}



      <Divider />

      {localStorage.getItem("role") === "ROLE_FORMATEUR" && (
        <List>
          {Array1.map((item) => (
            <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
              <Tooltip title={!open ? item.text : null} placement="left">
                <ListItemButton onClick={() => {

                  navigate(item.path);
                }}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    bgcolor: location.pathname === item.path ? localStorage.getItem('currentMode') === "dark" ? grey[800] : grey[400] : null
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </Tooltip>


            </ListItem>
          ))}
        </List>
      )}



      <Divider />
      {localStorage.getItem("role") === "ROLE_USER" && (
        <List>
          {Array4.map((item) => (
            <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
              <Tooltip title={!open ? item.text : null} placement="left">
                <ListItemButton onClick={() => {

                  navigate(item.path);
                }}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    bgcolor: location.pathname === item.path ? localStorage.getItem('currentMode') === "dark" ? grey[800] : grey[400] : null
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </Tooltip>


            </ListItem>
          ))}
        </List>
      )}
      <Divider />


      <Box flexGrow={1} />


      <List>
        {Array3.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
            <Tooltip title={!open ? item.text : null} placement="left">
              <ListItemButton onClick={() => {
                navigate(item.path);
              }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  bgcolor: location.pathname === item.path ? localStorage.getItem('currentMode') === "dark" ? grey[800] : grey[400] : null
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </Tooltip>

          </ListItem>
        ))}
      </List>

    </Drawer>
  );
}

export default SideBar;
