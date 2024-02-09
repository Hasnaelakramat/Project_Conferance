
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Alert, Button, Snackbar, Stack, Typography } from '@mui/material';
import { useForm } from "react-hook-form"
import React from 'react';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from "react";
import Header from '../../compo/Header';
import UpdateIcon from '@mui/icons-material/Update';
import ChangeAvatar from '../../compo/ChangeAvatar';
import { Link } from 'react-router-dom';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
const regEmail = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const Compte = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  {/* changer console par un fontion api permet d'enregistrer les mise a jours */ }
  const onSubmit = () => handleClick();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleClick = () => {
    setOpen(true);
  };




  const updateButton = () => {
    localStorage.setItem('image', localStorage.getItem('newimage'));

  }
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result; // Récupère le résultat du lecteur de fichier

      if (typeof result === 'string') {
        setFileDoc(result); // Stocke l'URL de l'image dans le state
      } else {
        // Si ce n'est pas une chaîne de caractères, essayez de la convertir en chaîne
        setFileDoc(result.toString()); // Stocke l'URL de l'image dans le state
      }
    };

    if (file) {
      reader.readAsDataURL(file); // Convertit le fichier en URL
    }
  };

  const [planning, setFileDoc] = useState('');




  return (
    
    

    <Box
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        width: "1200px"

      }}

      noValidate
      autoComplete="off"
    >
      <Header title={"PPOFILE"} subtitle={"your profile"} isProfile="true" />
      <ChangeAvatar img={localStorage.getItem("image")} />

      <Typography sx={{ mx: 7, mt: 2 }}></Typography>
      <Stack sx={{ gap: 2 }} direction={"row"}>

        <TextField
          {...register("firstName", { required: true, minLength: 3 })}
          error={errors.firstName}
          label="Firstname"
          variant="filled"
          sx={{ flex: 1 }}
           helperText={errors.firstName ? "Incorrect entry & min 3 characters." : null}
          defaultValue={localStorage.getItem('nom') || ''}
          // {localStorage.getItem('nom') || ''}
        />
        <TextField
          {...register("LastName", { required: true, minLength: 3 })}
          error={errors.LastName}
          label="LastName"
          variant="filled"
          sx={{ flex: 1 }}
          helperText={errors.LastName ? "Incorrect entry & min 3 characters." : null}
          defaultValue={localStorage.getItem('prenom') || ''}
          // {localStorage.getItem('prenom') || ''}
        />

      </Stack >
      <Stack sx={{ gap: 2 }} direction={"row"}>

        <TextField
          {...register("tele", { required: true, minLength: 3 })}
          error={errors.tele}
          label="Tele"
          variant="filled"
          sx={{ flex: 1 }}
          helperText={errors.tele ? "Incorrect entry & min 3 characters." : null}
          defaultValue={localStorage.getItem('tele') || ''}
          // {localStorage.getItem('tele') || ''}
        />

        <TextField
          {...register("ville", { required: true, minLength: 3 })}
          error={errors.ville}
          label="City"
          variant="filled"
          sx={{ flex: 1 }}
          helperText={errors.ville ? "Incorrect entry & min 3 characters." : null}
          defaultValue={localStorage.getItem('ville') || ''}
          //{localStorage.getItem('ville') || ''}
        />
      </Stack >

      <Stack sx={{ gap: 2 }} direction={"row"}>
        <TextField
          {...register("email", { pattern: regEmail, required: true })}
          error={errors.email}
          helperText={errors.email ? "Incorrect entry & email valide." : null}
          label="Email"
          variant="filled"
          sx={{ flex: 1 }}
          defaultValue={localStorage.getItem('email') || ''}
        />

        <Link to="/Changepassword">
          <Button
            endIcon={<VpnKeyOutlinedIcon />}
            color="success"
            variant="outlined"
            sx={{ height: "55px" }}
          >
            Change Password
          </Button>
        </Link>
        {localStorage.getItem("role") === "ROLE_FORMATEUR" && (
          <Grid item xs={12} sm={6}>
          <label htmlFor="Plandoc" className="custom-file-upload-button">
           
             <a
            //  error={errors.cv.toString()  }
              // href={errors.cv.toString() }
              href="https://www.osureunion.fr/wp-content/uploads/2022/03/pdf-exemple.pdf"
              download="Planning-PDF-document"
              target="_blank"
              rel="noreferrer"
            >
             <Button size="small" color="info"
            variant="outlined"
            sx={{ height: "55px" }}>View CV </Button>
            </a>
           
          </label>
        </Grid>
        
  
          
        
        )}
      </Stack>
      

    {/* <Box sx={{ textAlign: "right" }} >

        <Button endIcon={<UpdateIcon />} type="submit" variant="contained" onClick={updateButton} >
          Update
        </Button >
        <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Updates are saved!
          </Alert>
        </Snackbar>

      </Box > */} 



    </Box>
  );
}

export default Compte;

