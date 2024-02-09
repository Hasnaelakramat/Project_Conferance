import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import { alpha, Box, IconButton, InputBase, Stack, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ModeNightOutlinedIcon from '@mui/icons-material/ModeNightOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useTheme } from '@mui/material';
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

const options = [
  'Compte',
  'logout',

];
const ITEM_HEIGHT = 48;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  flexGrow: 0.2
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  // @ts-ignore
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// eslint-disable-next-line react/prop-types
const TopBar = ({ open, handleDrawerOpen, setMode }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl); // Cette ligne peut être renommée pour plus de clarté

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="fixed"
      // @ts-ignore
      open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),

          }}

        >
          <MenuIcon />
        </IconButton>
        <Search sx={{
          borderRadius: 22, backgroundColor: alpha(theme.palette.common.white, 0.15),
          '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25)
          }
        }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <Box flexGrow={1} />

        <Stack direction={"row"} >
          {theme.palette.mode === "light" ?
            <IconButton onClick={() => {
              localStorage.setItem("currentMode", theme.palette.mode === "dark" ? "light" : "dark");
              setMode((prevMode) =>
                prevMode === 'light' ? 'dark' : 'light',
              );
            }
            } color="inherit">
              <LightModeOutlinedIcon />
            </IconButton> :
            <IconButton onClick={() => {
              localStorage.setItem("currentMode", theme.palette.mode === "dark" ? "light" : "dark");
              setMode((prevMode) =>
                prevMode === 'light' ? 'dark' : 'light',
              );
            }
            } color="inherit">
              <ModeNightOutlinedIcon />
            </IconButton>


          }

          <div>
            <IconButton
              color="inherit"
              aria-label="more"
              id="long-button"
              aria-controls={open1 ? 'long-menu' : undefined}
              aria-expanded={open1 ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <PermIdentityOutlinedIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open1}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '20ch',
                },
              }}
            >
              {options.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === 'Pyxis'}
                  onClick={handleClose}
                  sx={{
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <Link
                    to={`${option.toLowerCase()}`}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    {option}
                  </Link>
                </MenuItem>
              ))}
            </Menu>


          </div>




        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
