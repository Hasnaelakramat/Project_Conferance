import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material';
import { Button, Stack, Typography } from '@mui/material';
import Alert from "../../compo/Alert";
import { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
const Changepassword = () => {
  const theme = useTheme();
  const [alertSeverity, setAlertSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isAlertOpen, setAlertOpen] = useState(false);
  const navigate = useNavigate();


  const save = () => {
    const role=localStorage.getItem('role');
  
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword === confirmPassword) {
      // Succès
      setAlertSeverity('success');
      setAlertMessage('Mot de passe modifié avec succès.');
      setAlertOpen(true);

      // Ajoutez ici votre logique pour enregistrer les modifications
      // ...

      // Redirection après 5 secondes
      setTimeout(() => {
        if (role === "ROLE_USER") {
          navigate('/CompteU');
        } else if (role === "ROLE_FORMATEUR") {
          navigate('/CompteF');
        } else {
          navigate('/CompteA');
        }
        // Utilisez la fonction navigate pour rediriger l'utilisateur vers une autre page
        // Assurez-vous d'avoir importé useNavigate depuis 'react-router-dom'
      
      }, 1000);
    } else {
      // Erreur
      setAlertSeverity('error');
      setAlertMessage('Les mots de passe ne correspondent pas.');
      setAlertOpen(true);
    }
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };


  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 10, ml: 0, marginRight: 16, width: '40ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Stack sx={{ gap: 4 }} direction={"column"}>
        <Typography variant="h5" sx={{ fontFamily: "Comic Sans MS", fontWeight: "bold", color: theme.palette.info.main, ml: "35px" }}> Reset Account Password</Typography>
        <TextField id="newPassword" label="New Password" variant="outlined" type="password" />
        <TextField id="confirmPassword" label="Confirm Password" variant="outlined" type="password" />
        <Button variant="outlined" onClick={save}>Save Changes</Button>
        <Alert severity={alertSeverity} message={alertMessage} open={isAlertOpen} handleClose={handleCloseAlert} />
      </Stack>
    </Box>
  );
}

export default Changepassword;
