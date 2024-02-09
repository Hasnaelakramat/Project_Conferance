import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import SensorOccupiedOutlinedIcon from '@mui/icons-material/SensorOccupiedOutlined';
import { Avatar } from '@mui/material';



const ACPbar = () => {
    const navigate = useNavigate();

  const handleHomeButtonClick = () => {
    // Rediriger vers la page souhaitée (par exemple, '/accueil')
    navigate('/');
  };
const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);
const handleClick = () => {
  setAnchorEl(event.currentTarget);
  //setAnchorEl(anchorRef.current);
};
const handleClose = () => {
  setAnchorEl(null);
};
const handleParticipantRegistration = () => {
  
  // Redirection vers la page d'inscription pour le participant (/RegisterUser)
  navigate('/RegisterUser');
  handleClose();
};

const handleTrainerRegistration = () => {
 
  // Redirection vers la page d'inscription pour le formateur (/Register)
  navigate('/Register');
  handleClose();
};

  const anchorRef = React.useRef(null);
  const styles = {
    menu: {
      position: 'absolute',
      top: '0', // Ajustez cette valeur pour la position verticale du menu
      right: '16px', // Ajustez cette valeur pour la position horizontale du menu
    },
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="absolute" style={{ top: 0, width: '100%' }}>
        <Toolbar>
        <Avatar alt="Logo" src="C:\Users\Dell\Downloads\HatchfulExport-All\logo.png" sx={{ width: 40, height: 40 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Conferences Scientifiques
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleHomeButtonClick}
          >
            <HomeOutlinedIcon />
          </IconButton>
          <Link to="/Login" style={{ textDecoration: 'none', color: 'white' }}>
            <Button color="inherit"> <LoginOutlinedIcon /> se connecter</Button>
          </Link>
          <Button
          ref={anchorRef}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{ textDecoration: 'none', color: 'white'  }}
      >
      <SensorOccupiedOutlinedIcon /> S'inscrire 
      </Button>
      <Menu
        id="basic-menu"
        style={styles.menu}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        //getContentAnchorEl={null}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleParticipantRegistration}>Participant</MenuItem>
        <MenuItem onClick={handleTrainerRegistration}>Formateur</MenuItem>
      </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}; 
export default  ACPbar
